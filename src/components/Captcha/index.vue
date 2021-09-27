<template>
  <div class="captchaArea">
    <div class="captchaBox">
      <img :src="captchaImg" alt="captchaImg">
    </div>
    <el-button @click="setCaptchaImg">刷新</el-button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters('user', ['token', 'captchaImg']),
    },
    methods: {
      ...mapActions('user', ['setCaptchaImg']),
    },
  };
</script>

<style lang="scss" scoped>
  .captchaArea {
    @include flex(space-between);
    padding-top: 10px;

    .captchaBox {
      min-height: 50px;

      img {
        display: block;
      }
    }
  }
</style>