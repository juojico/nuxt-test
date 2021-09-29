<template>
  <div class="ResumeWrapper">
    <div class="container">
      <Card title="上傳履歷">
        <div class="resumeArea" ref="resumeArea">
          <PreviewUpload :uploadFile="onUploadUserFile" @uploadCallback="onUploadCallback" @deleteCallback="onDeleteCallback" />
          <PreviewUpload :uploadFile="onUploadUserFile" @uploadCallback="onUploadCallback" @deleteCallback="onDeleteCallback" />
          <PreviewUpload :uploadFile="onUploadUserFile" @uploadCallback="onUploadCallback" @deleteCallback="onDeleteCallback" />
        </div>
      </Card>
      <Card title="個人資料">
        <div class="registerArea">
          <el-form label-width="150px" :label-position="labelPosition" :model="dataForm" ref="dataForm" :rules="rules" class="content-w18">
            <el-row>
              <el-col>
                <el-form-item id="name" label="中文姓名" prop="name">
                  <el-input size="mini" class="input60" v-model="dataForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker id="birthday" v-model="dataForm.birthday" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性別" prop="gender">
                  <el-radio-group v-model="dataForm.gender">
                    <el-radio id="genderMale" label="male">男</el-radio>
                    <el-radio id="genderFemale" label="female">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="手機號碼" prop="phoneNumber">
                  <el-input id="phoneNumber" class="input60" size="mini" v-model="dataForm.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </Card>
      <Card title="期望工作描述">
        <div class="registerArea">
          <el-form label-width="150px" :model="dataForm" ref="dataForm" :rules="rules" class="content-w18">
            <el-row>
              <el-col>
                <el-form-item label="應徵職務" prop="jobCatIds">
                  <el-cascader size="mini" v-model="dataForm.jobCatIds" :options="jobCatTree" :props="{
                  expandTrigger: 'hover',
                  multiple: true,
                  checkStrictly: true,
                  value: 'value',
                  label: 'label',
                  emitPath: false,
                }" filterable @change="onJobCatIdsChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="偏好產業" prop="industryCategory">
                  <el-cascader size="mini" v-model="dataForm.industryCategory" :options="industryCategoryTree" :props="{
                  expandTrigger: 'hover',
                  checkStrictly: true,
                  value: 'label',
                  label: 'label',
                  emitPath: false,
                }" filterable @change="onIndustryCategoryChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="期望工作地點" prop="areaIds">
                  <el-cascader size="mini" v-model="dataForm.areaIds" :options="areaLocalTree" :props="{
                    expandTrigger: 'hover',
                    multiple: true,
                    checkStrictly: true,
                    value: 'value',
                    label: 'label',
                    emitPath: false,
                  }" filterable @change="onAreaIdsChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="期望年薪" prop="expectedAnnualSalary">
                  <el-input id="expectedAnnualSalary" class="input60" size="mini" v-model="dataForm.expectedAnnualSalary" :min="0" type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </Card>
      <Card title="註冊資料">
        <div class="registerArea">
          <el-form label-width="150px" :model="dataForm" ref="dataForm" :rules="rules" class="content-w18">
            <el-row>
              <el-col>
                <el-form-item label="信箱" prop="email">
                  <el-input size="mini" v-model="dataForm.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="身分證/護照號碼" prop="username">
                  <el-input size="mini" v-model="dataForm.username"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="輸入密碼" prop="password">
                  <el-input size="mini" v-model="dataForm.password" maxlength="16" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="再次輸入密碼" prop="checkPassword" label-position="right">
                  <el-input size="mini" v-model="dataForm.checkPassword" maxlength="16" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="statute">
              <el-checkbox v-model="dataForm.statute" name="type"></el-checkbox>
              是否同意以Email以及身份證字號加入會員，以利未來更方便應徵工作及取得最新業界動態？
            </el-form-item>
            <el-form-item label="輸入驗證碼" prop="captcha">
              <el-input v-model="dataForm.captcha" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="captchaImg">
              <Captcha />
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-button type="warning" @click="onClickRegister">確認上傳</el-button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import {
    required,
    email,
    idNumber,
    password,
    integer,
  } from '@/utils/validation.js';
  import PreviewUpload from '~/components/PreviewUpload';
  import Captcha from '~/components/Captcha';
  export default {
    name: 'Jobs',
    components: { PreviewUpload, Captcha },
    data() {
      return {
        fileList: [],
        pagerInfo: { size: 12, current: 1, total: 0 },
        dataForm: {},
        certificateSrc: '',
        labelPosition: 'right',
        rules: {
          email: [required, email],
          username: [required, idNumber],
          password: [required, password],
          checkPassword: [required, password],
          expectedAnnualSalary: [integer],
        },
        file1: '',
        file2: '',
        file3: '',
      };
    },
    computed: {
      ...mapGetters(['industryCategoryTree', 'jobCatTree', 'areaLocalTree']),
      ...mapGetters('userModules', ['captchaCode']),
    },
    methods: {
      ...mapActions('userModules', ['setCaptchaImg']),
      onAreaIdsChange(selected) {
        this.dataForm.areaIds = selected;
      },
      onJobCatIdsChange(selected) {
        this.dataForm.jobCatIds = selected;
      },
      onIndustryCategoryChange(selected) {
        this.dataForm.industryCategory = selected.join(',');
      },
      onUploadCallback(file) {
        let f = {
          fileName: file.name,
          fileUrl: file.src,
          uid: file.uid,
        };
        this.fileList.push(f);
      },
      onDeleteCallback(file) {
        this.fileList = this.fileList.filter(f => f.uid != file.uid);
      },
      onUploadUserFile(payload, callback) {
        this.$api('registerUploadFile', payload, callback);
      },
      handleRegister() {
        this.$refs['dataForm'].validate(valid => {
          if (!valid) {
            return null;
          }

          if (this.dataForm.password !== this.dataForm.checkPassword)
            return this.$message.warning('請確認兩次密碼是否相同');

          if (!this.dataForm.statute)
            return this.$message.warning('請閱讀使用規約並勾選');

          const payload = {
            ...this.dataForm,
            source: 4,
            code: this.captchaCode,
            captcha: this.dataForm.captcha,
            userfileInfoLt: this.fileList,
          };

          this.$api('userRegister', payload).then(data => {
            if (data.code != 100) return this.$message.error(data.message);
            this.$message.success('新增成功！請登入開始使用！');
            this.$router.replace('/');
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
    },
    mounted() {
      this.setCaptchaImg();
    },
  };
</script>

<style lang="scss" scoped>
  .ResumeWrapper {
    @include area();
    background-color: $bgGrey1;

    .resumeArea {
      @include position(0, $headerHeight);
      z-index: $indexNav;
      display: flex;
      justify-content: space-between;
      padding: 25px;
      > * {
        flex: 33%;
        text-align: center;
        padding: 25px;
        margin: 0 10px;
        border: 1px solid #000;
      }

      @include rwd($xl) {
        top: $headerHeightL;
      }

      @include rwd() {
        top: $headerHeightS;
      }
    }
    .registerArea {
      @include position(0, $headerHeight);
      z-index: $indexNav;
      padding: 25px;
      .el-row {
        margin-bottom: 5px;
      }
    }
    .footer {
      text-align: center;
    }
  }
</style>

