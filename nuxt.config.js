export default {
  srcDir: 'src/',
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'STEP1NE - 讓 STEP1NE 與您一起邁出成功的第一步',
    htmlAttrs: {
      lang: 'zh_Hant_TW',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'ALL' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '找工作, 找人才, 人力資源, 職缺, 人事, 人力銀行',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'STEP1NE 是為臺灣頂尖的人力資源顧問公司，敏銳掌握各產業趨勢，深知各界即時動態，專精各項人事服務。為企業廣納菁英，並從旁提供所有協助；為人才尋找合適舞台，以利其發光發熱。讓人人皆能在職業生涯毫無保留的揮灑展現，是STEP1NE 不變的使命！',
      },
      {
        property: 'og:title',
        content: 'STEP1NE - 讓 STEP1NE 與您一起邁出成功的第一步',
      },
      {
        property: 'og:site_name',
        content: 'STEP1NE - 讓 STEP1NE 與您一起邁出成功的第一步',
      },
      { property: 'og:url', content: 'https://step1ne.com/' },
      { property: 'og:image', content: 'https://step1ne.com/fb.png' },
      {
        property: 'og:description',
        content:
          'STEP1NE 是為臺灣頂尖的人力資源顧問公司，敏銳掌握各產業趨勢，深知各界即時動態，專精各項人事服務。為企業廣納菁英，並從旁提供所有協助；為人才尋找合適舞台，以利其發光發熱。讓人人皆能在職業生涯毫無保留的揮灑展現，是STEP1NE 不變的使命！',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/main.scss',
    '@/assets/styles/elementTheme.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/filter',
    '@/plugins/axios',
    '@/plugins/api',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],

  styleResources: {
    scss: ['@/assets/styles/main.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
};
