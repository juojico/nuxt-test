<template>
  <div class="articleListWrapper">
    <div class="container">

      <div class="articleListArea">
        <div class="titleArea">
          <h2>取智閱讀・由內豐⾜</h2>
          <el-button type="text" class="more" @click="gotoList('news')">更多 ></el-button>
        </div>

        <div v-if="nodata" class="nodata">尚無文章</div>
        <div v-else class="listArea">
          <ArticleCard v-for="(item,index) in articleList" :key="`articleItem${index}`" :item="item" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import ArticleCard from '~/components/Card/ArticleCard';

  export default {
    name: 'Article',
    components: { ArticleCard },
    data() {
      return {
        articleList: [],
      };
    },
    computed: {
      nodata() {
        return this.articleList.length < 1;
      },
    },
    methods: {
      ...mapActions('article', ['setCategory', 'setCurrentId']),
      async getArticle() {
        this.$api('getRandomArticle', { number: 3 }).then(({ data }) => {
          this.articleList = data.data;
        });
      },
      gotoList(value, id) {
        this.setCategory(value);
        this.setCurrentId(id || 0);
        this.$router.push({ name: 'Article', query: { category: value, id } });
      },
    },
    mounted() {
      this.getArticle();
    },
  };
</script>

<style lang="scss" scoped>
  .articleListWrapper {
    @include area();
    background-color: $bgGrey1;

    .articleListArea {
      padding: 40px 0 64px 0;

      > .titleArea {
        @include flex(space-between);
      }

      @include rwd() {
        > .titleArea {
          @include flex();
          text-align: center;
        }
      }
    }

    .listArea {
      @include flex(flex-start, stretch, row, wrap);
      padding-top: 20px;
      margin: 0 -12px -36px -12px;

      @include rwd() {
        @include flex(flex-start, center, column);
      }
    }

    .more {
      padding: 12px;
      color: $text3;

      @include rwd() {
        padding: 6px;
      }
    }
  }
</style>
