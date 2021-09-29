<template>
  <div class="articleList">
    <div class="titleArea">
      <h2>文章總覽</h2>
      <ButtonsMenu :menu="articleMenu" :activeIndex="articleMenuActive" @itemClick="onArticleMenuClick" />
    </div>

    <div v-if="nodata" class="nodata">查無文章</div>
    <div v-else class="listArea">
      <ArticleCard v-for="(item,index) in articleList" :key="`articleListItem${index}`" :item="item"></ArticleCard>
    </div>

    <div class="pagerArea" v-if="showPager">
      <el-pagination @current-change="handleCurrentChange" :current-page="pagerInfo.current" :page-size="pagerInfo.size" layout="prev, pager, next" :total="pagerInfo.total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { articleMenu } from '~/utils/article';
  import ArticleCard from '~/components/Card/ArticleCard';
  import ButtonsMenu from '~/components/FilterMenu/ButtonsMenu';

  export default {
    name: 'ArticleList',
    components: { ArticleCard, ButtonsMenu },
    data() {
      return {
        // api文章分類(null = 熱門, 0 = 經營管理, 1 = 產業趨勢, 2 = 求職指南 )
        articleMenu: [{ label: '熱門', value: 'news', color: 'blue' }].concat(
          articleMenu,
        ),
        articleMenuActive: 0,
        articleList: [],
        pagerInfo: { size: 6, current: 1, total: 0 },
      };
    },
    computed: {
      ...mapGetters('articleModules', ['category']),
      nodata() {
        return this.articleList.length < 1;
      },
      showPager() {
        if (this.nodata || this.pagerInfo.size > this.pagerInfo.total)
          return false;
        return true;
      },
    },
    methods: {
      ...mapActions('articleModules', ['setCategory', 'setCurrentId']),
      getArticles() {
        let categoryId = null;
        if (this.category && this.category !== 'news') {
          categoryId = articleMenu.findIndex(i => i.value === this.category);
        }
        this.$api('getArticleList', {
          categoryId,
          ...this.pagerInfo,
        }).then(data => {
          this.articleList = data.records;

          const { current, size, total } = data;
          this.pagerInfo = { ...this.pagerInfo, current, size, total };
        });
      },
      onArticleMenuClick(index, keywords) {
        if (this.category === keywords && this.currentId === 0) return;
        this.articleMenuActive = index;
        this.pagerInfo = this.$options.data().pagerInfo;
        this.setCategory(keywords);
        this.getArticles();
      },
      handleCurrentChange(current) {
        this.pagerInfo.current = current;
        this.getArticles();
      },
    },
    filters: {
      previewContent(content) {
        // 尋找第一個<p>位置 去除html tag
        const pStart = content.search(/<p>/);
        const filterContent = content
          .slice(pStart, pStart + 200)
          .replace(/<.*?>|<|>|&.*?;|'/g, '');

        return filterContent.slice(0, 70) + '...';
      },
    },
    mounted() {
      const query = this.$route.query;
      if (Object.keys(query).length > 0) {
        this.setCategory(query.category);

        this.articleMenuActive =
          this.articleMenu.findIndex(i => i.value === query.category) || 0;
      }
      this.getArticles();
    },
  };
</script>

<style lang="scss" scoped>
  .articleList {
    padding: 40px 0 64px 0;

    .titleArea {
      @include flex(space-between);

      @include rwd() {
        flex-direction: column;
      }
    }

    .listArea {
      @include flex(flex-start, stretch, row, wrap);
      padding-top: 20px;
      margin: 0 -12px;
    }

    .nodata {
      @include area(100%, 100px);
      @include flex();
      color: $text2;
    }

    .pagerArea {
      padding-top: 30px;

      /deep/ .el-pagination {
        @include flex();
      }
    }
  }
</style>
