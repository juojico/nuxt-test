<template>
  <div class="PageNotFoundWrapper">
    <h1>404</h1>
    <h3>Page Not Found</h3>
    <div class="textArea">
      <h2>找不到此頁面</h2>
      <h2>請確認網址是否正確</h2>
    </div>
    <el-button type="primary" @click="gotoHome">回首頁</el-button>
  </div>
</template>

<script>
  export default {
    name: 'PageNotFound',
    methods: {
      gotoHome() {
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .PageNotFoundWrapper {
    @include area();
    @include flex(space-around, center, column);
    padding: 20vh 0 10vh 0;

    h1 {
      @include font(120, $text3, bold, 120);
      margin: 0;
    }

    h2 {
      @include font(20, $text2);
    }

    h3 {
      @include font(20, $text3, bold, 20);
      letter-spacing: 4px;
      margin: 0;
    }

    .textArea {
      margin: 24px 0;
      text-align: center;
    }
  }
</style>
