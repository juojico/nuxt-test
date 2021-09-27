import { resolve } from "path";

export default {
  srcDir: "src/",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-test",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/element-ui", "@/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios"],

  styleResources: {
    scss: ["@/assets/styles/main.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },

  // axios: {
  //   baseURL:
  //     process.env.NODE_ENV === "development"
  //       ? "http://3.113.253.152:6688"
  //       : "/apis"
  // },

  alias: {
    api: resolve(__dirname, "./api"),
    assets: resolve(__dirname, "./assets"),
    components: resolve(__dirname, "./components"),
    utils: resolve(__dirname, "./utils"),
    store: resolve(__dirname, "./store")
  }
};
