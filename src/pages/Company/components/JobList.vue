<template>
  <div class="jobListWrapper">
    <div class="titleArea">最新職缺</div>

    <div v-if="nodata" class="nodata">查無職缺</div>
    <div v-else class="listArea">
      <JobCard v-for="(item,index) in jobList" :key="`jobListItem${index}`" :item="item"></JobCard>
    </div>

    <div class="pagerArea" v-if="showPager">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagerInfo.current" :page-size="pagerInfo.size" layout="prev, pager, next" :total="pagerInfo.total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import JobCard from '~/components/Card/JobCard';

  export default {
    name: 'JobList',
    components: {
      JobCard,
    },
    data() {
      return {
        jobList: [],
        pagerInfo: { size: 6, current: 1, total: 0 },
      };
    },
    computed: {
      ...mapGetters('jobsModules', ['currentCompanyId']),
      nodata() {
        return this.jobList.length < 1;
      },
      showPager() {
        if (this.nodata || this.pagerInfo.size > this.pagerInfo.total)
          return false;
        return true;
      },
    },
    methods: {
      ...mapActions('jobsModules', ['setCurrentJobId']),
      getJobs() {
        if (!this.currentCompanyId) return;

        const payload = {
          oid: this.currentCompanyId,
          ...this.pagerInfo,
        };
        this.$api('searchJobs', payload).then(data => {
          this.jobList = data.records;

          const { current, size, total } = data;
          this.pagerInfo = { ...this.pagerInfo, current, size, total };
        });
      },
      handleCurrentChange(current) {
        this.pagerInfo.current = current;
        this.getJobs();
      },
    },
    mounted() {
      this.getJobs();
    },
  };
</script>

<style lang="scss" scoped>
  .jobListWrapper {
    padding: 20px 0 64px 0;

    .titleArea {
      @include font(26, $text1);

      @include rwd() {
        text-align: center;
        font-size: 17px;
      }
    }

    .listArea {
      @include flex(flex-start, stretch, row, wrap);
      padding-top: 20px;
      margin: 0 -12px;
    }

    .nodata {
      @include area(100%, 100px);
      @include flex();
      color: $text2;
    }

    .pagerArea {
      padding-top: 30px;

      /deep/ .el-pagination {
        @include flex();
      }
    }
  }
</style>
