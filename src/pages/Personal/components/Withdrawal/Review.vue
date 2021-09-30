<template>
  <Card>
    <div class="cardHeader">
      <span>賬戶送審狀態： </span>
      <div @click="handelActiveCollapse()">
        <i class="el-icon-plus"></i>
        編輯／查看詳情
      </div>
    </div>
    <el-collapse class="w100 noHeader" v-model="activeCollapse">
      <el-collapse-item name="1">
        <div class="collapse_area">
          <el-form label-width="160px" :model="addData" ref="addData" :rules="rules" class="content-w18">
            <el-form-item label="持卡人姓名" prop="accountHolderName">
              <el-input size="mini" class="input31" v-model="addData.accountHolderName"></el-input>
            </el-form-item>
            <el-form-item label="銀行名稱" prop="bankCode">
              <el-select v-model="addData.bankCode" placeholder="請選擇">
                <el-option v-for="item in bankSelect" :key="`bank${item.bankCode}`" :label="item.bankName" :value="item.bankCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="銀行帳號" prop="bankAccount">
              <el-input class="input31" size="mini" v-model="addData.bankAccount"></el-input>
            </el-form-item>
            <el-form-item label="存摺封面">
              <template>
                <div class="flex100">
                  <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">上傳存摺影本</div>
                  </el-upload>
                </div>
              </template>
            </el-form-item>
            <el-form-item label="存摺封面">
              <template>
                <div class="flex50">
                  <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">上傳身份證正面影本</div>
                  </el-upload>
                  <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">上傳身份證反面影本</div>
                  </el-upload>
                </div>
              </template>
            </el-form-item>
          </el-form>
          <div class="footButton">
            <el-button slot="action" type="warning" size="mini" @click="handleSumbit()">
              提交送審
            </el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </Card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required } from '@/utils/validation.js';
  export default {
    name: 'WithdrawalRecord',
    data() {
      return {
        activeCollapse: [],
        currentItem: {},
        addData: {},
        rules: {
          name: [required],
        },
      };
    },
    computed: {
      ...mapGetters('common', ['bankSelect']),
    },
    methods: {
      getWithdrawInfo() {
        this.$api('userGetWithdrawInfo').then(data => {
          this.addData = data;
        });
      },
      handelActiveCollapse() {
        if (this.activeCollapse.length == 0) {
          this.activeCollapse.push('1');
        } else {
          this.activeCollapse = [];
        }
      },
      handleSumbit() {
        let payload = {
          accountHolderName: this.addData.accountHolderName,
          bankAccount: this.addData.bankAccount,
          bankCode: this.addData.bankCode,
        };
        this.$api('userAddWithdrawInfo', payload).then(data => {
          if (data.code != 100) {
            this.$message.warning(`更新失敗！${data.message}`);
            this.close();
            return;
          }
          this.$message.success('新增成功!');
          this.getWithdrawInfo();
        });
      },
    },
    created() {
      this.getWithdrawInfo();
    },
  };
</script>
<style lang="scss" scoped>
  .cardWrapper {
    padding: 0;
  }
  .w100 {
    width: 100%;
  }
  .flex {
    display: flex;
    > * {
      flex: 40%;
    }
  }
  .footButton {
    text-align: center;
  }
</style>

