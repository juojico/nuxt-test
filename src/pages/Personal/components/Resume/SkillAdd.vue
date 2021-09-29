<template>
  <el-dialog title="編輯技能列表" :visible.sync="visible" :close-on-click-modal="false" @close="onClose" @open="onOpen" class="editDialog">
    <el-form :model="addForm" ref="addForm">
      <el-form-item label="技能列表">
        <el-cascader v-model="addForm.skillIds" :options="skillTree" placeholder="請選擇或輸入搜索" :props="{
            expandTrigger: 'hover',
            multiple: true,
            checkStrictly: true,
            value: 'value',
            label: 'label',
            emitPath: false,
          }" filterable @change="onSkillChange"></el-cascader>
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
  import { mapGetters } from 'vuex';

  export default {
    name: 'SkillAdd',
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
          skillIds: [],
        },
      };
    },
    computed: {
      ...mapGetters(['skillTree']),
    },
    methods: {
      handleAddSkill(payload) {
        this.$api('userAddSkill', payload).then(() => {
          this.$message.success('新增成功!');
          this.updatePageData();
        });
      },
      onSkillChange(selected) {
        this.addForm.skillIds = selected;
      },
      onSave() {
        this.$refs['addForm'].validate(valid => {
          if (!valid) {
            return null;
          }
          const payload = this.addForm;
          this.handleAddSkill(payload);
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