<template>
  <el-dialog :visible.sync="visible" title="我要應徵" :show-close="false" @close="onClose">
    <el-form :label-width="labelWidth" :model="dataForm" ref="dataForm" :rules="rules">
      <el-form-item label="應徵工作">
        <span class="title">{{title}}</span>
        <span class="company">{{ownerName}}</span>
      </el-form-item>
      <el-form-item label="選擇履歷">
        <el-radio v-model="resume" label="1">我的履歷</el-radio>
      </el-form-item>
      <el-form-item label="自傳描述" prop="content">
        <el-input type="textarea" v-model="dataForm.content" :autosize="{ minRows: 8, maxRows: 10}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="warning" plain @click="onClose">取消應徵</el-button>
      <el-button type="warning" @click="onClickSend">送出</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import dialogMixin from '@/mixin/dialog.js';
  import { required } from '@/utils/validation.js';

  export default {
    name: 'ApplyDialog',
    mixins: [dialogMixin],
    props: {
      title: { type: String, default: '' },
      ownerName: { type: String, default: '' },
    },
    data() {
      return {
        dataForm: {},
        dataFormCompany: {},
        activeTab: 0,
        resume: '1',
        rules: {
          content: [required],
        },
      };
    },
    computed: {
      ...mapGetters('jobs', ['currentJobId']),
      ...mapGetters('user', ['userName']),
      labelWidth() {
        if (process.browser) {
          return window.innerWidth > 768 ? 'auto' : '';
        }
      },
    },
    methods: {
      userApply() {
        const payload = {
          jobPositionId: this.currentJobId,
          content: this.dataForm.content,
        };
        this.$refs['dataForm'].validate(valid => {
          if (!valid) {
            return null;
          }
          this.$api('userAddApplicant', payload).then(data => {
            if (data.code == 100) {
              this.$message.success('應徵成功!');
            } else {
              this.$message.warning(`應徵失敗! ${data.message}`);
            }
          });

          this.close();
        });
      },
      onClickSend() {
        this.$gtag.event('應徵職缺', {
          event_category: '按鈕點擊',
          event_label: '應徵職缺',
          value: `userName: ${this.userName}, jobId: ${this.currentJobId}`,
        });
        return this.userApply();
      },
      onClose() {
        this.$gtag.event('關閉應徵職缺彈窗', {
          event_category: '按鈕點擊',
          event_label: '關閉應徵職缺彈窗',
          value: `userName: ${this.userName}, jobId: ${this.currentJobId}`,
        });
        this.dataForm = {};
        this.$refs['dataForm'].clearValidate();
        this.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog {
    width: 560px;
    max-width: calc(100% - 28px);

    .el-dialog__header {
      padding: 24px 38px;

      @include rwd() {
        padding: 11px 16px;
      }

      .el-dialog__title {
        @include font(20, $text1, bold, 24);

        @include rwd() {
          @include font(16, $text1, bold, 16);
        }
      }
    }

    .el-dialog__body {
      padding: 0 38px 40px 38px;

      @include rwd() {
        padding: 0 20px 16px 20px;
      }

      .el-form-item {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .el-form-item__label {
          @include font(16, $text1);
          width: 160px;
          text-align: left;

          @include rwd() {
            width: 100%;
            font-size: 15px;
          }
        }

        .el-form-item__content {
          margin-left: 160px;

          @include rwd() {
            margin-left: 0;
          }

          .title {
            @include font(16, $primary, false, 16);
            display: block;
            padding-top: 12px;
          }

          .company {
            @include font(14, $text1, false, 14);
          }
        }
      }
    }

    .el-dialog__footer {
      padding: 0 28px 22px 28px;
    }
  }
</style>