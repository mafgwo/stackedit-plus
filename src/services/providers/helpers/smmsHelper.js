import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';

/**
 * https://doc.sm.ms/#api-User-Get_Profile
 */
const subPrefix = 'sm';
export default {
  subPrefix,
  async getTokenObj(proxyUrl, apiSecretToken) {
    // Call the user info endpoint
    try {
      const { body } = await networkSvc.request({
        method: 'POST',
        url: `${proxyUrl}https://sm.ms/api/v2/profile`,
        headers: {
          Authorization: apiSecretToken,
        },
      });
      // Check user result
      if (!body.success) {
        throw new Error(`Failed to obtain SM.MS personal information. Failure information: ${body.message}`);
      }
      userSvc.addUserInfo({
        id: `${subPrefix}:${body.data.username}`,
        name: body.data.username,
        imageUrl: 'https://gravatar.loli.net/avatar/ccc459536d65637c192c00f639569864',
      });
      // Build token object including sub
      const token = {
        proxyUrl,
        accessToken: apiSecretToken,
        name: body.data.username,
        sub: body.data.username,
      };
      // Add token to smms tokens
      store.dispatch('data/addSmmsToken', token);
      return token;
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      store.dispatch('notification/error', err);
      throw new Error(`Failed to obtain SM.MS personal information, Error: ${err.message}`);
    }
  },
  async addAccount(proxyUrl, apiSecretToken) {
    const token = await this.getTokenObj(proxyUrl, apiSecretToken);
    badgeSvc.addBadge('addSmmsAccount');
    return token;
  },
  async uploadFile({
    token,
    file,
  }) {
    const { body } = await networkSvc.request({
      method: 'POST',
      url: `${token.proxyUrl}https://sm.ms/api/v2/upload`,
      headers: {
        Authorization: token.accessToken,
      },
      formData: {
        smfile: file,
      },
    });
    if (!body.success) {
      if (body.code === 'image_repeated') {
        return body.images;
      }
      store.dispatch('notification/error', `SM.MS failed to upload the image, failure information: ${body.message}`);
      throw new Error(`SM.MS failed to upload the image, failure information: ${body.message}`);
    }
    return body.data.url;
  },

};
