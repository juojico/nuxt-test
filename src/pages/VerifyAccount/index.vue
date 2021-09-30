<template>
  <div class="wrapper">
    <div><i class="el-icon-check ckeck"></i></div>
    <div>
      <h1>恭喜您已經完成 STEP1NE Email驗證！</h1>
      <p>您已可使用各項進階功能，請 <el-button type="text" @click="onClickBackHome">返回首頁</el-button> 繼續進行操作。</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
    methods: {
      onClickBackHome() {
        this.$router.replace('/');
      },
    },
    mounted() {
      const query = this.$route.query;
      let payload = {
        ...query,
      };
      this.$api('authVerify', payload);
    },
  };
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(90vh - #{$navHeight});
    .ckeck {
      font-size: 48px;
      border-radius: 50px;
      background-color: $green;
      color: white;
      padding: 10px;
      margin: 20px;
    }
  }
</style>