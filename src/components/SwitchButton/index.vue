<template>
  <div class="footBtn">
    <el-button v-if="!switchVal" type="warning" @click="edit()">{{editLabel}}</el-button>
    <el-button v-else type="warning" @click="save()">{{saveLabel || '確認修改'}}</el-button>
  </div>
</template>

<script>
  export default {
    name: 'SwitchButton',
    props: ['switchVal', 'editLabel', 'saveLabel'],
    methods: {
      edit() {
        this.$emit('edit');
      },
      save() {
        this.$emit('save');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .footBtn {
    width: 100%;
    text-align: center;

    @include rwd() {
      @include area(auto, auto, fixed);
      right: 10px;
      top: $headerHeightS + 10px;
      z-index: $indexNav;
    }
  }
</style>

