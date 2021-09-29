<template>
  <div class="personalWrapper">
    <div class="container">
      <div class="titleArea">
        <h2>會員中心</h2>
      </div>
      <div class="tabsInfoArea">
        <div class="userName" v-if="userName !== ''">{{ userName }}</div>
        <div class="userName" v-if="userEngName !== ''">{{ userEngName }}</div>
        <div class="email">{{ email }}</div>
        <div class="userIdNumber">ID:{{ userIdNumber }}</div>
      </div>
      <el-tabs class="leftTab" tab-position="left" v-model="personalTab" :before-leave="beforeTabsLeave">
        <el-tab-pane label="基本資料" name="basic">
          <Basic />
        </el-tab-pane>
        <el-tab-pane label="我的履歷" name="resume">
          <Resume :updatePageData="getUserResume" />
        </el-tab-pane>
        <el-tab-pane label="應徵記錄" name="apply">
          <ApplyRecord />
        </el-tab-pane>
        <el-tab-pane label="收藏記錄" name="collect">
          <CollectionRecord />
        </el-tab-pane>
        <!-- <el-tab-pane label="推薦記錄" name="recommend">
          <RecommendRecord />
        </el-tab-pane>
        <el-tab-pane label="提領記錄" name="withdrawal">
          <Withdrawal />
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Basic from './components/Basic';
  import Resume from './components/Resume';
  import ApplyRecord from './components/ApplyRecord.vue';
  import CollectionRecord from './components/CollectionRecord.vue';
  // import RecommendRecord from './components/RecommendRecord.vue';
  // import Withdrawal from './components/Withdrawal';
  export default {
    name: 'Personal',
    data() {
      return {
        personalTab: 'basic',
        userUrl: '',
        tabsLabel: {
          basic: '基本資料',
          resume: '我的履歷',
        },
      };
    },
    components: {
      Basic,
      Resume,
      ApplyRecord,
      CollectionRecord,
      // RecommendRecord,
      // Withdrawal,
    },
    computed: {
      ...mapGetters('personal', ['isEdit']),
      ...mapGetters('user', [
        'token',
        'userName',
        'userEngName',
        'userIdNumber',
        'email',
      ]),
    },
    watch: {
      token() {
        this.getUserInfo();
        this.getUserResume();
      },
    },
    methods: {
      ...mapActions('personal', [
        'setBasicData',
        'setResumeData',
        'setIsEdit',
      ]),
      getUserInfo() {
        if (this.token) {
         this.$api('userGetUser')
            .then(data => {
              this.setBasicData(data);
              this.setIsEdit(false);
            })
            .catch(() => {
              return this.$message.error('取得會員資料失敗...');
            });
        }
      },
      getUserResume() {
        if (this.token) {
         this.$api('userGetUserResume')
            .then(data => {
              var resume = Object.assign({}, data);
              if (resume.acceptableAbroad) {
                resume.acceptableCountryName =
                  '是，可接受國家：' +
                  resume.acceptableCountry
                    .map(c => {
                      return c.areaName;
                    })
                    .join(',');
                resume.acceptableCountry = resume.acceptableCountry.map(c => {
                  return c.areaId;
                });
              } else {
                resume.acceptableCountryName = '否';
              }
              resume.acceptableInTaiwanName = resume.acceptableInTaiwan
                .map(c => {
                  return c.areaName;
                })
                .join(',');
              resume.acceptableInTaiwan = resume.acceptableInTaiwan.map(c => {
                return c.areaId;
              });

              this.setResumeData(resume);
              this.setIsEdit(false);
            })
            .catch(e => {
              console.log(e);
              return this.$message.error('取得會員資料失敗...');
            });
        }
      },
      beforeTabsLeave(_, oldActiveName) {
        const checkInEdit = new Promise((resolve, reject) => {
          if (this.isEdit) {
            this.$confirm(
              `${this.tabsLabel[oldActiveName]}正在編輯中，是否放棄編輯？`,
              {
                type: 'warning',
                confirmButtonText: '放棄',
                cancelButtonText: '繼續編輯',
              },
            )
              .then(() => {
                resolve();
                this.setIsEdit(false);
                switch (oldActiveName) {
                  case 'basic':
                    return this.getUserInfo();
                  case 'resume':
                    return this.getUserResume();
                  default:
                    return;
                }
              })
              .catch(() => reject());
          } else {
            resolve();
          }
        });

        return checkInEdit;
      },
      initData() {
        this.setIsEdit(false);
        this.setBasicData({});
        this.setResumeData({});
      },
    },
    created() {
      this.initData();
      this.getUserInfo();
      this.getUserResume();
    },
    mounted() {
      if (!this.token) return this.$router.replace('/');
    },
  };
</script>
<style lang="scss" scoped>
  .personalWrapper {
    @include area();
    background-color: $bgGrey1;
    padding: 40px 0 64px 0;

    @include rwd() {
      padding: 20px 0 0 0;
    }

    .titleArea {
      margin-bottom: 20px;
    }

    .tabsInfoArea {
      @include box(280, 208);
      @include flex(center, center, column);
      @include font(16, white);
      background-color: $primary;
      text-align: center;
      z-index: 10;

      @include rwd($lg) {
        width: calc(100% - 40px);
      }

      @include rwd($sm) {
        width: calc(100% - 20px);
      }

      /deep/ .el-avatar {
        @include box(56, 56, relative);
        background-color: white;
      }

      .userName {
        padding-top: 8px;
        font-size: 20px;
      }

      .email {
        margin: 8px 0 4px;
        font-family: SegoeUI;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.75;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
      }

      .userIdNumber {
        margin: 4px 33px 0;
        font-family: SegoeUI;
        font-size: 12px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #afe7ff;
      }
    }
  }
</style>
