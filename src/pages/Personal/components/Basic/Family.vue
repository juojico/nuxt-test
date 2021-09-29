<template>
  <PersonalCard :title="'家庭成員'">
    <el-button slot="action" id="FamilyAddBtn" type="primary" size="mini" @click="openAdd()" v-if="isEdit">
      <i class="el-icon-plus"></i>
      新增家庭成員
    </el-button>
    <div slot="content">
      <el-table :data="dataForInfoList" stripe>
        <div slot="empty" class="empty">
          <span>尚無資料</span>
        </div>
        <el-table-column label="稱謂" prop="familyTitle"></el-table-column>
        <el-table-column label="姓名" prop="familyName"></el-table-column>
        <el-table-column label="存歿" prop="familySurviveStatus">
          <template slot-scope="scope">
            {{scope.row.familySurviveStatus | familySurviveStatusLabel}}
          </template>
        </el-table-column>
        <el-table-column label="年齡" prop="familyAge"></el-table-column>
        <el-table-column label="職業" prop="familyProfession"></el-table-column>
        <el-table-column label="職稱" prop="familyJobTitle"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="isEdit">
            <el-dropdown @command="handleCommand">
              <span id="command" class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item id="command0" :command="()=>editFamily(scope.row)">編輯</el-dropdown-item>
                <el-dropdown-item id="command1" :command="()=>deleteFamily(scope.row)">刪除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <FamilyAdd v-model="dlgShow" :item="currentItem" :updatePageData="getCustomerFamilyInfoList" :isEdit="editMode" />
    </div>
  </PersonalCard>
</template>

<script>
  import FamilyAdd from './FamilyAdd';
  import PersonalCard from '../PersonalCard.vue';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Family',
    components: { FamilyAdd, PersonalCard },
    data() {
      return {
        dlgShow: false,
        editMode: false,
        currentItem: {},
      };
    },
    computed: {
      ...mapGetters('personal', ['basicData', 'isEdit']),
      dataForInfoList() {
        return this.basicData.userFamilyInfoList;
      },
    },
    methods: {
      ...mapActions('personal', ['setFamilyList']),
      handleDeleteFamily(payload) {
        this.$api('userDeleteFamily', payload).then(() => {
          this.$message.success('刪除成功!');
          this.getCustomerFamilyInfoList();
        });
      },
      getCustomerFamilyInfoList() {
        this.$api('userGetFamilyList').then(data => {
          this.setFamilyList(data);
        });
      },
      openAdd() {
        this.currentItem = {};
        this.editMode = false;
        this.dlgShow = true;
      },
      editFamily(row) {
        this.currentItem = row;
        this.editMode = true;
        this.dlgShow = true;
      },
      deleteFamily(row) {
        this.$confirm('是否刪除此家庭成員？', '提示', {
          type: 'warning',
        }).then(() => {
          const payload = {
            id: row.id,
          };
          this.handleDeleteFamily(payload);
        });
      },
      handleCommand(command) {
        command();
      },
    },
  };
</script>

