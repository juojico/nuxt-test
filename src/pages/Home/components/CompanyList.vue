<template>
  <div class="companyListWrapper">
    <div class="container">

      <div class="companyListArea">
        <div class="titleArea">
          <h2>嚴選企業・擴編熱招</h2>
        </div>

        <div v-if="companyList.length > 0" class="listArea">
          <div class="companyItem" v-for="(item,index) in companyList" :key="`companyItem${index}`" @click="gotoCompany(item.oid)">
            <el-avatar :src="item.logoUrl || require('assets/logo/logo-60.webp')" shape="square" :alt="`${item.ownerName}LOGO`"></el-avatar>
            <p class="company">{{item.ownerName}}</p>
            <p class="type">{{item.jobCatName}}</p>
            <p class="jobsCount"><span class="mark">{{item.jobCount | toMoney(0)}}</span> 個熱招職缺</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'CompanyList',
    data() {
      return {
        companyList: [],
      };
    },
    methods: {
      ...mapActions('jobs', ['setCurrentCompanyId']),
      gotoCompany(id) {
        this.setCurrentCompanyId(id || 0);
        this.$router.push({ name: 'Company', query: { id } });
      },
      getCompany() {
        this.$api('getCompanyPopular').then(({ data }) => {
          if (data.data.length) return (this.companyList = data.data);
        });
      },
    },
    mounted() {
      this.getCompany();
    },
  };
</script>

<style lang="scss" scoped>
  .companyListWrapper {
    @include area();

    .companyListArea {
      padding-top: 40px;

      @include rwd() {
        > .titleArea {
          text-align: center;
        }
      }
    }

    .listArea {
      @include flex(flex-start, stretch, row, wrap);
      padding-top: 20px;

      .companyItem {
        @include flex(space-around, center, column);
        box-sizing: border-box;
        max-width: 20%;
        flex: 1 1 20%;
        padding: 16px 24px;
        background-color: white;
        border: 1px solid $grey2;
        cursor: pointer;

        @include rwd() {
          flex: 1 1 40%;
          max-width: calc(50% - 20px);
          margin: 10px;
          padding: 14px;
        }

        .el-avatar {
          @include box(60, 60, relative);
          background-color: white;
        }

        .company {
          @include font(16, $text3);
          margin-top: 12px;

          @include rwd() {
            font-size: 14px;
          }
        }

        .type {
          @include font(12, $primary);
        }

        .jobsCount {
          @include font(12, $text3);
          box-sizing: border-box;
          width: 100%;
          max-width: 190px;
          padding: 6px 10px;
          text-align: center;
          border: 1px solid $grey2;

          .mark {
            color: $orange;
          }
        }
      }
    }
  }
</style>
