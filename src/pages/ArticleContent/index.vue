<template>
  <div class="articleContentWrapper">
    <div class="container">
      <ArticleContentDetails v-if="currentId && articleDetails" :item="articleDetails" />
      <div v-else class="nodata">查無此文章</div>
      <ArticleList />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ArticleList from '~/pages/Article/components/ArticleList';
  import ArticleContentDetails from '~/pages/Article/components/ArticleContentDetails';

  export default {
    name: 'ArticleContent',
    components: {
      ArticleList,
      ArticleContentDetails,
    },
    data() {
      return {
        articleDetails: null,
      };
    },
    computed: {
      ...mapGetters('article', ['category', 'currentId']),
    },
    methods: {
      ...mapActions('article', ['setCategory', 'setCurrentId']),
      getArticleDetail(id) {
        this.$api('getOneArticle', { id }).then(data => {
          this.articleDetails = data;
        });
      },
    },
    watch: {
      currentId() {
        if (this.currentId) this.getArticleDetail(this.currentId);
      },
    },
    mounted() {
      const query = this.$route.query;
      if (Object.keys(query).length > 0) {
        this.setCategory(query.category);
        this.setCurrentId(query.id || 0);
      }
      this.getArticleDetail(this.currentId);
    },
  };
</script>

<style lang="scss" scoped>
  .articleContentWrapper {
    background-color: $bgGrey1;

    .nodata {
      @include area(100%, 100px);
      @include flex();
      color: $text2;
    }
  }
</style>

