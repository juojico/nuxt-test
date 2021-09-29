<template>
  <el-form v-if="!isEdit" :model="infoData" ref="infoData" class="content-w18" label-position="left" :label-width="`${labelWidth || '120px'}`">
    <el-form-item v-for="(field, index) in infoFields" :label="field.label" :key="`form_item_${index}`">
      {{format(infoData[field.field], field.filters)}}
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
      ...mapGetters('personalModules', ['isEdit']),
    },
    methods: {
      format(val, filters) {
        return filtersLabel(val, filters);
      },
    },
    mounted() {},
  };
</script>

