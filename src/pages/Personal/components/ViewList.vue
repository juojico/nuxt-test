<template>
  <el-form v-if="!isEdit" :model="infoData" ref="infoData" class="content-w18" label-position="left" :label-width="`${labelWidth || '120px'}`">
    <el-form-item v-for="(field, index) in infoFields" :label="field.label" :key="`form_item_${index}`">
      {{format(infoData[field.field], field.filters)}}
      <template v-if="field.field === 'email'">
        <el-button v-if="infoData.isLockEmail === 0" type="text" class="ckeck" @click="sendVerify">驗證信箱</el-button>
        <span v-else class="ckeck"><i class="el-icon-check"></i>信箱已驗證</span>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { filtersLabel } from '~/utils';
  export default {
    name: 'ViewList',
    props: ['infoFields', 'infoData', 'labelWidth'],
    computed: {
      ...mapGetters('personal', ['isEdit']),
    },
    methods: {
      format(val, filters) {
        return filtersLabel(val, filters);
      },
      sendVerify() {
        this.$api('sendEmailVerify')
          .then(data => {
            if (data.code === 100)
              return this.$message.success(
                '驗證信發送成功，請於五分鐘內前往信箱進行驗證，如未收到信請試著查看垃圾郵件',
              );
            else return this.$message.error('發送驗證信失敗...');
          })
          .catch(() => {
            return this.$message.error('發送驗證信失敗...');
          });
      },
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  .ckeck {
    font-size: 12px;
    font-weight: 800;
    color: $green;
    padding-left: 10spx;
  }
</style>