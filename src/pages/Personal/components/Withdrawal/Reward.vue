<template>
  <PersonalCard :title="'獎金狀態'">
    <el-button slot="action" type="warning" size="mini" @click="openAdd()">
      申請款項
    </el-button>
    <div slot="fullContent">
      <SplitArea :splitArray="splitArray" />
      <el-dialog :visible.sync="dlgShow">
        <el-form label-width="130px" :model="addForm" ref="addForm">
          <el-form-item label="撥款金額" prop="name">
            <el-input id="withdrawAmount" size="mini" type="number" :min="0" v-model="addForm.withdrawAmount"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button id="languageClose" type="danger" size="small" @click="dlgShow=false">取消</el-button>
          <el-button id="languageSave" type="primary" size="small" @click="onSave">確定</el-button>
        </div>
      </el-dialog>
    </div>
  </PersonalCard>
</template>

<script>
  import SplitArea from '~/components/SplitArea';
  import PersonalCard from '../PersonalCard.vue';
  export default {
    components: { SplitArea, PersonalCard },
    name: 'WithdrawalRecord',
    props: {
      title: { type: String, default: '' },
      infoData: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {
        splitArray: [
          { label: '未結算獎金', value: '0' },
          { label: '獎金餘額', value: '0' },
          { label: '撥款中', value: '0' },
          { label: '已提領獎金', value: '0' },
        ],
        dlgShow: false,
        addForm: {},
      };
    },
    methods: {
      getWithdrawAmount() {
        this.$api('userGetWithdrawAmount').then(data => {
          if (data.code != 100) {
            return this.$message.error(
              data.message || '伺服器不穩定，請稍後在試！',
            );
          }
          this.splitArray = [
            { label: '未結算獎金', value: data.totalUnSettleAmount },
            { label: '獎金餘額', value: data.totalBalanceAmount },
            { label: '撥款中', value: data.totalGrantingAmount },
            { label: '已提領獎金', value: data.totalWithdrawnAmount },
          ];
        });
      },
      openAdd() {
        this.dlgShow = true;
      },
      onSave() {
        const payload = this.addForm;
        this.$api('userAddWithdraw', payload).then(data => {
          if (data.code != 100) {
            this.$message.warning(`申請失敗！${data.message}`);
            this.close();
            return;
          }
          this.$message.success('新增成功!');
          this.getWithdrawAmount();
        });
        this.close();
      },
    },
    created() {
      this.getWithdrawAmount();
    },
  };
</script>
<style lang="scss" scoped>
  .cardWrapper {
    padding: 0;
  }
</style>

