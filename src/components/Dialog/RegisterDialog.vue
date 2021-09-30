<template>
  <el-dialog :visible="registerShow" class="card-dialog" @open="onOpen" @close="onClose" key="registerDialog">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="會員註冊">
        <el-form :label-position="labelPosition" label-width="auto" :model="dataForm" ref="dataForm" :rules="rules" @keyup.native.enter="onClickRegister">
          <el-form-item label="信箱" prop="email">
            <el-input v-model="dataForm.email"></el-input>
          </el-form-item>
          <el-form-item label="身分證/護照號碼" prop="username">
            <el-input v-model="dataForm.username"></el-input>
          </el-form-item>
          <el-form-item label="輸入密碼" prop="password">
            <el-input v-model="dataForm.password" maxlength="16" show-password></el-input>
          </el-form-item>
          <el-form-item label="再次輸入密碼" prop="checkPassword">
            <el-input v-model="dataForm.checkPassword" maxlength="16" show-password></el-input>
          </el-form-item>
          <el-form-item label="輸入驗證碼" prop="captcha">
            <el-input v-model="dataForm.captcha" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item prop="captchaImg">
            <Captcha />
          </el-form-item>
          <el-form-item prop="statute">
            <el-checkbox v-model="dataForm.statute" name="type"></el-checkbox>
            我已確定
            <el-button type="text" @click="onShowRules">使用規約</el-button>內容無誤。
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer">
      <el-button type="warning" :loading="loadingBtn" @click="onClickRegister">註冊</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import dialogMixin from '@/mixin/dialog.js';
  import { required, email, idNumber, password } from '~/utils/validation.js';
  import Captcha from '~/components/Captcha';

  export default {
    name: 'RegisterDialog',
    mixins: [dialogMixin],
    components: { Captcha },
    data() {
      return {
        loadingBtn: false,
        dataForm: {
          statute: false,
        },
        activeTab: 0,
        rules: {
          email: [required, email],
          username: [required, idNumber],
          password: [required, password],
          checkPassword: [required, password],
          captcha: [required],
        },
      };
    },
    computed: {
      ...mapGetters('user', ['captchaCode', 'captchaImg']),
      ...mapGetters('dialog', ['registerShow']),
      labelPosition() {
        if (process.browser) {
          return window.innerWidth > 768 ? 'left' : 'top';
        }
        return 'left';
      },
    },
    methods: {
      ...mapActions('user', ['setCaptchaImg']),
      ...mapActions('dialog', ['setRegisterShow', 'setRulesShow']),
      handleRegister() {
        this.$refs['dataForm'].validate(valid => {
          if (!valid) {
            return null;
          }

          if (this.dataForm.password !== this.dataForm.checkPassword)
            return this.$message.warning('請確認兩次密碼是否相同');

          if (!this.dataForm.statute)
            return this.$message.warning('請閱讀使用規約並勾選');

          this.dataForm.source = 0;

          const payload = {
            ...this.dataForm,
            code: this.captchaCode,
            captcha: this.dataForm.captcha,
          };

          this.$api('userRegister', payload).then(data => {
            this.onClose();
            return this.$message.success('新增成功！請登入開始使用！');
          });
        });
      },
      onClickRegister() {
        this.$gtag.event('註冊', {
          event_category: '按鈕點擊',
          event_label: '註冊',
          value: this.dataForm.username,
        });
        return this.handleRegister();
      },
      onOpen() {
        this.setCaptchaImg();
      },
      onClose() {
        this.dataForm = {
          statute: false,
        };
        this.$refs['dataForm'].clearValidate();
        this.setRegisterShow(false);
      },
      onShowRules() {
        this.setRulesShow(true);
      },
      onCloseRules() {
        this.setRulesShow(false);
      },
    },
  };
</script>