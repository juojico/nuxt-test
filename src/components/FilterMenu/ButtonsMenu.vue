<template>
  <div :class="{buttonsMenuArea: true, left: left}">
    <div v-for="(item, index) in menu" :class="{item: true, on: activeIndex === index}" :key="`buttonsMenu${index}`" @click="clickfilterItem(index, item.value)">{{item.label}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ButtonsMenu',
    props: {
      menu: {
        type: Array,
        default: () => {},
      },
      activeIndex: {
        type: Number,
        default: null,
      },
      left: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      clickfilterItem(index, value) {
        this.$emit('itemClick', index, value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .buttonsMenuArea {
    @include flex(flex-end);
    @include font(16, $text3);
    flex: 1;
    margin: 0 -8px;

    @include rwd() {
      @include flex(center, center, row, wrap);
    }

    &.left {
      justify-content: flex-start;
    }

    .item {
      margin: 4px 8px;
      padding: 6px 16px;
      border: 1px solid $text3;
      border-radius: 3px;
      cursor: pointer;
      transition: 0.2s;

      @include rwd($sm) {
        margin: 2px 4px;
      }

      &.on,
      &:hover {
        color: white;
        background-color: $primary;
        border-color: $primary;
      }
    }
  }
</style>

