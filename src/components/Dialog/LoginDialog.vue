<template>
  <el-dialog :visible.sync="isLoginShow" class="card-dialog" @open="onOpen" @close="onClose">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="會員登入">
        <el-form :label-position="labelPosition" label-width="auto" :model="dataForm" ref="dataForm" :rules="rules" @keyup.native.enter="onClickLogin">
          <el-form-item label="身分證/護照號碼" prop="idNumber">
            <el-input v-model="dataForm.idNumber"></el-input>
          </el-form-item>
          <el-form-item label="輸入密碼" prop="password">
            <el-input v-model="dataForm.password" maxlength="16" show-password></el-input>
          </el-form-item>
          <el-form-item label="輸入驗證碼" prop="captcha">
            <el-input v-model="dataForm.captcha" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item prop="captchaImg">
            <Captcha />
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

    <div slot="footer">
      <el-button type="warning" @click="onClickLogin">登入</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import dialogMixin from '@/mixin/dialog';
  import { required, idNumber, password } from '~/utils/validation';
  import Captcha from '~/components/Captcha';

  export default {
    name: 'LoginDialog',
    mixins: [dialogMixin],
    components: { Captcha },
    data() {
      return {
        dataForm: {},
        dataFormCompany: {},
        activeTab: 0,
        rules: {
          idNumber: [required, idNumber],
          password: [required, password],
          captcha: [required],
        },
      };
    },
    computed: {
      ...mapGetters('user', ['token', 'captchaCode']),
      ...mapGetters('dialog', ['loginShow']),
      isLoginShow: {
        get: function () {
          return this.loginShow;
        },
        set: function (newValue) {
          this.setLoginShow(newValue);
        },
      },
      labelPosition() {
        if (process.browser) {
          return window.innerWidth > 768 ? 'left' : 'top';
        }
        return 'left';
      },
    },
    methods: {
      ...mapActions('user', [
        'setToken',
        'setIsMaster',
        'setOid',
        'setUserName',
        'setUserEngName',
        'setUserIdNumber',
        'setEmail',
        'setCaptchaImg',
      ]),
      ...mapActions('dialog', ['setLoginShow']),
      handleSubmit() {
        let callback = data => {
          // 登入失敗
          if (!data || !data.accessToken) {
            this.setCaptchaImg();
            return this.$message.error(data.message || '帳號資訊不完整！');
          }
          this.setToken(data.accessToken);
          // this.setIsMaster(data.isMaster);
          // this.setOid(data.oid);
          this.setUserName(data.name || '');
          this.setUserEngName(data.engName || '');
          this.setUserIdNumber(data.idNumber || '');
          this.setEmail(data.email || '');
          this.setLoginShow(false);
          this.close();
        };
        this.$refs.dataForm.validate(valid => {
          if (!valid) {
            return false;
          }
          let body = {
            username: this.dataForm.idNumber,
            password: this.dataForm.password,
            code: this.captchaCode,
            captcha: this.dataForm.captcha,
          };
          this.$api('userLogin', body)
            .then(data => {
              callback(data);
            })
            .catch(() => {
              return this.$message.error('登入失敗...');
            });
        });
      },
      companyLogin() {
        console.log('companyLogin');
      },
      onClickLogin() {
        this.$gtag.event('登入', {
          event_category: '按鈕點擊',
          event_label: '登入',
          value: this.dataForm.idNumber,
        });
        if (this.activeTab == 1) {
          return this.companyLogin();
        }
        return this.handleSubmit();
      },
      onOpen() {
        this.setCaptchaImg();
      },
      onClose() {
        this.dataForm = {};
        this.$refs['dataForm'].clearValidate();
        this.setLoginShow(false);
        this.close();
      },
      refreshCaptcha() {
        this.setCaptchaImg();
      },
    },
  };
</script>