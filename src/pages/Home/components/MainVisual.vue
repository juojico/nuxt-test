<template>
  <div v-if="banners && banners.length > 0" class="mainVisualWrapper">
    <div class="bannerArea">
      <div v-for="(item, index) in banners" :key="`banner${index}`" :class="{bannerBox: true, on: index === activeIndex}">
        <img class="bgImg" :src="item.bannerUrl" alt="首頁輪播圖圖片">
        <div class="container">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MainVisual",
    props: { banners: { type: Array, default: () => [] } },
    data() {
      return {
        showTime: 5000,
        activeIndex: 0,
        play: null,
      };
    },
    methods: {
      bannersPlay() {
        this.play = setInterval(() => {
          this.activeIndex++;
          if (this.activeIndex >= this.banners.length) this.activeIndex = 0;
        }, this.showTime);
      },
    },
    mounted() {
      this.bannersPlay();
    },
    beforeDestroy() {
      clearInterval(this.play);
    },
  };
</script>

<style lang="scss" scoped>
  .mainVisualWrapper {
    @include area();
    height: calc(100vh - #{$headerHeight});
    max-height: 50vw;

    @include rwd($xl) {
      height: 50vw;
    }

    .bannerArea {
      @include area(100%, 100%, absolute);
      @include position();

      .bannerBox {
        @include area(100%, 100%, absolute);
        opacity: 0;
        transition: opacity 1s;

        &.on {
          opacity: 1;
        }

        .bgImg {
          @include area(100%, 100%, absolute);
          @include position();
          object-fit: cover;
        }

        .container {
          @include area(100%, 100%, absolute);
          @include flex(center, flex-start, column);
          left: calc(50% - 480px);
          padding: 140px 32px;
          color: white;
          z-index: 1;

          @include rwd($lg) {
            left: 0;
          }

          @include rwd() {
            padding: 40px 32px;
          }
        }
      }
    }
  }
</style>
