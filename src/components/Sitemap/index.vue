<template>
  <div class="sitemapWrapper">
    <div class="container">
      投資者專區 │ 關於我們 │ 免責聲明 │ 服務條款 │ 隱私權聲明 │ 徵才方案 │ 合作與廣告 │ STEP1NE徵才 │ 找好公司 │ 手機版網站
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sitemap',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .sitemapWrapper {
    @include flex();
    @include font(20, $text2);
    padding: 42px;
    background-color: white;
    text-align: center;
  }
</style>
