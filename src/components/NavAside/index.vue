<template>
  <div class="asideWrapper">
    <div class="icon telegram" @click="onClickButton('https://t.me/step1official')"></div>
    <div class="icon line" @click="onClickButton('https://line.me/ti/p/@step1official')"></div>
    <div :class="{icon: true, top: true, show: topShow}" @click="gotoTop"></div>
  </div>
</template>

<script>
  import { throttle } from 'throttle-debounce';

  export default {
    name: 'NavAside',
    data() {
      return {
        topShow: false,
      };
    },

    methods: {
      onScroll() {
        if (process.browser) {
          this.topShow = window.pageYOffset > 300;
        }
      },
      onClickButton(url) {
        if (process.browser) {
          window.open(url);
        }
      },
      gotoTop() {
        if (process.browser) {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }
      },
    },
    mounted() {
      if (process.browser) {
        window.addEventListener('scroll', throttle(500, false, this.onScroll), {
          passive: true,
        });
      }
    },
    destroyed() {
      if (process.browser) {
        window.removeEventListener(
          'scroll',
          throttle(500, false, this.onScroll),
          {
            passive: true,
          },
        );
      }
    },
  };
</script>

<style lang="scss" scoped>
  .asideWrapper {
    @include flex(flex-start, center, column);
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: $indexNav;

    .icon {
      @include box(60, 60, relative);
      cursor: pointer;

      $icons: 'telegram', 'line', 'top';

      @each $i in $icons {
        &.#{$i} {
          @include bg('~@/assets/icon/#{$i}.png');
        }
      }

      &.top {
        @include box(50, 50, relative);
        opacity: 0;
        transition: opacity 0.5s;

        &.show {
          opacity: 1;
        }
      }
    }
  }
</style>
