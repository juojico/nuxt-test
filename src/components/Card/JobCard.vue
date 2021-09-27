<template>
  <div class="jobCardWrapper">

    <div class="typeBox">
      <el-tag :class="`jobType color${item.type}`">{{item.type | jobTypeLabel}}</el-tag>
    </div>

    <div class="titleBox" @click="gotoJobsContent(item.id)">
      <div class="jobTitle">{{item.title}}</div>
    </div>

    <div class="companyBox" @click="gotoCompany(item.oid)">{{item.company}}</div>

    <div class="salaryBox" @click="gotoJobsContent(item.id)">
      <span v-if="item.salaryType === 0 || item.salaryRange.every(num => num === null)">面議</span>
      <span v-else-if="item.salaryType === 1">{{item.salaryRange | formatMoneyRange('')}} TWD / 時</span>
      <span v-else>{{item.salaryRange | formatMoneyRange}} TWD / 月</span>
    </div>

    <div class="areaBox" @click="gotoJobsContent(item.id)">
      <div class="icon location"></div>
      <span class="area">{{item.areaMasterName}}</span>
      <span class="seniority" v-if="item.seniorityRange.every(num => !num)">不限年資</span>
      <span class="seniority" v-else>{{item.seniorityRange | formatMoneyRange('年')}}</span>
    </div>

    <div v-if="item.jobPositionSkillNames.length > 0" class="communityBox" @click="gotoJobsContent(item.id)">
      <div class="itemArea">
        <el-tag class="skill" v-for="(item,index) in item.jobPositionSkillNames" :key="`skills${index}`">{{item}}</el-tag>
      </div>

    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'JobCard',
    props: {
      item: { type: Object, default: () => {} },
    },
    data() {
      return {
        isFavorite: false,
      };
    },
    methods: {
      ...mapActions('jobs', ['setCurrentJobId', 'setCurrentCompanyId']),
      gotoCompany(id) {
        this.setCurrentCompanyId(id || 0);
        this.$router.push({ name: 'Company', query: { id } });
      },
      gotoJobsContent(id) {
        this.setCurrentJobId(id || 0);
        this.$router.push({ name: 'JobsContent', query: { id } });
      },
    },
    mounted() {
      this.isFavorite = !!this.item.isFavorites;
    },
  };
</script>

<style lang="scss" scoped>
  .jobCardWrapper {
    @include area();
    @include font(16, $text2);
    box-sizing: border-box;
    max-width: calc(33.33% - 24px);
    min-width: 280px;
    flex: 1 1 30%;
    margin: 0 12px 20px 12px;
    padding: 24px 32px;
    border: solid 1px #e2e2e2;
    background-color: white;

    @include rwd($lg) {
      max-width: calc(50% - 24px);
      flex: 1 1 40%;
    }

    @include rwd() {
      max-width: 100%;
      flex: 1 1 100%;
      margin: 0 0 8px 0;
      padding: 20px;
      border-color: transparent;
    }

    .icon {
      @include box(18, 18, relative);

      &.heart {
        @include bg('~@/assets/icon/heart.png');
      }

      &.location {
        @include bg('~@/assets/icon/location.png');
      }
    }

    .typeBox {
      @include flex(space-between);

      .referralMoney {
        @include font(12, $orange);
        padding: 6px 16px;
        background-color: #ffeddb;
      }

      .favoriteBtn {
        @include flex();
        @include font(12, $orange);
        padding: 2px 12px;
        border: 1px solid $orange;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover,
        &.on {
          background-color: $orange;
          color: white;
        }

        .icon {
          margin-right: 8px;
        }
      }
    }

    .titleBox {
      @include flex(space-between);
      padding-top: 16px;
      cursor: pointer;

      .jobTitle {
        @include font(20, $text1);

        &:hover {
          color: $primary;
        }
      }
    }

    .companyBox {
      @include font(14, $text2);
      padding-top: 12px;
      cursor: pointer;

      &:hover {
        color: $primary;
      }
    }

    .salaryBox {
      @include font(16, $primary, bold);
      padding-top: 12px;
    }

    .areaBox {
      @include flex(flex-start);
      @include font(12, $text3);
      padding-top: 12px;

      .area {
        padding: 0 8px;
      }

      .seniority {
        padding: 0 8px;
        border-left: 1px solid $grey2;
      }
    }

    .communityBox {
      margin-top: 12px;
      padding-top: 14px;
      border-top: 1px solid $grey2;

      .itemArea {
        margin: 0 -4px -8px -4px;
      }
    }
  }
</style>
