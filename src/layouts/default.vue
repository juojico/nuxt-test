<template>
  <div class="wrapper">
    <NavHeader />
    <div class="mainContainer">
      <Nuxt />
    </div>
    <NavAside />
    <NavFooter />

    <LoginDialog />
    <RegisterDialog />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { logout } from '~/utils';
  import NavHeader from '~/components/NavHeader';
  import NavFooter from '~/components/NavFooter';
  import NavAside from '~/components/NavAside';
  import LoginDialog from '~/components/Dialog/LoginDialog';
  import RegisterDialog from '~/components/Dialog/RegisterDialog';

  export default {
    name: 'App',
    components: { NavHeader, NavFooter, NavAside, LoginDialog, RegisterDialog },
    computed: {
      ...mapGetters('user', ['token']),
    },
    methods: {
      ...mapActions('common', [
        'getSkillTree',
        'getBankSelect',
        'getIndustryCategoryTree',
        'getJobCatTree',
        'getAreaLocalTree',
        'getAreaWorldTree',
      ]),
      init() {
        if (this.token) this.getBankSelect();
        this.getSkillTree();
        this.getIndustryCategoryTree();
        this.getJobCatTree();
        this.getAreaLocalTree();
        this.getAreaWorldTree();
      },
    },
    created() {
      //在頁面載入時讀取sessionStorage裡的狀態資訊
      if (process.client) {
        if (sessionStorage.getItem('store')) {
          this.$store.replaceState(
            Object.assign(
              {},
              this.$store.state,
              JSON.parse(sessionStorage.getItem('store')),
            ),
          );
        }

        window.addEventListener('beforeunload', () => {
          sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        });
        this.init();
      }
    },
    beforeMount() {
      if (!this.token) {
        logout();
      }
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    .mainContainer {
      @include area();
      min-height: calc(100vh - #{$navHeight});
      padding-top: $headerHeight;

      @include rwd($xl) {
        min-height: calc(100vh - #{$navHeightL});
        padding-top: $headerHeightL;
      }

      @include rwd() {
        min-height: calc(100vh - #{$navHeightS});
        padding-top: $headerHeightS;
      }
    }
  }
</style>
