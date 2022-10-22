<template>
  <div class="editor" ondrop="return false;">
    <pre class="editor__inner markdown-highlighting" :style="{padding: styles.editorPadding}" :class="{monospaced: computedSettings.editor.monospacedFontOnly}"></pre>
    <div class="gutter" :style="{left: styles.editorGutterLeft + 'px'}">
      <comment-list v-if="styles.editorGutterWidth"></comment-list>
      <editor-new-discussion-button v-if="!isCurrentTemp"></editor-new-discussion-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentList from './gutters/CommentList';
import EditorNewDiscussionButton from './gutters/EditorNewDiscussionButton';
import store from '../store';
import editorSvc from '../services/editorSvc';
import imageSvc from '../services/imageSvc';
import utils from '../services/utils';

export default {
  components: {
    CommentList,
    EditorNewDiscussionButton,
  },
  computed: {
    ...mapGetters('file', [
      'isCurrentTemp',
    ]),
    ...mapGetters('layout', [
      'styles',
    ]),
    ...mapGetters('data', [
      'computedSettings',
    ]),
  },
  methods: {
    async setImgAndDoClick(items) {
      let file = null;
      if (!items || items.length === 0) {
        return;
      }
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        return;
      }
      const imgId = utils.uid();
      store.dispatch('img/setCurrImgId', imgId);
      editorSvc.pagedownEditor.uiManager.doClick('imageUploading');
      try {
        const { url, error } = await imageSvc.updateImg(file);
        // 存在错误
        if (error) {
          editorSvc.clEditor.replaceAll(`[图片上传中...(image-${imgId})]`, `[图片上传失败...(image-${imgId})]`);
          store.dispatch('notification/error', error);
          return;
        }
        editorSvc.clEditor.replaceAll(`[图片上传中...(image-${imgId})]`, `![输入图片说明](${url})`);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
        editorSvc.clEditor.replaceAll(`[图片上传中...(image-${imgId})]`, `[图片上传失败...(image-${imgId})]`);
        store.dispatch('notification/error', err);
      }
    },
  },
  mounted() {
    // 当前选择的图片存储图床
    const currImgStorageStr = localStorage.getItem('img/checkedStorage');
    if (currImgStorageStr) {
      store.commit('img/changeCheckedStorage', JSON.parse(currImgStorageStr));
    }
    const editorElt = this.$el.querySelector('.editor__inner');
    const onDiscussionEvt = cb => (evt) => {
      let elt = evt.target;
      while (elt && elt !== editorElt) {
        if (elt.discussionId) {
          cb(elt.discussionId);
          return;
        }
        elt = elt.parentNode;
      }
    };

    const classToggler = toggle => (discussionId) => {
      editorElt.getElementsByClassName(`discussion-editor-highlighting--${discussionId}`)
        .cl_each(elt => elt.classList.toggle('discussion-editor-highlighting--hover', toggle));
      document.getElementsByClassName(`comment--discussion-${discussionId}`)
        .cl_each(elt => elt.classList.toggle('comment--hover', toggle));
    };

    editorElt.addEventListener('mouseover', onDiscussionEvt(classToggler(true)));
    editorElt.addEventListener('mouseout', onDiscussionEvt(classToggler(false)));
    editorElt.addEventListener('click', onDiscussionEvt((discussionId) => {
      store.commit('discussion/setCurrentDiscussionId', discussionId);
    }));

    editorElt.addEventListener('drop', (event) => {
      const transItems = event.dataTransfer.items;
      this.setImgAndDoClick(transItems);
    });
    editorElt.addEventListener('paste', (event) => {
      const pasteItems = (event.clipboardData || window.clipboardData).items;
      this.setImgAndDoClick(pasteItems);
    });

    this.$watch(
      () => store.state.discussion.currentDiscussionId,
      (discussionId, oldDiscussionId) => {
        if (oldDiscussionId) {
          editorElt.querySelectorAll(`.discussion-editor-highlighting--${oldDiscussionId}`)
            .cl_each(elt => elt.classList.remove('discussion-editor-highlighting--selected'));
        }
        if (discussionId) {
          editorElt.querySelectorAll(`.discussion-editor-highlighting--${discussionId}`)
            .cl_each(elt => elt.classList.add('discussion-editor-highlighting--selected'));
        }
      },
    );
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.editor {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.editor__inner {
  margin: 0;
  font-family: $font-family-main;
  font-variant-ligatures: no-common-ligatures;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;

  * {
    line-height: $line-height-base;
  }

  .cledit-section {
    font-family: inherit;
  }

  .hide {
    display: none;
  }

  &.monospaced {
    font-family: $font-family-monospace !important;
    font-size: $font-size-monospace !important;

    * {
      font-size: inherit !important;
    }
  }
}
</style>
