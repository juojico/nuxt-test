<template>
  <Card>
    <div class="cardHeader">
      <span>提領記錄 </span>
    </div>
    <div class="container">
      <el-table :data="dataForInfoList" stripe>
        <div slot="empty" class="empty">
          <span>尚無資料</span>
        </div>
        <el-table-column label="日期" prop="applyDate"></el-table-column>
        <el-table-column label="公司" prop="company"></el-table-column>
        <el-table-column label="職稱" prop="jobTitle"></el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="totalNum"></el-pagination>
    </div>
  </Card>
</template>

<script>
  export default {
    name: 'WithdrawalRecord',
    data() {
      return {
        dataForInfoList: [],
        currentPage: 1,
        pageSize: 10,
        totalNum: 0,
      };
    },
    methods: {
      getUserWithdrawList() {
        let payload = {
          current: this.currentPage,
          orderField: 'createTime',
          orderSort: 'DESC',
          size: this.pageSize,
        };
        this.$api('userListWithdraw', payload).then(data => {
          this.dataForInfoList = data.records;
          this.totalNum = data.total;
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserWithdrawList();
      },
    },
    created() {
      this.getUserWithdrawList();
    },
  };
</script>
<style lang="scss" scoped>
  .cardWrapper {
    padding: 0;
  }
</style>

