<template>
  <modal-inner class="modal__inner-1--about-modal" aria-label="About">
    <div class="modal__content">
      <div class="logo-background"></div>
      StackEdit 在 <a target="_blank" href="https://gitee.com/mafgwo/stackedit/">Gitee</a> 上
      <br>
      <a target="_blank" href="https://gitee.com/mafgwo/stackedit/issues">问题跟踪</a> — <a target="_blank" href="https://gitee.com/mafgwo/stackedit/releases">更新日志</a>
      <br>
      <a target="_blank" href="#">Chrome 应用</a> — <a target="_blank" href="#">Chrome 扩展</a>
      <br>
      <hr>
      <small>© 2022 StackEdit中文版<br>v{{version}}</small>
      <h3>常见问题解答</h3>
      <div class="faq" v-html="faq"></div>
      <div class="modal__info">
        如需商业支持或定制开发，请 <a href="mailto:mafgwo@163.com">联系我们</a>.
      </div>
      Licensed under an
      <a target="_blank" href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a><br>
      <a target="_blank" href="privacy_policy.html">隐私策略</a>
    </div>
    <div class="modal__button-bar">
      <button class="button button--resolve" @click="config.resolve()">关闭</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import markdownConversionSvc from '../../services/markdownConversionSvc';
import faq from '../../data/faq.md';

export default {
  components: {
    ModalInner,
  },
  data: () => ({
    version: VERSION,
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    faq() {
      return markdownConversionSvc.defaultConverter.render(faq);
    },
  },
};
</script>

<style lang="scss">
.modal__inner-1--about-modal {
  text-align: center;

  .logo-background {
    height: 75px;
    margin: 0.5em 0;
  }

  small {
    display: block;
  }

  hr {
    width: 160px;
    max-width: 100%;
    margin: 1.5em auto;
  }
}

.faq {
  font-size: 0.8em;
  line-height: 1.5;
}
</style>
