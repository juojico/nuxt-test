<template>
  <div>
    <PersonalCard :title="'求職條件'">
      <div slot="content">
        <ViewList label-width="120px" :infoFields="infoFields" :infoData="infoData" />
        <el-form v-if="isEdit" label-width="120px" :model="infoData" ref="infoData" :rules="rules" :label-position="labelPosition" class="content-w18">
          <el-form-item label="希望性質" prop="hopeJobNatureStatus">
            <el-select placeholder="請選擇" id="hopeJobNatureStatus" size="mini" v-model="infoData.hopeJobNatureStatus">
              <el-option id="hopeJobNatureStatus0" label="全職" :value="0"></el-option>
              <el-option id="hopeJobNatureStatus1" label="約聘" :value="1"></el-option>
              <el-option id="hopeJobNatureStatus2" label="實習" :value="2"></el-option>
              <el-option id="hopeJobNatureStatus3" label="兼職" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上班時段" prop="workTimeType">
            <el-radio-group v-model="infoData.workTimeType">
              <el-radio id="genderMale" :label="0">早班</el-radio>
              <el-radio id="genderMale" :label="3">中班</el-radio>
              <el-radio id="genderMale" :label="1">晚班</el-radio>
              <el-radio id="genderMale" :label="2">假日班</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="可到班日" prop="estimedAvailableTime">
            <el-date-picker id="estimedAvailableTime" v-model="infoData.estimedAvailableTime" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" size="mini">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否可至國外工作">
            <el-radio-group id="acceptableAbroad" v-model="infoData.acceptableAbroad" @change="onAcceptableAbroadChange">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是, 可接受國家：</el-radio>
            </el-radio-group>
            <el-cascader :disabled="!infoData.acceptableAbroad == 1" v-model="infoData.acceptableCountry" :options="areaWorldTree" :props="{
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: true,
              value: 'value',
              label: 'label',
              emitPath: false,
            }" filterable @change="onActWorldChange"></el-cascader>
          </el-form-item>
          <el-form-item label="台灣可接受工作縣市" prop="acceptableInTaiwan">
            <el-cascader v-model="infoData.acceptableInTaiwan" :options="areaLocalTree" :props="{
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: true,
              value: 'value',
              label: 'label',
              emitPath: false,
            }" filterable @change="onActTaiwanChange"></el-cascader>
          </el-form-item>
          <el-form-item label="偏好產業" prop="preferredIndustry">
            <el-input id="preferredIndustry" class="input60" size="mini" v-model="infoData.preferredIndustry"></el-input>
          </el-form-item>
          <el-form-item label="排斥產業" prop="exclusionIndustry">
            <el-input id="exclusionIndustry" class="input60" size="mini" v-model="infoData.exclusionIndustry"></el-input>
          </el-form-item>
          <el-form-item label="期望月薪" prop="expectedMonthSalary">
            <el-input id="expectedMonthSalary" class="input60" size="mini" v-model="infoData.expectedMonthSalary" type="number"></el-input>
          </el-form-item>
          <el-form-item label="期望年薪" prop="expectedAnnualSalary">
            <el-input id="expectedAnnualSalary" class="input60" size="mini" v-model="infoData.expectedAnnualSalary" type="number"></el-input>
          </el-form-item>
          <el-form-item label="預計可到職時間" prop="estimedAvailableTime">
            <el-date-picker id="estimedAvailableTime" v-model="infoData.estimedAvailableTime" type="date" placeholder="選擇日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </PersonalCard>
  </div>
</template>

<script>
  import ViewList from '../ViewList.vue';
  import { mapGetters, mapActions } from 'vuex';
  import PersonalCard from '../PersonalCard';

  export default {
    name: 'ContactInfo',
    components: { PersonalCard, ViewList },
    props: {
      title: { type: String, default: '' },
    },
    data() {
      return {
        isSameAddress: false,
        rules: {},
        infoFields: [
          {
            label: '希望性質',
            field: 'hopeJobNatureStatus',
            filters: 'jobTypeLabel',
          },
          { label: '上班時段', field: 'workTimeType', filters: 'workShiftLabel' },
          {
            label: '可到班日',
            field: 'estimedAvailableTime',
            filters: 'formatDate',
          },
          {
            label: '是否可至國外工作',
            field: 'acceptableCountryName',
          },
          {
            label: '台灣可接受工作縣市',
            field: 'acceptableInTaiwanName',
          },
          {
            label: '偏好產業',
            field: 'preferredIndustry',
          },
          {
            label: '排斥產業',
            field: 'exclusionIndustry',
          },
          {
            label: '期望月薪',
            field: 'expectedMonthSalary',
            filters: 'formatMoneyK',
          },
          {
            label: '期望年薪',
            field: 'expectedAnnualSalary',
            filters: 'formatMoneyK',
          },
          {
            label: '預計可到職時間',
            field: 'estimedAvailableTime',
          },
        ],
        resumeFiles: [],
      };
    },
    watch: {
      infoData: {
        handler(value) {
          this.setResumeData(value);
        },
        deep: true,
      },
    },
    computed: {
      ...mapGetters('personalModules', ['isEdit', 'resumeData']),
      ...mapGetters(['areaLocalTree', 'areaWorldTree']),
      infoData: {
        get() {
          return this.resumeData;
        },
      },
      labelPosition() {
        if (process.browser) {
          return window.innerWidth > 768 ? 'left' : 'top';
        }
      },
    },
    methods: {
      ...mapActions('personalModules', ['setResumeData']),
      onAcceptableAbroadChange() {
        this.infoData.acceptableCountry = [];
      },
      onActWorldChange(selected) {
        this.infoData.acceptableCountry = selected;
      },
      onActTaiwanChange(selected) {
        this.infoData.acceptableInTaiwan = selected;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .flex {
    display: flex;
    > * {
      flex: 40%;
    }
  }
</style>