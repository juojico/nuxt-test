<template>
  <div class="filterMenuWrapper">
    <div class="container">
      <div class="filterMenuArea">
        <div :class="{filterItem:true, on: item.value === activeItem}" v-for="(item, index) in menu" :key="`filterMenuItem${index}`" @click="clickfilterItem(item.value)">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FilterMenu',
    props: {
      menu: {
        type: Array,
        default: () => {},
      },
      activeItem: {
        type: String,
        default: null,
      },
    },
    methods: {
      clickfilterItem(value) {
        this.$emit('filterChange', value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .filterMenuWrapper {
    @include area(100%, auto, fixed);
    @include position(0, $headerHeight);
    background-color: $primary;
    color: white;
    z-index: $indexNav;

    @include rwd($xl) {
      top: $headerHeightL;
    }

    @include rwd() {
      top: $headerHeightS;
    }

    .filterMenuArea {
      @include flex();

      .filterItem {
        @include font(20, white, 300);
        position: relative;
        padding: 22px 0;
        flex: 1;
        text-align: center;
        cursor: pointer;

        @include rwd() {
          font-size: 14px;
        }

        &::after {
          @include box(1, 20);
          content: '';
          right: 0;
          background-color: white;

          @include rwd() {
            display: none;
          }
        }

        &:last-child::after {
          display: none;
        }

        &:hover,
        &.on {
          font-weight: bold;
        }
      }
    }
  }
</style>

