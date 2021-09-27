<template>
  <div v-if="!hidden" class="filterMenuWrapper">
    <div class="container">
      <el-select v-model="filterMenuSelect.updateTime" placeholder="更新日期" clearable @change="onChangeItem">
        <el-option v-for="(item, index) in filterOptions.updateTime" :key="`updateTime${index}`" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="filterMenuSelect.type" placeholder="工作類型" clearable @change="onChangeItem">
        <el-option v-for="(item, index) in filterOptions.type" :key="`type${index}`" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="filterMenuSelect.salary" placeholder="薪資待遇" clearable @change="onChangeItem">
        <el-option v-for="(item, index) in filterOptions.salary" :key="`salary${index}`" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-input v-show="filterMenuSelect.salary === 'custom'" type="text" :placeholder="`如${salarySelect == 1 ? 180 : 32000}`" v-model="salaryInput" class="input-with-select" maxlength="7" @change="onChangeItem">
        <el-select v-model="salarySelect" slot="prepend" placeholder="請選擇" class="salarySelect" @change="onChangeItem">
          <el-option label="時薪" value="1"></el-option>
          <el-option label="月薪" value="2"></el-option>
        </el-select>
        <template slot="append">UP</template>
      </el-input>

      <el-select v-model="filterMenuSelect.seniority" placeholder="經歷要求" clearable @change="onChangeItem">
        <el-option v-for="(item, index) in filterOptions.seniority" :key="`seniority${index}`" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button type="text" @click="clear">清除細項</el-button>
    </div>
  </div>
</template>

<script>
  import { cleanObj } from '~/utils';

  export default {
    name: 'FilterMenu',
    props: { hidden: { type: Boolean, default: false } },
    data() {
      return {
        filterOptions: {
          updateTime: [
            {
              value: 1,
              label: '本日最新',
            },
            {
              value: 3,
              label: '三日內',
            },
            {
              value: 7,
              label: '一週內',
            },
            {
              value: 14,
              label: '兩週內',
            },
            {
              value: 30,
              label: '一個月內',
            },
          ],
          type: [
            {
              value: 0,
              label: '全職',
            },
            {
              value: 1,
              label: '約聘/派遣',
            },
            {
              value: 2,
              label: '實習',
            },
            {
              value: 3,
              label: '兼職',
            },
            {
              value: 4,
              label: '遠端工作',
            },
            {
              value: 5,
              label: '短期工讀',
            },
          ],
          salary: [
            {
              value: [160, null, 1],
              label: '時薪160UP',
            },
            {
              value: [30000, null, 2],
              label: '月薪3萬UP',
            },
            {
              value: [40000, null, 2],
              label: '月薪4萬UP',
            },
            {
              value: 'custom',
              label: '自訂',
            },
          ],
          seniority: [
            {
              value: [null, 1],
              label: '一年以下',
            },
            {
              value: [1, 3],
              label: '一到三年',
            },
            {
              value: [3, 5],
              label: '三到五年',
            },
            {
              value: [5, 10],
              label: '五到十年',
            },
            {
              value: [10, null],
              label: '十年以上',
            },
          ],
        },
        filterMenuSelect: {
          updateTime: null,
          type: null,
          salary: null,
          salaryType: null,
          seniority: null,
        },
        salaryInput: '',
        salarySelect: '2',
      };
    },
    methods: {
      clear() {
        this.filterMenuSelect = this.$options.data().filterMenuSelect;
        this.$emit('filterChange', {});
      },
      onChangeItem() {
        let { salary, salaryType } = this.filterMenuSelect;
        if (salary) {
          if (salary === 'custom') {
            salaryType = Number(this.salarySelect);
            salary = [Number(this.salaryInput), null];
          } else {
            salaryType = salary[2];
            salary = salary.slice(0, 2);
          }
        }

        let payload = {
          ...this.filterMenuSelect,
          salary,
          salaryType,
        };

        for (const [key, value] of Object.entries(payload)) {
          if (value === null || value === '') {
            delete payload[key];
          }
        }

        this.$emit('filterChange', cleanObj(payload));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .filterMenuWrapper {
    @include area();
    padding: 12px 0;
    background-color: white;

    > .container {
      @include rwd() {
        @include flex();
        flex-wrap: wrap;
        padding: 0;
      }

      > .el-select {
        max-width: 140px;
        margin: 4px 8px;

        @include rwd() {
          flex: 1;
          min-width: 120px;
        }
      }
    }

    .input-with-select {
      max-width: 260px;
      margin-right: 16px;

      .el-select {
        width: 80px;
        margin-right: 0;
      }
    }

    .el-button--text {
      padding: 0.5em 1em;
    }
  }
</style>

