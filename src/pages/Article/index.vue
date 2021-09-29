<template>
  <div class="articleWrapper">
    <MainArticle />
    <div class=" container">
      <ArticleList />
    </div>
  </div>
</template>

<script>
  import ArticleList from './components/ArticleList';
  import MainArticle from './components/MainArticle';

  export default {
    name: 'Article',
    components: {
      ArticleList,
      MainArticle,
    },
  };
</script>

<style lang="scss" scoped>
  .articleWrapper {
    background-color: $bgGrey1;
  }
</style>