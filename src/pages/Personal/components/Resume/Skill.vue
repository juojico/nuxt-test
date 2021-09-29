<template>
  <PersonalCard :title="'專業技能'">
    <el-button slot="action" id="EducationAddBtn" type="primary" size="mini" @click="openAdd()" v-if="isEdit">
      <i class="el-icon-plus"></i>
      新增技能
    </el-button>
    <div slot="content">
      <el-tag v-for="(item, index) in dataForInfoList" :key="`skillItem${index}`" class="skill">{{item}}</el-tag>
      <SkillAdd v-model="dlgShow" :item="currentItem" :updatePageData="getSkillList" :isEdit="editMode" />
    </div>
  </PersonalCard>
</template>

<script>
  import SkillAdd from './SkillAdd';
  import PersonalCard from '../PersonalCard';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Skill',
    components: { SkillAdd, PersonalCard },
    data() {
      return {
        dlgShow: false,
        editMode: false,
        currentItem: {},
      };
    },
    computed: {
      ...mapGetters('personalModules', ['resumeData', 'isEdit']),
      dataForInfoList() {
        if (!this.resumeData.userSkillList) return [];
        const list = this.resumeData.userSkillList.map(item => {
          return item.skillThreeName;
        });
        return list;
      },
      skillIdList() {
        if (!this.resumeData.userSkillList) return [];
        return this.resumeData.userSkillList.map(item => {
          return item.skillThreeId;
        });
      },
    },
    methods: {
      ...mapActions('personalModules', ['setSkillList']),
      getSkillList() {
        this.$api('userGetSkillList').then(data => {
          this.setSkillList(data);
        });
      },
      openAdd() {
        this.currentItem = {
          skillIds: this.skillIdList,
        };
        this.dlgShow = true;
      },
    },
    mounted() {
      this.getSkillList();
    },
  };
</script>

<style lang="scss" scoped>
  $infoListItemSpace: 20px;

  .infoList {
    padding-top: $infoListItemSpace;

    .noData {
      padding: 1rem;
      background-color: $grey1;
      color: $grey3;
      text-align-last: center;
    }

    .infoListItem {
      position: relative;
      margin-bottom: $infoListItemSpace;
      padding: $infoListItemSpace;
      background-color: $bgGrey1;
      font-size: 16px;
      overflow: hidden;

      .infoListTitle {
        font-size: 18px;
      }

      .infoListDeleteArea {
        position: absolute;
        width: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(to left, transparent, transparent);
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: 10;
        overflow: hidden;
        transform: translateX(100%);
        transition: transform 0.2s;
      }

      &:hover {
        background-color: darken($bgGrey1, 1%);
        .infoListDeleteArea {
          background-image: linear-gradient(to left, white, transparent);
          width: 160px;
          right: 0;
          bottom: 0;
          opacity: 1;
          transform: translateX(0%);
        }
      }
    }

    .infoListContent {
      padding-top: 0px;

      .contentItem {
        .listItemContents {
          display: inline-block;
        }
        span {
          word-break: break-all;
          display: inline-block;
          padding: 0 10px;
          border-right: 1px solid $grey2;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
            border-right: 0;
          }
        }

        &.inline {
          display: inline-block;
          padding: 0 10px;
          border-right: 1px solid $grey2;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
</style>