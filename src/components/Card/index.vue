<template>
  <div :class="{cardWrapper: true, shadow: shadow}">
    <div v-if="title" class="title">
      <i v-if="titleIcon" :class="'el-icon-' + titleIcon"></i> {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: { shadow: Boolean, title: String, titleIcon: String },
  };
</script>

<style lang="scss" scoped>
  .cardWrapper {
    @include font(16, $text2);
    position: relative;
    margin-bottom: $spacingCard;
    background-color: $white;

    &.shadow {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    }

    .title {
      @include font(20, $text1);
      padding: 20px 40px;

      @include rwd() {
        text-align: center;
        font-size: 17px;
      }
    }
  }
</style>
