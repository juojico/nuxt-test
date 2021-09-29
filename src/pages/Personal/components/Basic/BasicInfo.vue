<template>
  <PersonalCard :title="'基本資料'">
    <div slot="content">
      <ViewList :infoFields="infoFields" :infoData="infoData" />
      <el-form v-if="isEdit" :label-position="labelPosition" label-width="120px" :model="infoData" ref="infoData" :rules="rules" class="content-w18">
        <el-form-item label="工作狀態" prop="workStatus">
          <el-radio-group id="workStatus" v-model="infoData.workStatus">
            <el-radio label="incumbent">在職</el-radio>
            <el-radio label="unemployed">待業中</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item id="name" label="中文姓名" prop="name">
          <el-input size="mini" class="input60" v-model="infoData.name"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="englishName">
          <el-input id="englishName" class="input60" size="mini" v-model="infoData.englishName"></el-input>
        </el-form-item>
        <el-form-item label="性別" prop="gender">
          <el-radio-group v-model="infoData.gender">
            <el-radio id="genderMale" label="male">男</el-radio>
            <el-radio id="genderFemale" label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker id="birthday" v-model="infoData.birthday" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="國籍" prop="nationality">
          <el-radio-group id="nationality" v-model="infoData.nationality">
            <el-radio label="native">本國</el-radio>
            <el-radio label="foreign">外籍</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="infoData.nationality === 'foreign' ? '護照號碼' : '身份證字號'" prop="idNumber">
          <el-input id="idNumber" class="input60" size="mini" v-model="infoData.idNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="電子郵件" prop="email">
          <el-input id="email" class="input60" size="mini" v-model="infoData.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="室內電話" prop="telNumber">
          <el-input id="telNumber" class="input60" size="mini" v-model="infoData.telNumber"></el-input>
        </el-form-item>
        <el-form-item label="手機號碼" prop="phoneNumber">
          <el-input id="phoneNumber" class="input60" size="mini" v-model="infoData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="通信地址" prop="correspondenceAddress">
          <el-input id="correspondenceAddress" size="mini" v-model="infoData.correspondenceAddress" @change="checkAddress"></el-input>
        </el-form-item>
        <el-form-item label="婚姻狀態" prop="marriage">
          <el-radio-group id="marriage" v-model="infoData.marriage">
            <el-radio label="single">未婚</el-radio>
            <el-radio label="married">已婚</el-radio>
            <el-radio label="divorced">离婚</el-radio>
            <el-radio label="other">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="特殊身分">
          <el-radio-group id="isSpecialStatus" v-model="infoData.isSpecialStatus">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
          <div class="el-form-item__error">
            是否有低收/身心障礙/跨性別等⋯
          </div>
        </el-form-item>
      </el-form>
    </div>
  </PersonalCard>
</template>

<script>
  import PersonalCard from '../PersonalCard.vue';
  import ViewList from '../ViewList.vue';
  import { mapGetters, mapActions } from 'vuex';
  import { required, email } from '@/utils/validation.js';

  export default {
    name: 'ContactInfo',
    components: { ViewList, PersonalCard },
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        isSameAddress: false,
        rules: {
          email: [required, email],
        },
        infoFields: [
          {
            label: '工作狀態',
            field: 'workStatus',
            filters: 'workStatusLabel',
          },
          { label: '中文姓名', field: 'name' },
          { label: '英文姓名', field: 'englishName' },
          { label: '性別', field: 'gender', filters: 'genderLabel' },
          { label: '出生日期', field: 'birthday' },
          { label: '國籍', field: 'nationality', filters: 'nationalityLabel' },
          { label: '身份證/護照', field: 'idNumber' },
          { label: '電子郵件', field: 'email' },
          { label: '室內電話', field: 'telNumber' },
          { label: '手機號碼', field: 'phoneNumber' },
          { label: '通信地址', field: 'correspondenceAddress' },
          { label: '婚姻狀態', field: 'marriage', filters: 'marriageLabel' },
          {
            label: '特殊身分',
            field: 'isSpecialStatus',
            filters: 'isSpecialStatusLabel',
          },
        ],
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
      ...mapGetters('personalModules', ['basicData', 'isEdit']),
      infoData: {
        get() {
          return this.basicData;
        },
      },
      labelPosition() {
        if (process.browser) {
          return window.innerWidth > 768 ? 'left' : 'top';
        }
      },
    },
    methods: {
      ...mapActions('personalModules', ['setBasicData']),
      checkAddress() {},
    },
  };
</script>

<style lang="scss" scoped>
  .input60 {
    margin-left: 5px;
    width: 60%;
    min-width: 300px;
  }
</style>

