<template>
  <PersonalCard :title="'推薦記錄'">
    <div slot="content">
      <el-table :data="dataForInfoList" stripe>
        <div slot="empty" class="empty">
          <span>尚無資料</span>
        </div>
        <el-table-column label="日期" prop="createTime"></el-table-column>
        <el-table-column label="公司名稱" prop="ownerName"></el-table-column>
        <el-table-column label="職缺名稱" prop="jobTitle"></el-table-column>
        <el-table-column label="職缺類別" prop="jobCatName"></el-table-column>
        <el-table-column label="職缺性質" prop="jobTypeName"></el-table-column>
        <el-table-column label="引薦狀態" prop="status">
          <template slot-scope="scope">
            {{scope.row.status | referralStatusLabel}}
          </template>
        </el-table-column>
        <el-table-column label="推薦獎金" prop="referralMoney"></el-table-column>
        <el-table-column label="推薦獎金狀態" prop="referralMoneyStatus">
          <template slot-scope="scope">
            {{scope.row.referralMoneyStatus | referralMoneyStatusLabel}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="totalNum"></el-pagination>
    </div>
  </PersonalCard>
</template>

<script>
  import PersonalCard from './PersonalCard';
  export default {
    name: 'RecommendRecord',
    components: { PersonalCard },
    data() {
      return {
        dataForInfoList: [],
        totalNum: 0,
        currentPage: 1,
        pageSize: 10,
      };
    },
    methods: {
      fetchData() {
        const payload = {
          current: this.currentPage,
          size: this.pageSize,
        };
        this.$api('userGetReferList', payload).then(data => {
          if (data.code != 100) {
            this.reset();
            return this.$message.error(data.message);
          }
          this.dataForInfoList = data.records;
          this.totalNum = data.total;
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData();
      },
      reset() {
        this.dataForInfoList = [];
        this.totalNum = 0;
        this.currentPage = 1;
        this.pageSize = 10;
      },
    },
    mounted() {
      this.fetchData();
    },
  };
</script>
<style lang="scss" scoped>
  .cardWrapper {
    padding: 0;
  }
</style>

