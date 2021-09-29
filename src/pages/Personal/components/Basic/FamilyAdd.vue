<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" :close-on-click-modal="false" @close="onClose" @open="onOpen" class="editDialog">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="稱謂" prop="familyTitle">
        <el-input id="familyTitle" size="mini" v-model="addForm.familyTitle"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="familyName">
        <el-input id="familyName" size="mini" v-model="addForm.familyName"></el-input>
      </el-form-item>
      <el-form-item label="存歿" prop="familySurviveStatus">
        <el-select placeholder="請選擇" id="familySurviveStatus" size="mini" v-model="addForm.familySurviveStatus">
          <el-option id="familySurviveStatus0" label="存" :value="0"></el-option>
          <el-option id="familySurviveStatus1" label="歿" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年齡" prop="familyAge">
        <el-input id="familyAge" size="mini" v-model="addForm.familyAge" type="number"></el-input>
      </el-form-item>
      <el-form-item label="職位" prop="familyProfession">
        <el-input id="familyProfession" size="mini" v-model="addForm.familyProfession"></el-input>
      </el-form-item>
      <el-form-item label="職稱" prop="familyJobTitle">
        <el-input id="familyJobTitle" size="mini" v-model="addForm.familyJobTitle"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button id="familyClose" type="danger" size="small" @click="close">取消</el-button>
      <el-button id="familySave" type="primary" size="small" :loading='loadingBtn' @click="onSave">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dialogMixin from '@/mixin/dialog.js';
  import { validNumber } from '@/utils/validation.js';

  export default {
    name: 'FamilyAdd',
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
          familyName: [
            { required: true, message: '請輸入姓名', trigger: 'blur' },
          ],
          familyTitle: [
            { required: true, message: '請輸入稱謂', trigger: 'blur' },
          ],
          familyAge: [{ validator: validNumber, trigger: 'blur' }],
        },
      };
    },
    computed: {
      dialogTitle() {
        return this.isEdit ? '編輯家庭成員' : '新增家庭成員';
      },
    },
    methods: {
      handleAddFamily(payload) {
        this.$api('userAddFamily', payload).then(() => {
          this.$message.success('新增成功!');
          this.updatePageData();
        });
      },
      handleEditFamily(payload) {
        this.$api('userUpdateFamily', payload).then(() => {
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

          if (this.isEdit) {
            this.handleEditFamily(payload);
          } else {
            this.handleAddFamily(payload);
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