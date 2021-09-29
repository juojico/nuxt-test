<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" :close-on-click-modal="false" @close="onClose" @open="onOpen" class="editDialog">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="職稱" prop="title">
        <el-input id="workExperienceTitle" size="mini" v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="公司名稱" prop="company">
        <el-input id="workExperienceCompany" size="mini" v-model="addForm.company"></el-input>
      </el-form-item>
      <el-form-item label="月薪" prop="monthSalary">
        <el-input id="workExperienceMonthSalary" size="mini" v-model="addForm.monthSalary" type="number"></el-input>
      </el-form-item>
      <el-form-item label="年薪" prop="annualSalary">
        <el-input id="workExperienceAnnualSalary" size="mini" v-model="addForm.annualSalary" type="number"></el-input>
      </el-form-item>
      <el-form-item label="工作內容" prop="content">
        <el-input id="workExperienceContent" type="textarea" :rows="4" size="mini" v-model="addForm.content"></el-input>
      </el-form-item>
      <el-form-item label="到職日" prop="startDate">
        <el-date-picker id="workExperienceStartDate" v-model="addForm.startDate" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="離職日" prop="endDate">
        <el-date-picker id="workExperienceEndDate" v-model="addForm.endDate" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="在職時間">
        <span id="workExperienceSeniority">{{getSeniority(seniority)}}</span>
      </el-form-item>
      <el-form-item label="離職原因" prop="leaveReason">
        <el-input id="workExperienceLeaveReason" size="mini" v-model="addForm.leaveReason"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button id="workExperienceClose" type="danger" size="small" @click="close">取消</el-button>
      <el-button id="workExperienceSave" type="primary" size="small" :loading='loadingBtn' @click="onSave">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dialogMixin from '@/mixin/dialog.js';
  import { cleanObj, getMonthDiff, getSeniority } from '@/utils';
  import { required } from '@/utils/validation.js';

  export default {
    name: 'WorkExperienceAdd',
    mixins: [dialogMixin],
    props: {
      updatePageData: { type: Function, default: () => {} },
      isEdit: { type: Boolean, default: false },
      item: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {
        loadingBtn: false,
        addForm: {
          title: null,
          company: null,
          monthSalary: null,
          annualSalary: null,
          content: null,
          startDate: null,
          endDate: null,
          seniority: 0,
          leaveReason: null,
        },
        rules: {
          title: [required],
          company: [required],
          content: [required],
          startDate: [required],
        },
      };
    },
    computed: {
      dialogTitle() {
        return this.isEdit ? '編輯工作經歷' : '新增工作經歷';
      },
      seniority() {
        if (this.addForm.startDate && this.addForm.endDate) {
          let month = getMonthDiff(
            new Date(this.addForm.startDate),
            new Date(this.addForm.endDate),
          );
          return month;
        } else {
          return '-';
        }
      },
    },
    methods: {
      getSeniority(month) {
        return getSeniority(month);
      },
      handleAddExperience(payload) {
        this.$api('userAddExperience', payload).then(() => {
          this.$message.success('新增成功!');
          this.updatePageData();
        });
      },
      handleEditExperience(payload) {
        this.$api('userUpdateExperience', payload).then(() => {
          this.$message.success('編輯成功!');
          this.updatePageData();
        });
      },
      onSave() {
        this.$refs['addForm'].validate(valid => {
          if (!valid) {
            return null;
          }
          const payload = cleanObj(this.addForm);
          if (this.seniority == '-') {
            payload.seniority = 0;
          } else {
            payload.seniority = this.seniority;
          }
          if (this.isEdit) {
            this.handleEditExperience(payload);
          } else {
            this.handleAddExperience(payload);
          }
          this.close();
        });
      },
      onClose() {
        this.$refs.addForm.resetFields();
        this.close();
      },
      onOpen() {
        this.addForm = Object.assign({}, this.item);
      },
    },
  };
</script>