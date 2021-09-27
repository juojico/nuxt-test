<template>
  <div class="cardGroupWrapper">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CardGroup',
  };
</script>

<style lang="scss" scoped>
  .cardGroupWrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    margin-left: -$spacingCard/2;
    margin-right: -$spacingCard/2;

    div {
      flex: 1;
      margin-left: $spacingCard/2;
      margin-right: $spacingCard/2;
    }
  }
</style>
