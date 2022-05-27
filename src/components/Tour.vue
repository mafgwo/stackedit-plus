<template>
  <div class="tour" @keydown.esc.stop="skip">
    <div class="tour-step" :class="'tour-step--' + step" :style="stepStyle">
      <div class="tour-step__inner" v-if="step === 'welcome'">
        <h2>欢迎回来！</h2>
        <p>新的<b>StackEdit中文版</b>在这里！</p>
        <p>请单击<b>下一步</b>快速浏览。</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">跳过</button>
          <button class="button button--resolve" @click="next">下一步</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'editor'">
        <h2>您的Markdown编辑器</h2>
        <p>StackEdit实时将Markdown转换为HTML。</p>
        <p>点击 <icon-side-preview></icon-side-preview> 切换侧面预览</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">跳过</button>
          <button class="button button--resolve" @click="next">下一步</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'explorer'">
        <h2>文件资源管理器</h2>
        <p>StackEdit可以管理工作区中的多个文件和文件夹。</p>
        <p>点击 <icon-folder></icon-folder> 打开文件资源管理器。</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">跳过</button>
          <button class="button button--resolve" @click="next">下一步</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'menu'">
        <h2>更多！</h2>
        <p>StackEdit还可以同步和发布文件，管理协作工作区...</p>
        <p>点击 <icon-provider provider-id="stackedit"></icon-provider> 浏览菜单。</p>
        <div class="tour-step__button-bar">
          <button class="button" @click="finish">跳过</button>
          <button class="button button--resolve" @click="next">下一步</button>
        </div>
      </div>
      <div class="tour-step__inner" v-else-if="step === 'end'">
        <h2>Enjoy!</h2>
        <p>如果您喜欢StackEdit，请在<a href="#">Chrome网络商店</a>上给5颗星打分。</p>
        <div class="tour-step__button-bar">
          <button class="button button--resolve" @click="finish">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import store from '../store';

const steps = [
  'welcome',
  'editor',
  'explorer',
  'menu',
  'end',
];

export default {
  data: () => ({
    stepIdx: 0,
    stepStyles: {},
  }),
  computed: {
    step() {
      return steps[this.stepIdx];
    },
    stepStyle() {
      return this.stepStyles[this.step] || {};
    },
  },
  methods: {
    updatePositions() {
      document.querySelectorAll('[tour-step-anchor]').cl_each((anchorElt) => {
        const anchorRect = anchorElt.getBoundingClientRect();
        const anchorSteps = (anchorElt.getAttribute('tour-step-anchor') || '').split(',');
        anchorSteps.forEach((step) => {
          const style = {
            top: `${anchorRect.top + (anchorRect.height / 2)}px`,
            left: `${anchorRect.left + (anchorRect.width / 2)}px`,
          };
          switch (step) {
            case 'welcome':
            case 'end': {
              style.top = `${anchorRect.top}px`;
              break;
            }
            case 'editor':
            case 'menu': {
              style.left = `${anchorRect.left}px`;
              break;
            }
            case 'explorer': {
              style.left = `${anchorRect.left + anchorRect.width}px`;
              break;
            }
            default:
              return;
          }
          Vue.set(this.stepStyles, step, style);
        });
      });
    },
    finish() {
      store.dispatch('data/patchLayoutSettings', {
        welcomeTourFinished: true,
      });
    },
    next() {
      this.stepIdx += 1;
    },
  },
  mounted() {
    this.$watch(
      () => store.getters['layout/styles'],
      () => this.updatePositions(),
      { immediate: true },
    );
  },
};
</script>


<style lang="scss">
@import '../styles/variables.scss';

.tour {
  position: absolute;
  top: 0;
  left: 0;
}

.tour-step {
  position: absolute;
}

$tour-step-background: transparentize(mix(#f3f3f3, $selection-highlighting-color, 75%), 0.025);
$tour-step-width: 240px;

.tour-step__inner {
  position: absolute;
  background-color: $tour-step-background;
  padding: 1.5em;
  font-size: 0.9em;
  line-height: 1.33;
  width: $tour-step-width;
  text-align: center;
  border-radius: $border-radius-base;

  h2 {
    margin: 0;

    &::after {
      display: none;
    }
  }

  .icon,
  .icon-provider {
    width: 1.25em;
    height: 1.25em;
    vertical-align: bottom;
    display: inline-block;
  }

  &::before {
    content: '';
    position: absolute;
  }

  .tour-step--welcome &,
  .tour-step--end & {
    left: -$tour-step-width/2;
    top: 36px;
    border-bottom-right-radius: 0;

    &::before {
      bottom: -10px;
      right: 0;
      border-top: 10px solid $tour-step-background;
      border-left: 10px solid transparent;
    }
  }

  .tour-step--editor &,
  .tour-step--menu & {
    right: 15px;
    border-top-right-radius: 0;

    &::before {
      top: 0;
      right: -10px;
      border-top: 10px solid $tour-step-background;
      border-right: 10px solid transparent;
    }
  }

  .tour-step--explorer & {
    left: 15px;
    border-top-left-radius: 0;

    &::before {
      top: 0;
      left: -10px;
      border-top: 10px solid $tour-step-background;
      border-left: 10px solid transparent;
    }
  }
}

.tour-step__button-bar {
  margin-top: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .button {
    font-size: 1.1em;
  }
}
</style>
