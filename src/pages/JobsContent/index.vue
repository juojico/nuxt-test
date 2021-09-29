<template>
  <div class="jobsContentWrapper">

    <div class="topTitleArea">
      <div class="container">
        <div class="title">{{jobDetail.title}}</div>
        <div class="btnArea">
          <el-button type="warning" plain @click="openShare">分享職缺</el-button>
          <el-button type="warning" @click="changeFavorite(jobDetail.id)" :plain="!isFavorite">
            <div class="icon heart"></div>
            {{isFavorite ? '已' : ''}}收藏
          </el-button>
          <el-button type="warning" @click="openApply">應徵工作</el-button>
        </div>
      </div>
    </div>

    <div class="container">

      <JobDetails v-if="Object.keys(jobDetail).length" :item="jobDetail" />

      <Card title="工作內容">
        <div class="cardConent">{{jobDetail.content}}</div>
      </Card>
      <Card title="條件要求">
        <div class="cardConent">{{jobDetail.other}}</div>
      </Card>
      <Card title="福利制度">
        <div class="cardConent">{{jobDetail.benefits || '暫無福利制度'}}</div>
      </Card>

      <ContactBox :item="jobDetailContact" class="mapCard" ref="contact" />

    </div>

    <ApplyDialog v-model="applyShow" :title="jobDetail.title" :ownerName="jobDetail.ownerName" />
    <ShareDialog v-model="shareShow" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { loginFirst } from '~/utils';
  import ContactBox from '~/components/ContactBox';
  import JobDetails from './components/JobDetails';
  import ApplyDialog from './components/ApplyDialog';
  import ShareDialog from './components/ShareDialog';

  export default {
    name: 'JobsContent',
    components: { ContactBox, JobDetails, ApplyDialog, ShareDialog },
    data() {
      return {
        applyShow: false,
        shareShow: false,
        jobDetail: {},
        isFavorite: false,
      };
    },
    computed: {
      ...mapGetters('jobs', ['currentJobId']),
      ...mapGetters('user', ['token', 'userName']),
      jobDetailContact() {
        const keys = ['location', 'email', 'tel'];
        let contactInfo = {};
        keys.forEach(item => {
          if (this.jobDetail[item]) contactInfo[item] = this.jobDetail[item];
        });
        return contactInfo;
      },
    },
    methods: {
      ...mapActions('jobs', ['setCurrentJobId', 'setCurrentCompanyId']),
      ...mapActions('dialog', ['setLoginShow']),
      ...mapActions('user', ['setReferCode']),
      getJobDetail() {
       this.$api('getJob', { id: this.currentJobId }).then(data => {
          this.jobDetail = data;
          this.isFavorite = data.isFavorites;
        });
      },
      addShareJob(id, code) {
        if (!code) return;
        const payload = {
          jobPositionId: id,
          referCode: code,
        };
       this.$api('accessShareJob', payload);
      },
      gotoCompany(id) {
        this.setCurrentCompanyId(id || 0);
        this.$router.push({ name: 'Company', query: { id } });
      },
      openApply() {
        loginFirst(() => {
          this.$gtag.event('打開應徵彈窗', {
            event_category: '按鈕點擊',
            event_label: '打開應徵彈窗',
            value: `userName: ${this.userName}, jobTitle: ${this.jobDetail.title}`,
          });
          this.applyShow = true;
        });
      },
      openShare() {
        loginFirst(() => {
          this.$gtag.event('打開分享職缺彈窗', {
            event_category: '按鈕點擊',
            event_label: '打開分享職缺彈窗',
            value: `userName: ${this.userName}, jobTitle: ${this.jobDetail.title}`,
          });
          this.shareShow = true;
          this.setReferCode();
        });
      },
      changeFavorite(id) {
        loginFirst(() => {
          this.isFavorite = !this.isFavorite;
          const payload = { jobPositionId: id };
          if (this.isFavorite) {
           this.$api('userAddFavoriteJob', payload);
            this.$message.success(`已收藏 ${this.jobDetail.title}`);
            this.$gtag.event('收藏職缺', {
              event_category: '按鈕點擊',
              event_label: '收藏職缺',
              value: `userName: ${this.userName}, jobTitle: ${this.jobDetail.title}`,
            });
          } else {
           this.$api('userRemoveFavoriteJob', payload);
            this.$message.success(`已取消收藏 ${this.jobDetail.title}`);
            this.$gtag.event('取消收藏職缺', {
              event_category: '按鈕點擊',
              event_label: '取消收藏職缺',
              value: `userName: ${this.userName}, jobTitle: ${this.jobDetail.title}`,
            });
          }
        });
      },
    },
    mounted() {
      const query = this.$route.query;
      if (Object.keys(query).length > 0) {
        this.setCurrentJobId(query.id || 0);
        if (query.code) this.addShareJob(query.id, query.code);
      }
      this.getJobDetail();
    },
  };
</script>

<style lang="scss" scoped>
  .jobsContentWrapper {
    @include area();
    background-color: $bgGrey1;

    .icon {
      @include box(18, 18, relative);

      &.heart {
        @include bg('~@/assets/icon/heart.png');
        display: inline-block;
        margin-bottom: -4px;
      }
    }

    .topTitleArea {
      @include area(100%, 72px, fixed);
      @include font(20, $text1);
      top: $headerHeight;
      background-color: white;
      z-index: 1;

      @include rwd($xl) {
        top: $headerHeightL;
      }

      @include rwd() {
        top: $headerHeightS;
      }

      > .container {
        @include flex();
        flex-wrap: wrap;

        @include rwd() {
          .title {
            display: none;
          }
        }
      }

      .btnArea {
        @include flex(flex-end);
        flex: 1;

        @include rwd() {
          justify-content: flex-start;
        }
      }
    }

    .cardConent {
      padding: 0 40px 30px 40px;
      line-height: 1.5em;
      white-space: break-spaces;

      @include rwd() {
        padding: 0 20px 30px 20px;
      }
    }

    .mapCard {
      padding: 20px 0 64px 0;
    }
  }
</style>

