<template>
  <div>
    <MainVisual :banners="banners" />
    <About />
  </div>
</template>

<script>
  import About from "./components/About";
  import MainVisual from "./components/MainVisual";

  export default {
    name: "Home",
    async asyncData({ $api }) {
      const { data } = await $api("getBanners");
      return { banners: data.data };
    },
    components: {
      About,
      MainVisual,
    },
  };
</script>
