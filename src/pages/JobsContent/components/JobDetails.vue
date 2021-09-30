<template>
  <div v-if="item" class="jobDetailsWrapper">
    <Card class="topAreaBox">
      <div class="mainArea">
        <el-avatar :src="item.imgUrl || require('assets/logo/logo-text.png')" shape="square" :alt="`${item.ownerName}LOGO`"></el-avatar>
        <div class="companyBox">
          <div class="companyName">
            {{item.title}}
          </div>
          <el-button type="text" class="webUrlBox" @click="gotoCompany(item.oid)">
            {{item.ownerName}}
          </el-button>
        </div>
      </div>

      <div class="detailBox">
        <div class="infoBox">
          <div class="infoTitle">
            薪資
          </div>
          <div class="salaryBox">
            <span v-if="item.salaryType === 0 || item.salaryRange.every(num => num === null)">面議</span>
            <span v-else-if="item.salaryType === 1">{{item.salaryRange | formatMoneyRange('')}} TWD / 時</span>
            <span v-else>{{item.salaryRange | formatMoneyRange}} TWD / 月</span>
          </div>
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            工作性質
          </div>
          <el-tag :class="`jobType color${item.type}`">{{item.type | jobTypeLabel}}</el-tag>
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            工作地點
          </div>
          {{item.location || '-'}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            工作經驗
          </div>
          <span v-if="item.seniorityRange.every(num => num === null)">不限年資</span>
          <span v-else>{{item.seniorityRange | formatMoneyRange('年')}}</span>
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            需求人數
          </div>
          {{item.recruitNumber | formatMoney}} 人
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            管理責任
          </div>
          <span v-if="item.managementPosition">是，{{item.subordinatesNumber || '-'}} 人</span>
          <span v-else>否</span>
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            出差外派
          </div>
          <span v-if="item.goOutBusiness">是，每年 {{item.goOutBusinessMonth || '-'}} 個月</span>
          <span v-else>否</span>
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            休假制度
          </div>
          {{item.holidayType | holidaySystemLabel}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            上班時段
          </div>
          {{item.workTimeType | workTimeTypeLabel}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            學歷要求
          </div>
          {{item.educationLevel | educationLabel}}
        </div>
        <div class="infoBox">
          <div class="infoTitle">
            要求科系
          </div>
          <span v-if="!item.specificMajor">不拘</span>
          <span v-else v-for="(item, index) in item.majorRequirements" :key="`majorRequirements${index}`">{{item}} </span>
        </div>
        <div class="infoBox"></div>
      </div>
      <div class="communityArea">
        <div class="communityTitle">語言需求</div>
        <template v-if="item.languageRequirements.length > 0">
          <div v-for="(item, index) in item.languageRequirements" :key="`majorRequirements${index}`" class="itemArea wordbreak">
            <span>{{item.languageName}}：</span>
            <span>
              聽/{{item.listen | languageLevelsLabel}}、
              說/{{item.speak | languageLevelsLabel}}、
              讀/{{item.read | languageLevelsLabel}}、
              寫/{{item.write | languageLevelsLabel}}
            </span>
          </div>
        </template>
        <div v-else class="itemArea">無</div>
      </div>

      <div class="communityArea">
        <div class="communityTitle">技能需求</div>
        <div v-if="item.skillRequirements" class="itemArea">
          <el-tag class="skill" v-for="(item,index) in item.skillRequirements" :key="`skills${index}`">{{item}}</el-tag>
        </div>
        <div v-else class="itemArea">無</div>
      </div>
    </Card>

    <div class="timeArea">
      <div class="item">
        發布日期:
        <span v-if="item.createTime">{{item.createTime | formatDateTime}}</span>
        <span v-else>-</span>
      </div>
      <div class="item">
        最後更新:
        <span v-if="item.updateTime">{{item.updateTime | formatDateTime}}</span>
        <span v-else>-</span>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'JobDetails',
    props: { item: { type: Object, default: () => {} } },
    methods: {
      ...mapActions('jobs', ['setCurrentCompanyId']),
      gotoCompany(id) {
        this.setCurrentCompanyId(id || 0);
        this.$router.push({ name: 'Company', query: { id } });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .jobDetailsWrapper {
    @include area();
    box-sizing: border-box;
    padding-top: 112px;

    @include rwd() {
      padding-top: 90px;
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
        width: 50%;
        flex: 1;
        padding: 4px 0 4px 24px;

        @include rwd($xs) {
          padding: 4px 0 4px 12px;
        }

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
      @include flex(flex-start, stretch, row, wrap);
      padding-top: 24px;
      margin: 0 -10px -10px -10px;

      @include rwd() {
        padding-top: 12px;
      }

      .infoBox {
        @include font(14, $text2);
        box-sizing: border-box;
        min-width: 25%;
        flex: 1;
        padding: 10px;

        @include rwd() {
          min-width: 50%;
        }

        .infoTitle {
          @include font(16, $text1);
          padding-bottom: 10px;
          white-space: nowrap;
        }
      }

      .salaryBox {
        @include font(16, $primary, bold);
      }
    }

    .communityArea {
      padding-top: 20px;

      .communityTitle {
        @include font(16, $text1);
      }

      .itemArea {
        @include flex(flex-start, flex-start, row, wrap);
        padding-top: 12px;
        flex: 1;
        &.wordbreak {
          word-break: keep-all;
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
