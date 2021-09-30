<template>
  <div v-if="companyDetail" class="topAreaWrapper">
    <Card class="topAreaBox">
      <div class="mainArea">
        <el-avatar :src="companyDetail.logoUrl || require('assets/logo/logo-text.png')" shape="square" :alt="`${companyDetail.ownerName}LOGO`"></el-avatar>
        <div class="companyBox">
          <div class="companyName">
            {{companyDetail.ownerName}}
          </div>
          <a v-if="companyDetail.webUrl" class="webUrlBox" :href="companyDetail.webUrl" target="_blank">
            <el-button type="text">
              {{companyDetail.webUrl}}
            </el-button>
          </a>
        </div>
      </div>

      <div class="detailBox">
        <div class="infoBox">
          <div class="infoTitle">
            產業類別
          </div>
          {{companyDetail.jobCatName || '-'}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            人事聯絡人
          </div>
          {{companyDetail.hrName || '-'}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            員工人數
          </div>
          {{companyDetail.employeeCount || '-'}} 人
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            資本額
          </div>
          {{companyDetail.capital || '-' | formatMoneyW}}
        </div>
      </div>
    </Card>

    <div class="timeArea">
      <div class="item">
        發布日期:
        <span v-if="companyDetail.createTime">{{companyDetail.createTime | formatDateTime}}</span>
        <span v-else>-</span>
      </div>
      <div class="item">
        最後更新:
        <span v-if="companyDetail.updateTime">{{companyDetail.updateTime | formatDateTime}}</span>
        <span v-else>-</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopArea',
    props: {
      companyDetail: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>

<style lang="scss" scoped>
  .topAreaWrapper {
    @include area();
    box-sizing: border-box;
    padding-top: 104px;

    @include rwd() {
      padding-top: 80px;
    }

    .topAreaBox {
      padding: 40px 40px 30px 40px;

      @include rwd() {
        padding: 20px 20px 30px 20px;
      }
    }

    .mainArea {
      @include flex(flex-start, flex-start);

      .el-avatar {
        @include box(56, 56, relative);
        background-color: white;
        border: 1px solid $grey2;
      }

      .companyBox {
        padding: 4px 0 4px 24px;

        .companyName {
          @include font(20, $text1);
        }

        .webUrlBox {
          display: block;
          margin-top: 10px;
        }
      }
    }

    .detailBox {
      @include area();
      @include flex();
      padding-top: 24px;
      margin: 0 -10px -10px -10px;

      @include rwd() {
        align-items: stretch;
        flex-wrap: wrap;
        padding-top: 12px;
      }

      .infoBox {
        @include font(14, $text2);
        box-sizing: border-box;
        min-width: 100px;
        flex: 1;
        padding: 10px;

        .infoTitle {
          @include font(16, $text1);
          padding-bottom: 10px;
          white-space: nowrap;
        }
      }
    }

    .timeArea {
      padding-bottom: 20px;
      text-align: right;

      .item {
        @include font(12, $text2);
        display: inline;
        margin-left: 32px;

        @include rwd() {
          display: block;
          margin-left: 0;
          margin-bottom: 6px;
          text-align: center;
        }
      }
    }
  }
</style>

