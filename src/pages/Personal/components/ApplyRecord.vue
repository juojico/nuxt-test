<template>
  <PersonalCard :title="'應徵記錄'" padding>
    <div slot="content">
      <ButtonsMenu :menu="statusMenu" :activeIndex="statusMenuActive" @itemClick="onStatusMenuClick" left />
      <el-table :data="dataForInfoList" stripe>
        <div slot="empty" class="empty">
          <span>尚無資料</span>
        </div>
        <el-table-column label="日期" prop="createTime" width="100">
          <template slot-scope="scope">
            {{scope.row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="公司｜職缺名稱" prop="jobPositionTitle" width="auto">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleTitleCommand">
              <span class="el-dropdown-link title">
                {{scope.row.ownerName}} ｜ {{scope.row.jobPositionTitle}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ target: 'company', value: scope.row.oid }">前往公司頁面</el-dropdown-item>
                <el-dropdown-item :command="{ target: 'job', value: scope.row.jobPositionId }">前往職缺頁面</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="職缺狀態" prop="jobPositionStatus" width="100">
          <template slot-scope="scope">
            {{scope.row.jobPositionStatus | jobStatusLabel}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-dropdown @command="handleActiveCommand">
              <span id="command" class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ target: 'cancel', value: scope.row }">取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="totalNum"></el-pagination>
    </div>
  </PersonalCard>
</template>

<script>
  import PersonalCard from './PersonalCard';
  import ButtonsMenu from '~/components/FilterMenu/ButtonsMenu';

  export default {
    name: 'CollectionRecord',
    components: { PersonalCard, ButtonsMenu },
    data() {
      return {
        statusMenu: [
          { label: '全部', value: null },
          { label: '開啟', value: 1 },
          { label: '關閉', value: 0 },
        ],
        statusMenuActive: 0,
        status: null,
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
          status: this.status,
        };
        this.$api('userGetApplicantList', payload).then(data => {
          this.dataForInfoList = data.records;
          this.totalNum = data.total;
        });
      },
      gotoJobsContent(id) {
        this.$router.push({ name: 'JobsContent', query: { id } });
      },
      gotoCompany(id) {
        this.$router.push({ name: 'Company', query: { id } });
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
      onStatusMenuClick(index, value) {
        this.status = value;
        this.statusMenuActive = index;
      },
      cancelApply(row) {
        this.$confirm('是否取消應徵？', '提示', {
          type: 'warning',
        }).then(() => {
          this.$api('cancelUserApplicant', row.id).then(() => {
            this.fetchData();
          });
        });
      },
      handleActiveCommand(command) {
        switch (command.target) {
          case 'cancel':
            this.cancelApply(command.value);
            break;
        }
      },
      handleTitleCommand(command) {
        switch (command.target) {
          case 'company':
            this.gotoCompany(command.value);
            break;
          case 'job':
            this.gotoJobsContent(command.value);
            break;
        }
      },
    },
    watch: {
      statusMenuActive() {
        this.fetchData();
      },
    },
    mounted() {
      this.fetchData();
    },
  };
</script>
