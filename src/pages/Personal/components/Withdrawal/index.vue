<template>
  <div>
    <Reward />
    <Review />
    <WithdrawalRecord />
  </div>
</template>

<script>
  import Reward from './Reward.vue';
  import Review from './Review.vue';
  import WithdrawalRecord from './WithdrawalRecord.vue';

  export default {
    name: 'Jobs',
    data() {
      return {
        containerPaddingTop: '200px',
        jobList: [],
      };
    },
    components: {
      Reward,
      Review,
      WithdrawalRecord,
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  .jobSearchWrapper {
    @include area();
    background-color: $bgGrey1;

    .searchbarArea {
      @include area(100%, auto, fixed);
      @include position(0, $headerHeight);
      z-index: $indexNav;

      @include rwd($xl) {
        top: $headerHeightL;
      }

      @include rwd() {
        top: $headerHeightS;
      }

      /deep/ .searchbarWrapper {
        border-radius: 0;
      }
    }
  }
</style>

