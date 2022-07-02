<template>
  <div class="menu-item flex flex--row flex--align-center">
    <div class="menu-item__icon flex flex--column flex--center">
      <slot name="icon"></slot>
    </div>
    <div class="menu-item__text flex flex--column">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../styles/variables.scss';

.menu-item {
  text-align: left;
  padding: 10px;
  height: auto;
  font-size: 17px;
  line-height: 1.4;
  text-transform: none;
  white-space: normal;

  span {
    display: inline-block;
    font-size: 0.75rem;
    opacity: 0.67;
    line-height: 1.3;

    .menu-item__label {
      opacity: 1;
    }

    span {
      display: inline;
      opacity: 1;
    }
  }
}

.menu-item--info {
  padding-top: 3px;
  padding-bottom: 3px;
}

.menu-item__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
}

.menu-item__icon--disabled {
  opacity: 0.5;
}

.menu-item__icon--image {
  border-radius: $border-radius-base;
  overflow: hidden;
}

.hidden-file {
  position: fixed;
  top: -999px;
}

.menu-item__label {
  float: right;
  font-size: 0.6rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.15em 0.25em;
  background-color: #fff;
  border-radius: 3px;
  opacity: 0.6;
}

.menu-item__label--warning {
  color: #fff;
  background-color: darken($error-color, 10);
  opacity: 1;
}

.menu-item__label--count {
  font-size: 0.75rem;
  font-weight: 400;
}

.menu-item__text {
  width: 100%;
  overflow: hidden;
}
</style>
