<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" :close-on-click-modal="false" @close="onClose" @open="onOpen" class="editDialog">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="語言名稱" prop="name">
        <el-input id="languageName" size="mini" v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="聽" prop="listen">
        <el-select placeholder="請選擇" id="languageListen" size="mini" v-model="addForm.listen">
          <el-option :id="`languageListen${index}`" v-for="(item, index) in languageLevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="說" prop="speak">
        <el-select placeholder="請選擇" id="languageSpeak" size="mini" v-model="addForm.speak">
          <el-option :id="`languageSpeak${index}`" v-for="(item, index) in languageLevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讀" prop="reading">
        <el-select placeholder="請選擇" id="languageReading" size="mini" v-model="addForm.reading">
          <el-option :id="`languageReading${index}`" v-for="(item, index) in languageLevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="寫" prop="writing">
        <el-select placeholder="請選擇" id="languageWriting" size="mini" v-model="addForm.writing">
          <el-option :id="`languageWriting${index}`" v-for="(item, index) in languageLevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button id="languageClose" type="danger" size="small" @click="close">取消</el-button>
      <el-button id="languageSave" type="primary" size="small" :loading='loadingBtn' @click="onSave">確定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import dialogMixin from '@/mixin/dialog.js';
  import { required } from '@/utils/validation.js';

  export default {
    name: 'LanguageAdd',
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
        languageLevels: [
          { value: 1, label: '略懂' },
          { value: 2, label: '中等' },
          { value: 3, label: '精通' },
        ],
        addForm: {
          name: null,
          listen: null,
          speak: null,
          reading: null,
          writing: null,
        },
        rules: {
          name: [required],
          listen: [required],
          speak: [required],
          reading: [required],
          writing: [required],
        },
      };
    },
    computed: {
      dialogTitle() {
        return this.isEdit ? '編輯語言能力' : '新增語言能力';
      },
    },
    methods: {
      handleAddLanguage(payload) {
        this.$api('userAddLanguage', payload).then(() => {
          this.$message.success('新增成功!');
          this.updatePageData();
        });
      },
      handleEditLanguage(payload) {
        this.$api('userUpdateLanguage', payload).then(() => {
          this.$message.success('編輯成功!');
          this.updatePageData();
        });
      },
      onSave() {
        this.$refs['addForm'].validate(valid => {
          if (!valid) {
            return null;
          }
          const payload = this.addForm;

          if (this.isEdit) {
            this.handleEditLanguage(payload);
          } else {
            this.handleAddLanguage(payload);
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