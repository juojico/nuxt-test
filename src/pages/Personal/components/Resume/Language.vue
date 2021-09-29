<template>
  <PersonalCard :title="'擅長語言'">
    <el-button slot="action" id="EducationAddBtn" type="primary" size="mini" @click="openAdd()" v-if="isEdit">
      <i class="el-icon-plus"></i>
      新增語言
    </el-button>
    <div slot="content">
      <InfoList :dataList="dataForInfoList" :onEdit="openEdit" :onDelete="onDelete" :isEdit="isEdit" inline />
      <LanguageAdd v-model="dlgShow" :item="currentItem" :updatePageData="getLanguageList" :isEdit="editMode" />
    </div>
  </PersonalCard>
</template>

<script>
  import InfoList from '@/components/InfoList';
  import LanguageAdd from './LanguageAdd';
  import PersonalCard from '../PersonalCard';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Language',
    components: { InfoList, LanguageAdd, PersonalCard },
    data() {
      return {
        dlgShow: false,
        editMode: false,
        languageLevels: [
          { value: 0, label: '-' },
          { value: 1, label: '略懂' },
          { value: 2, label: '中等' },
          { value: 3, label: '精通' },
        ],
        currentItem: {},
        languageList: [],
      };
    },
    computed: {
      ...mapGetters('personal', ['resumeData', 'isEdit']),
      dataForInfoList() {
        if (!this.languageList) return [];
        const list = this.languageList.map(item => {
          return {
            title: item.name,
            list: [
              { label: '聽：', contents: [this.getLanguageLv(item.listen)] },
              { label: '說：', contents: [this.getLanguageLv(item.speak)] },
              { label: '讀：', contents: [this.getLanguageLv(item.reading)] },
              { label: '寫：', contents: [this.getLanguageLv(item.writing)] },
            ],
          };
        });
        return list;
      },
    },
    methods: {
      ...mapActions('personal', ['setLanguageList']),
      getLanguageLv(value) {
        const currentItem = this.languageLevels.find(
          item => item.value === value,
        );
        return currentItem && currentItem.label;
      },
      handleDeleteLanguage(payload) {
        this.$api('userDeleteLanguage', payload).then(() => {
          this.$message.success('刪除成功!');
          this.getLanguageList();
        });
      },
      getLanguageList() {
        this.$api('userGetLanguageList').then(data => {
          this.languageList = data;
        });
      },
      openAdd() {
        this.currentItem = {};
        this.dlgShow = true;
        this.editMode = false;
      },
      openEdit(index) {
        this.currentItem = this.resumeData.userLanguageList[index];
        this.dlgShow = true;
        this.editMode = true;
      },
      onDelete(index) {
        this.$confirm('是否刪除此語言？', '提示', {
          type: 'warning',
        }).then(() => {
          const payload = {
            id: this.resumeData.userLanguageList[index].id,
          };
          this.handleDeleteLanguage(payload);
        });
      },
    },
    mounted() {
      this.getLanguageList();
    },
  };
</script>