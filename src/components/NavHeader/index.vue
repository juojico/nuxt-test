<template>
  <header class="headerWrapper">
    <div class="container">
      <div :class="{menuButtonArea: true, on: menuActive}" @click="toggleMenu">
        <div class="menuButton"></div>
      </div>
      <div class="logo" @click="goto('/')"></div>
      <div :class="{mainMenuArea: true, on: menuActive}">
        <div class="mainMenu">
          <div v-if="!token" class="item" @click="goto('/resume')">上傳履歷</div>
          <div class="item" @click="goto('/jobs')">職缺博覽會</div>
          <div class="item" @click="goto('/article')">精選閱讀</div>
        </div>

        <!-- 登入 -->
        <div v-if="token" class="memberArea">
          <div :class="{'icon member': true, on: memberMenuShow}" @click="toggleMemberMenu">
            <div class="icon arrow"></div>
          </div>
          <div :class="{'memberMenuMask': true, on: memberMenuShow}" @click="closeMemberMenu"></div>
          <div :class="{'memberMenu': true, on: memberMenuShow}">
            <div class="item" v-if="userName">
              {{userName}}
            </div>
            <div v-for="(item,index) in memberMenu" :key="`memberMenuItem${index}`" class="item menuItem" @click="goto(item.path)">{{item.label}}</div>
            <div class="item btn">
              <el-button type="text" @click="logoutClick">登出</el-button>
            </div>
          </div>
        </div>
        <!-- 未登入 -->
        <template v-else>
          <el-button type="warning" @click="openLogin">登入</el-button>
          <el-button type="warning" @click="openRegister">註冊</el-button>
        </template>

        <div class="menuCloseButton" @click="toggleMenu"></div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'NavHeader',
    data() {
      return {
        memberMenu: [
          {
            label: '個人中心',
            path: '/personal',
          },
        ],
        menuActive: false,
        memberMenuShow: false,
      };
    },
    computed: {
      ...mapGetters('user', ['token', 'userName']),
    },
    methods: {
      ...mapActions('user', ['logout']),
      ...mapActions('dialog', ['setLoginShow', 'setRegisterShow']),
      ...mapActions('article', ['setCategory', 'setCurrentId']),
      logoutClick() {
        this.logout('userClick');
      },
      goto(path) {
        this.closeMenu();
        this.closeMemberMenu();
        if (path === '/article') {
          this.setCategory('news');
          this.setCurrentId(0);
        }
        if (path === this.$route.path) return;
        this.$router.push(path);
      },
      toggleMenu() {
        this.menuActive = !this.menuActive;
      },
      toggleMemberMenu() {
        this.memberMenuShow = !this.memberMenuShow;
      },
      closeMenu() {
        this.menuActive = false;
      },
      closeMemberMenu() {
        this.memberMenuShow = false;
      },
      openLogin() {
        this.closeMenu();
        this.setLoginShow(true);
        this.$gtag.event('打開登入彈窗', {
          event_category: '按鈕點擊',
          event_label: '打開登入彈窗',
          value: this.userName,
        });
      },
      openRegister() {
        this.closeMenu();
        this.setRegisterShow(true);
        this.$gtag.event('打開註冊彈窗', {
          event_category: '按鈕點擊',
          event_label: '打開註冊彈窗',
          value: this.userName,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .headerWrapper {
    @include area(100%, $headerHeight, fixed);
    top: 0;
    background-color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    z-index: $indexNav + 1;

    @include rwd($xl) {
      height: $headerHeightL;
    }

    @include rwd() {
      height: $headerHeightS;
    }

    .container {
      @include flex(space-between);

      @include rwd() {
        @include flex();
        padding: 0 10px;
      }
    }

    .logo {
      @include box(194, 80, relative);
      @include bg('~@/assets/logo/logo-text2.png');
      margin-right: 0.75em;
      cursor: pointer;

      @include rwd($xl) {
        @include box(146, 60, relative);
      }

      @include rwd() {
        @include box(110, 45, relative);
      }
    }

    .menuButtonArea {
      @include box(40, 40);
      @include position(30px, 10px);
      display: none;

      .menuButton {
        @include area(80%, 5%, absolute);
        @include position(10%, 47.5%);
        background-color: $text2;

        &::before,
        &::after {
          @include area(100%, 100%, absolute);
          content: '';
          background-color: $text2;
          transition: transform 0.2s;
        }

        &::before {
          top: -500%;
        }

        &::after {
          top: 500%;
        }
      }

      &.on {
        .menuButton {
          background-color: transparent;

          &::before {
            transform: rotate(45deg);
            top: 0%;
          }

          &::after {
            transform: rotate(-45deg);
            top: 0%;
          }
        }
      }

      @include rwd() {
        display: block;
      }
    }

    .mainMenuArea {
      @include flex(flex-end);
      flex: 1;

      @include rwd() {
        @include area(100%, 0, absolute);
        @include flex(flex-start, center, column);
        @include position(0, $headerHeightS);
        background-color: white;
        overflow: hidden;
        transition: 0.2s;

        &.on {
          height: calc(100vh - #{$headerHeightS});
          padding-bottom: 16px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        }

        /deep/ .el-button {
          width: 100%;
          max-width: calc(100% - 140px);
          margin: 0;
          padding: 12px;

          & + .el-button {
            margin: 12px 0 90px 0;
          }
        }
      }

      .mainMenu {
        @include flex(flex-end);
        @include font(16, $text1);
        padding: 0 8px;

        @include rwd($xl) {
          font-size: 16px;
          padding: 0 16px;
        }

        @include rwd() {
          flex-direction: column;
          width: 100%;
          padding: 64px 0 32px 0;
        }

        .item {
          padding: 16px;
          cursor: pointer;

          @include rwd() {
            width: 100%;
            padding: 22px;
            text-align: center;
          }
        }
      }

      .memberArea {
        @include flex();
        position: relative;

        .icon {
          @include box(32, 32, relative);
          margin: 0 16px;
          cursor: pointer;

          @include rwd() {
            display: none;
          }

          &.member {
            @include bg('~@/assets/icon/member.png');
          }

          .arrow {
            @include area(100%, 17px);
            @include position(0, 32px);
            @include bg('~@/assets/icon/arrow_down.png', center, 10px 5px);
            margin: 0;
            transition: transform 0.2s;
          }

          &.on {
            .arrow {
              transform: rotate(180deg);
            }
          }
        }

        .memberMenuMask {
          @include area(100%, 100%, fixed);
          @include position();
          pointer-events: none;
          display: none;

          @include rwd($md + 1, min-width) {
            &.on {
              pointer-events: auto;
              display: block;
            }
          }
        }

        .memberMenu {
          position: absolute;
          top: 52px;
          right: 0;
          background-color: white;
          border: 1px solid $grey3;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transition: 0.2s;
          z-index: $indexNav + 10;

          @include rwd() {
            @include area();
            top: 0;
            margin-bottom: 20px;
            border: none;
            opacity: 1;
            pointer-events: auto;

            .item {
              text-align: center;
            }
          }

          &.on {
            opacity: 1;
            pointer-events: auto;
          }

          .item {
            min-width: 200px;
            padding: 12px 16px;
            white-space: nowrap;

            @include rwd() {
              &:first-child {
                border-bottom: 1px solid $grey3;
              }
            }

            &.menuItem {
              cursor: pointer;
              transition: background-color 0.2s;

              &:hover {
                background-color: $bgBlue;
              }
            }

            &.btn {
              padding: 0;
              border-top: 1px solid $grey3;

              @include rwd() {
                border-top: none;
              }

              /deep/ .el-button {
                width: 100%;
                padding: 12px 16px;
              }
            }
          }
        }
      }
    }

    .menuCloseButton {
      @include box(28, 28, relative);
      @include bg('~@/assets/icon/close.png');
      display: none;

      @include rwd() {
        display: block;
      }
    }
  }
</style>
