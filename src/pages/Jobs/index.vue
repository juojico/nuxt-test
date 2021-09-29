<template>
  <div class="jobSearchWrapper">
    <div ref="searchbarArea">
      <Searchbar @search="onSearch" :conditions="conditions" details isFixed />
    </div>

    <div class="container">
      <JobList :jobList="jobList" :pagerInfo="pagerInfo" :total="pagerInfo.total" @sortChange="sortChange" />
    </div>
  </div>
</template>

<script>
  import Searchbar from '~/components/Searchbar';
  import JobList from './components/JobList';

  export default {
    name: 'Jobs',
    components: {
      Searchbar,
      JobList,
    },
    data() {
      return {
        jobList: [],
        conditions: {},
        pagerInfo: { size: 12, current: 1, total: 0 },
      };
    },
    methods: {
      sortChange(payload) {
        this.conditions = { ...this.conditions, ...payload };
      },
      onSearch(resultData) {
        this.jobList = resultData.records;

        const { current, size, total } = resultData;
        this.pagerInfo = { ...this.pagerInfo, current, size, total };

        if (process.browser) {
          window.scroll({
            top: this.$refs.searchbarArea.clientHeight,
            left: 0,
            behavior: 'smooth',
          });
        }
      },
    },
    mounted() {
      this.conditions = { ...this.$route.query, ...this.pagerInfo };
    },
  };
</script>

<style lang="scss" scoped>
  .jobSearchWrapper {
    @include area();
    background-color: $bgGrey1;
  }
</style>

