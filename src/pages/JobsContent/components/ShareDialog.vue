<template>
  <el-dialog :visible.sync="visible" title="分享職缺" width="504px" :show-close="false" @close="onClose">
    <div class="shareList">
      <div class="item" @click="onCopy">複製連結</div>
      <div class="item" @click="onShare('fb')">Facebook</div>
      <div class="item" @click="onShare('twitter')">Twitter</div>
      <!-- <div class="item" @click="onShare('ig')">Instagram</div> -->
    </div>
  </el-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import dialogMixin from '@/mixin/dialog.js';

  export default {
    name: 'ShareDialog',
    mixins: [dialogMixin],
    data() {
      return {
        shareUrl: {
          fb: 'https://www.facebook.com/sharer.php?u=',
          twitter: 'https://twitter.com/share?url=',
          ig: '',
        },
      };
    },
    computed: {
      ...mapGetters('jobsModules', ['currentJobId']),
      ...mapGetters('userModules', ['referCode', 'userName']),
      sharePath() {
        return `${location.origin + location.pathname}?id=${
          this.currentJobId
        }&code=${this.referCode}`;
      },
    },
    methods: {
      onClose() {
        this.close();
      },
      onCopy() {
        this.$copyText(this.sharePath);
        this.$gtag.event('複製分享職缺連結', {
          event_category: '按鈕點擊',
          event_label: '複製分享職缺連結',
          value: `userName: ${this.userName}, jobId: ${this.currentJobId}`,
        });
        return this.$message.success(`已將 ${this.sharePath} 複製到您的剪貼簿`);
      },
      onShare(taget) {
        this.$gtag.event(`分享職缺連結到${taget}`, {
          event_category: '按鈕點擊',
          event_label: `分享職缺連結到${taget}`,
          value: `userName: ${this.userName}, jobId: ${this.currentJobId}`,
        });
        if (process.browser) {
          window.open(this.shareUrl[taget] + encodeURIComponent(this.sharePath));
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog {
    border-radius: 8px;
    overflow: hidden;

    @include rwd() {
      max-width: 285px;
    }

    .el-dialog__header {
      @include bg('~@/assets/ui/share-bg.png', center, cover);
      padding: 76px 20px;
      text-align: center;

      @include rwd() {
        padding: 44px 10px;
      }

      .el-dialog__title {
        @include font(36, white, bold, 36);

        @include rwd() {
          font-size: 17px;
        }
      }
    }

    .el-dialog__body {
      padding: 0;

      .shareList {
        .item {
          @include font(20, $text3);
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid $text3;
          cursor: pointer;

          @include rwd() {
            padding: 12px;
            font-size: 15px;
          }

          &:last-child {
            border-bottom: none;
            padding-bottom: 25px;

            @include rwd() {
              padding-bottom: 15px;
            }
          }
        }
      }
    }
  }
</style>