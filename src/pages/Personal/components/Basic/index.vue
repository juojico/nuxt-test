<template>
  <div>
    <PersonalCard padding>
      <template v-slot:content>
        <BasicInfo />
        <Family />
        <!-- <Community /> -->
      </template>
    </PersonalCard>
    <SwitchButton :switchVal="isEdit" :editLabel="'編輯基本資料'" @edit="onEdit" @save="onSave" />
  </div>
</template>

<script>
  import { cleanObj } from '~/utils';
  import { mapActions, mapGetters } from 'vuex';
  import PersonalCard from '../PersonalCard';
  import BasicInfo from './BasicInfo.vue';
  import Family from './Family.vue';
  // import Community from './Community.vue';
  import SwitchButton from '~/components/SwitchButton';

  export default {
    name: 'Jobs',
    components: {
      SwitchButton,
      PersonalCard,
      BasicInfo,
      Family,
      // Community,
    },
    computed: {
      ...mapGetters('personal', ['basicData', 'isEdit']),
    },
    methods: {
      ...mapActions('personal', ['setBasicData', 'setIsEdit']),
      ...mapActions('user', ['setUserName', 'setUserEngName', 'setEmail']),
      onEdit() {
        this.setIsEdit(true);
      },
      onSave() {
        this.setIsEdit(false);
        let payload = cleanObj(this.basicData);

        this.$api('userUpdateUser', payload)
          .then(data => {
            const { name, engName, email } = data;
            this.setUserName(name);
            this.setUserEngName(engName);
            this.setEmail(email);
            this.$message.success('編輯成功!');
          })
          .catch(error => {
            this.$message.warning(`編輯失敗! ${error.message}`);
          });
      },
    },
  };
</script>
