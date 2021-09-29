<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" :close-on-click-modal="false" @close="onClose" @open="onOpen" class="editDialog">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="學校名稱" prop="name">
        <el-input id="educationName" size="mini" v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科系" prop="department">
        <el-input id="educationDepartment" size="mini" v-model="addForm.department"></el-input>
      </el-form-item>
      <el-form-item label="就讀狀態" prop="status">
        <el-select placeholder="請選擇" id="educationStatus" size="mini" v-model="addForm.status">
          <el-option id="educationStatus0" label="就讀中" value="studying"></el-option>
          <el-option id="educationStatus1" label="畢業" value="graduation"></el-option>
          <el-option id="educationStatus2" label="肄業" value="undergraduate"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入學時間" prop="startDate">
        <el-date-picker id="educationStartDate" v-model="addForm.startDate" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="畢業時間" prop="endDate">
        <el-date-picker id="educationEndDate" v-model="addForm.endDate" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button id="educationClose" type="danger" size="small" @click="close">取消</el-button>
      <el-button id="educationSave" type="primary" size="small" :loading='loadingBtn' @click="onSave">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dialogMixin from '@/mixin/dialog.js';
  import { required } from '@/utils/validation.js';

  export default {
    name: 'EducationAdd',
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
          name: null,
          department: null,
          status: null,
          startDate: '',
          endDate: '',
        },
        rules: {
          name: [required],
          department: [required],
          status: [required],
        },
      };
    },
    computed: {
      dialogTitle() {
        return this.isEdit ? '編輯學歷' : '新增學歷';
      },
    },
    methods: {
      handleAddEducation(payload) {
        this.$api('userAddEducation', payload).then(() => {
          this.$message.success('新增成功!');
          this.updatePageData();
        });
      },
      handleEditEducation(payload) {
        this.$api('userUpdateEducation', payload).then(() => {
          this.$message.success('編輯成功!');
          this.updatePageData();
        });
      },
      onSave() {
        this.$refs['addForm'].validate(valid => {
          if (!valid) {
            return null;
          }
          const payload = Object.assign({}, this.addForm);
          if (!this.addForm.endDate) {
            payload.endDate = '';
          }

          if (this.isEdit) {
            this.handleEditEducation(payload);
          } else {
            this.handleAddEducation(payload);
          }
          this.close();
        });
      },
      onClose() {
        this.$refs.addForm.resetFields();
        this.close();
      },
      onOpen() {
        console.log('onOpen');
        this.addForm = Object.assign({}, this.item);
      },
    },
  };
</script>