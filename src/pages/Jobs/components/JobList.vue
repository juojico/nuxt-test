<template>
  <div class="jobListWrapper">
    <div class="titleArea">職缺博覽會</div>

    <div class="resultArea">
      <div class="resultTotal">
        <span v-show="total">
          約有 {{total | formatMoney}} 項結果
        </span>
      </div>

      <div class="sortArea">
        <el-select v-model="sort" size="mini" class="select" placeholder="請選擇" clearable @change="onChangeSort">
          <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

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
  import JobCard from '~/components/Card/JobCard';

  export default {
    name: 'JobList',
    props: {
      jobList: { type: Array, default: () => {} },
      total: { type: Number, default: 0 },
      pagerInfo: { type: Object, default: () => {} },
    },
    components: {
      JobCard,
    },
    data() {
      return {
        sortOptions: [
          {
            value: 'seniority_min',
            label: '薪資',
          },
          {
            value: 'create_time',
            label: '刊登時間',
          },
        ],
        sort: '',
      };
    },
    computed: {
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
      onChangeSort(value) {
        const payload = {
          orderField: value,
          orderSort: 'ASC',
        };
        this.$emit('sortChange', payload);
      },
      handleCurrentChange(current) {
        this.$parent.conditions = {
          ...this.$parent.conditions,
          ...this.pagerInfo,
          current,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .jobListWrapper {
    padding: 40px 0 64px 0;

    @include rwd() {
      padding: 32px 0 40px 0;
    }

    .titleArea {
      @include font(26, $text1);

      @include rwd() {
        justify-content: center;
        font-size: 17px;
      }
    }

    .resultArea {
      @include flex(space-between);
      padding-top: 26px;

      .resultTotal {
        @include font(12, $text2);
      }

      .sortArea {
        @include rwd() {
          display: none;
        }

        .select {
          max-width: 100px;
        }
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
