<template>
  <div class="splitAreaWrapper">
    <div class="splitAreaArea">
      <div v-for="(item, index) in splitArray" :key="`splitAreaItem${index}`" class="filterItem">
        <div class="label">{{item.label}}</div>
        <div class="value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SplitArea',
    props: {
      splitArray: {
        type: Array,
        default: () => {},
      },
    },
  };
</script>

<style lang="scss" scoped>
  .splitAreaWrapper {
    @include area(100%, auto);
    z-index: $indexNav;

    @include rwd($xl) {
      top: $headerHeightL;
    }

    @include rwd() {
      top: $headerHeightS;
    }

    .splitAreaArea {
      @include flex();
      padding: 26px 0;

      @include rwd($xl) {
        padding: 14px 0;
      }

      @include rwd() {
        padding: 0;
      }

      .filterItem {
        @include font(26, black, 300);
        padding: 12px 0;
        flex: 1;
        text-align: center;
        border-right: 1px solid #d3d3d3;

        &:last-child {
          border-right: none;
        }

        @include rwd($xl) {
          font-size: 20px;
        }

        @include rwd() {
          font-size: 15px;
          border-right: none;
        }

        &.on {
          font-weight: bold;
        }

        .label {
          @include font(26, black, bold);
          margin-bottom: 8px;
        }

        .value {
          @include font(26, #2ea9df, bold);
        }
      }
    }
  }
</style>

