import localDbSvc from './localDbSvc';
import store from '../store';
import utils from './utils';
import networkSvc from './networkSvc';
import exportSvc from './exportSvc';
import providerRegistry from './providers/common/providerRegistry';
import workspaceSvc from './workspaceSvc';
import badgeSvc from './badgeSvc';

const hasCurrentFilePublishLocations = () => !!store.getters['publishLocation/current'].length;

const loader = type => fileId => localDbSvc.loadItem(`${fileId}/${type}`)
  // Item does not exist, create it
  .catch(() => store.commit(`${type}/setItem`, {
    id: `${fileId}/${type}`,
  }));
const loadContent = loader('content');

const ensureArray = (value) => {
  if (!value) {
    return [];
  }
  if (!Array.isArray(value)) {
    return `${value}`.trim().split(/\s*,\s*/);
  }
  return value;
};

const ensureString = (value, defaultValue) => {
  if (!value) {
    return defaultValue;
  }
  return `${value}`;
};

const ensureDate = (value, defaultValue) => {
  if (!value) {
    return defaultValue;
  }
  return new Date(`${value}`);
};

// git 相关的 providerId
const gitProviderIds = ['gitea', 'gitee', 'github', 'gitlab'];

const publish = async (publishLocation, commitMessage) => {
  const { fileId } = publishLocation;
  const template = store.getters['data/allTemplatesById'][publishLocation.templateId];
  const html = await exportSvc.applyTemplate(fileId, template);
  const content = await localDbSvc.loadItem(`${fileId}/content`);
  const file = store.state.file.itemsById[fileId];
  const properties = utils.computeProperties(content.properties);
  const provider = providerRegistry.providersById[publishLocation.providerId];
  const token = provider.getToken(publishLocation);
  const metadata = {
    title: ensureString(properties.title, file.name),
    author: ensureString(properties.author),
    tags: ensureArray(properties.tags),
    categories: ensureArray(properties.categories),
    excerpt: ensureString(properties.excerpt),
    featuredImage: ensureString(properties.featuredImage),
    status: ensureString(properties.status),
    date: ensureDate(properties.date, new Date()),
  };
  return provider.publish(token, html, metadata, publishLocation, commitMessage);
};

const publishFile = async (fileId) => {
  let counter = 0;
  await loadContent(fileId);
  const publishLocations = [
    ...store.getters['publishLocation/filteredGroupedByFileId'][fileId] || [],
  ];
  try {
    // 查询是否包含git provider 包含则需要填入提交信息
    const gitLocations = publishLocations.filter(it => gitProviderIds.indexOf(it.providerId) > -1);
    let commitMsg = '';
    if (gitLocations.length) {
      try {
        const { commitMessage } = await store.dispatch('modal/open', { type: 'commitMessage' });
        commitMsg = commitMessage;
      } catch (e) {
        return;
      }
    }
    await utils.awaitSequence(publishLocations, async (publishLocation) => {
      await store.dispatch('queue/doWithLocation', {
        location: publishLocation,
        action: async () => {
          const publishLocationToStore = await publish(publishLocation, commitMsg);
          try {
            // Replace publish location if modified
            if (utils.serializeObject(publishLocation) !==
              utils.serializeObject(publishLocationToStore)
            ) {
              store.commit('publishLocation/patchItem', publishLocationToStore);
              workspaceSvc.ensureUniqueLocations();
            }
            counter += 1;
          } catch (err) {
            if (store.state.offline) {
              throw err;
            }
            console.error(err); // eslint-disable-line no-console
            store.dispatch('notification/error', err);
          }
        },
      });
    });
    const file = store.state.file.itemsById[fileId];
    store.dispatch('notification/info', `"${file.name}" was published to ${counter} location(s).`);
  } finally {
    await localDbSvc.unloadContents();
  }
};

const requestPublish = () => {
  // No publish in light mode
  if (store.state.light) {
    return;
  }

  store.dispatch('queue/enqueuePublishRequest', async () => {
    let intervalId;
    const attempt = async () => {
      // Only start publishing when these conditions are met
      if (networkSvc.isUserActive()) {
        clearInterval(intervalId);
        if (!hasCurrentFilePublishLocations()) {
          // Cancel publish
          throw new Error('Publish not possible.');
        }
        await publishFile(store.getters['file/current'].id);
        badgeSvc.addBadge('triggerPublish');
      }
    };
    intervalId = utils.setInterval(() => attempt(), 1000);
    return attempt();
  });
};

const publishLocationAndStore = async (publishLocation, commitMsg) => {
  const publishLocationToStore = await publish(publishLocation, commitMsg);
  workspaceSvc.addPublishLocation(publishLocationToStore);
  return publishLocationToStore;
};

const createPublishLocation = (publishLocation, featureId) => {
  const currentFile = store.getters['file/current'];
  publishLocation.fileId = currentFile.id;
  store.dispatch(
    'queue/enqueue',
    async () => {
      let commitMsg = '';
      if (gitProviderIds.indexOf(publishLocation.providerId) > -1) {
        try {
          const { commitMessage } = await store.dispatch('modal/open', {
            type: 'commitMessage',
            name: currentFile.name,
          });
          commitMsg = commitMessage;
        } catch (e) {
          return;
        }
      }
      await publishLocationAndStore(publishLocation, commitMsg);
      store.dispatch('notification/info', `A new publication location was added to "${currentFile.name}".`);
      if (featureId) {
        badgeSvc.addBadge(featureId);
      }
    },
  );
};

export default {
  requestPublish,
  publishLocationAndStore,
  createPublishLocation,
};
