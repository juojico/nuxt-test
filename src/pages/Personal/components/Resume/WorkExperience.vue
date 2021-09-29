<template>
  <PersonalCard :title="'工作經歷'">
    <el-button slot="action" id="WorkExperienceAddBtn" type="primary" size="mini" @click="openAdd()" v-if="isEdit">
      <i class="el-icon-plus"></i>
      新增工作經歷
    </el-button>
    <div slot="content">
      <InfoList :dataList="dataForInfoList" :onEdit="openEdit" :onDelete="onDelete" :isEdit="isEdit" />
      <WorkExperienceAdd v-model="dlgShow" :item="currentItem" :updatePageData="getExperienceList" :isEdit="editMode" />
    </div>
  </PersonalCard>
</template>

<script>
  import InfoList from '@/components/InfoList';
  import PersonalCard from '../PersonalCard';
  import WorkExperienceAdd from './WorkExperienceAdd';
  import { getSeniority } from '@/utils';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'WorkExperience',
    components: { InfoList, WorkExperienceAdd, PersonalCard },
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        dlgShow: false,
        editMode: false,
        currentItem: {},
      };
    },
    computed: {
      ...mapGetters('personal', ['resumeData', 'isEdit']),
      dataForInfoList() {
        if (!this.resumeData.userExperienceList) return [];
        let experienceList = [].concat(this.resumeData.userExperienceList);
        const list = experienceList
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
          .map(item => {
            return {
              title: item.title,
              notes: [
                `${item.startDate || ''} ~ ${item.endDate || '至今'}`,
                `${getSeniority(item.seniority)}`,
              ],
              list: [
                {
                  label: '公司名稱：',
                  contents: [
                    item.company || '-',
                    `月薪：${
                      item.monthSalary
                        ? this.$options.filters['formatMoneyK'](item.monthSalary)
                        : '-'
                    }`,
                    `年薪：${
                      item.annualSalary
                        ? this.$options.filters['formatMoneyW'](item.annualSalary)
                        : '-'
                    }`,
                  ],
                },
                { label: '離職原因：', contents: [item.leaveReason || ''] },
                { label: '經歷敘述：', contents: [item.content || ''] },
              ],
            };
          });
        return list;
      },
    },
    methods: {
      ...mapActions('personal', ['setExperienceList']),
      handleDeleteExperience(payload) {
        this.$api('userDeleteExperience', payload).then(() => {
          this.$message.success('刪除成功!');
          this.getExperienceList();
        });
      },
      getExperienceList() {
        this.$api('userGetExperienceList').then(data => {
          this.setExperienceList(data);
        });
      },
      openAdd() {
        this.currentItem = {};
        this.dlgShow = true;
        this.editMode = false;
      },
      openEdit(index) {
        this.currentItem = this.resumeData.userExperienceList[index];
        this.dlgShow = true;
        this.editMode = true;
      },
      onDelete(index) {
        this.$confirm('是否刪除此工作經歷？', '提示', {
          type: 'warning',
        }).then(() => {
          const payload = {
            id: this.resumeData.userExperienceList[index].id,
          };
          this.handleDeleteExperience(payload);
        });
      },
    },
  };
</script>