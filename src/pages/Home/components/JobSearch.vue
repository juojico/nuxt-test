<template>
  <div class="jobSearchWrapper">
    <Searchbar @search="onSearch" :conditions="conditions"></Searchbar>

    <div class="container">

      <div class="jobList">
        <div class="titleArea">
          <h2>優選職缺・主打推薦</h2>
          <ButtonsMenu :menu="jobMenu" :activeIndex="jobMenuActive" @itemClick="onJobMenuClick" />
          <el-button type="text" class="more" @click="gotoJobs">更多 ></el-button>
        </div>

        <div v-if="jobList" class="listArea">
          <JobCard v-for="(item,index) in jobList" :key="`jobListItem${index}`" :item="item"></JobCard>
        </div>
        <div v-else class="nodata">查無職缺</div>

        <el-button type="primary" class="moreBottom" @click="gotoJobs">查看更多</el-button>

      </div>

    </div>
  </div>
</template>

<script>
  import JobCard from '~/components/Card/JobCard';
  import Searchbar from '~/components/Searchbar';
  import ButtonsMenu from '~/components/FilterMenu/ButtonsMenu';

  export default {
    name: 'JobSearch',
    components: { JobCard, Searchbar, ButtonsMenu },
    props: { jobListData: { type: Array, default: () => [] } },
    data() {
      return {
        // api職缺類型type(0=全職, 1=約聘/派遣, 2=實習, 3=兼職, 4=遠端工作, 5=短期工讀, null=熱門)
        jobMenu: [
          { label: '熱門', value: null },
          { label: '全職', value: 0 },
          { label: '兼職', value: 3 },
          { label: '遠端', value: 4 },
          { label: '派遣', value: 1 },
        ],
        jobMenuActive: 0,
        jobList: this.jobListData,
        conditions: {},
      };
    },
    methods: {
      onSearch(resultData) {
        this.jobList = resultData.records;
      },
      onJobMenuClick(index, value) {
        this.conditions = { type: value };
        this.jobMenuActive = index;
      },
      gotoJobs() {
        this.$router.push('Jobs');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .jobSearchWrapper {
    @include area();
    background-color: $bgGrey1;

    .jobList {
      padding: 40px 0 64px 0;

      .titleArea {
        @include flex(space-between);

        @include rwd() {
          flex-direction: column;
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
    }

    .more {
      padding: 12px;
      color: $text3;

      @include rwd() {
        padding: 6px;
      }
    }

    .moreBottom {
      display: block;
      margin: auto;
    }
  }
</style>
