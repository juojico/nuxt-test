<template>
  <PersonalCard :title="'學歷'">
    <el-button slot="action" id="EducationAddBtn" type="primary" size="mini" @click="openAdd()" v-if="isEdit">
      <i class="el-icon-plus"></i>
      新增學歷
    </el-button>
    <div slot="content">
      <InfoList :dataList="dataForInfoList" :onEdit="openEdit" :onDelete="onDelete" :isEdit="isEdit" />
      <EducationAdd v-model="dlgShow" :item="currentItem" :updatePageData="getEducationList" :isEdit="editMode" />
    </div>
  </PersonalCard>
</template>

<script>
  import InfoList from '@/components/InfoList';
  import EducationAdd from './EducationAdd';
  import PersonalCard from '../PersonalCard';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Education',
    components: { InfoList, PersonalCard, EducationAdd },
    data() {
      return {
        dlgShow: false,
        editMode: false,
        schoolStatus: {
          studying: '就讀中',
          graduation: '畢業',
          undergraduate: '肄業',
        },
        currentItem: {},
      };
    },
    computed: {
      ...mapGetters('personalModules', ['resumeData', 'isEdit']),
      dataForInfoList() {
        if (!this.resumeData.userEducationList) return [];
        let educationList = [].concat(this.resumeData.userEducationList);
        const list = educationList
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
          .map(item => {
            return {
              title: item.name,
              notes: [`${item.startDate || ''} ~ ${item.endDate || ''}`],
              list: [
                {
                  contents: [
                    item.department || '',
                    item.status ? this.schoolStatus[item.status] : '',
                  ],
                },
              ],
              remark: item.remark || '',
            };
          });
        return list;
      },
    },
    methods: {
      ...mapActions('personalModules', ['setEducationList']),
      handleDeleteEducation(payload) {
        this.$api('userDeleteEducation', payload).then(() => {
          this.$message.success('刪除成功!');
          this.getEducationList();
        });
      },
      getEducationList() {
        this.$api('userGetEducationList').then(data => {
          this.setEducationList(data);
        });
      },
      openAdd() {
        this.currentItem = {};
        this.dlgShow = true;
        this.editMode = false;
      },
      openEdit(index) {
        this.currentItem = this.resumeData.userEducationList[index];
        this.dlgShow = true;
        this.editMode = true;
      },
      onDelete(index) {
        this.$confirm('是否刪除此學歷？', '提示', {
          type: 'warning',
        }).then(() => {
          const payload = {
            id: this.resumeData.userEducationList[index].id,
          };
          this.handleDeleteEducation(payload);
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .cardWrapper {
    padding: 0;
  }
</style>

