<template>
  <PersonalCard :title="'社群帳號'">
    <div slot="content">
      <ViewList :infoFields="infoFields" :infoData="infoData" />
      <el-form v-if="isEdit" label-width="120px" :model="infoData" ref="infoData" :rules="rules" class="content-w18">
        <el-form-item id="facebook" label="Facebook" prop="facebook">
          <el-input size="mini" class="input60" v-model="infoData.facebook"></el-input>
        </el-form-item>
        <el-form-item label="Google" prop="google">
          <el-input id="google" class="input60" size="mini" v-model="infoData.google"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </PersonalCard>
</template>

<script>
  import ViewList from '../ViewList';
  import PersonalCard from '../PersonalCard';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Education',
    components: { ViewList, PersonalCard },
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        infoFields: [
          { label: 'Facebook', field: 'facebook' },
          { label: 'Google', field: 'google' },
        ],
        rules: {},
      };
    },
    watch: {
      infoData: {
        handler(value) {
          this.setBasicData(value);
        },
        deep: true,
      },
    },
    computed: {
      ...mapGetters('personal', ['basicData', 'isEdit']),
      infoData: {
        get() {
          return this.basicData;
        },
      },
    },
    methods: { ...mapActions('personal', ['setBasicData']) },
  };
</script>
