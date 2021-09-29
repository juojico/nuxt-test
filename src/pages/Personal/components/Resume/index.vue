<template>
  <div>
    <PersonalCard padding>
      <template v-slot:content>
        <ResumeBasic />
        <Education />
        <WorkExperience />
        <Skill />
        <Language />
        <ResumeUpload />
      </template>
    </PersonalCard>
    <SwitchButton :switchVal="isEdit" :editLabel="'編輯我的履歷'" @edit="onEdit" @save="onSave" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import SwitchButton from '~/components/SwitchButton';
  import PersonalCard from '../PersonalCard';
  import ResumeBasic from './ResumeBasic.vue';
  import Education from './Education.vue';
  import WorkExperience from './WorkExperience.vue';
  import Skill from './Skill.vue';
  import Language from './Language.vue';
  import ResumeUpload from './ResumeUpload.vue';

  export default {
    name: 'Jobs',
    props: {
      updatePageData: { type: Function, default: () => {} },
    },
    components: {
      SwitchButton,
      PersonalCard,
      ResumeBasic,
      Education,
      WorkExperience,
      Skill,
      Language,
      ResumeUpload,
    },
    computed: {
      ...mapGetters('personal', ['isEdit', 'resumeData']),
    },
    methods: {
      ...mapActions('personal', ['setResumeData', 'setIsEdit']),
      onEdit() {
        this.setIsEdit(true);
      },
      onSave() {
        this.setIsEdit(false);
       this.$api('userUpdateUserResume', this.resumeData).then(data => {
          if (data.code == 100) {
            this.$message.success('編輯成功!');
            this.updatePageData();
          } else {
            this.$message.warning(`編輯失敗! ${data.message}`);
          }
        });
      },
    },
    mounted() {},
  };
</script>
