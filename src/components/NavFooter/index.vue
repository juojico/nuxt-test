<template>
  <footer class="footerWrapper">
    <div class="container">
      Copyright © 2021 STEP1NE. All rights reserved.
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'NavFooter',
    data() {
      return {
        sitemaps: [
          '投資者專區',
          '關於我們',
          '免責聲明',
          '服務條款',
          '隱私權聲明',
          '徵才方案',
          '合作與廣告',
          'STEP1NE徵才',
          '找好公司',
          '手機版網站',
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .footerWrapper {
    box-sizing: border-box;
    height: $footerHeight;
    background-color: black;
    text-align: center;

    @include rwd($xl) {
      height: $footerHeightL;
    }

    @include rwd() {
      height: $footerHeightS;
    }

    .container {
      @include flex();
      @include font(12, $text3);
    }
  }
</style>
