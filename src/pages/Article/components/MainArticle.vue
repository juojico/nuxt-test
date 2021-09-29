<template>
  <div class="articleListWrapper">
    <div class="container">
      <div class="titleArea">
        <h2 class="title">精選閱讀</h2>
      </div>

      <div class="listArea">
        <div v-for="(item,index) in articleList" :key="`articleItem${index}`" class="articleItem" @click="gotoList(articleMenu[item.categoryId].value, item.id)">

          <img class="imgArea" :src="item.imgBigUrl" alt="文章圖片">

          <div class="itemArea">
            <div class="timeArea">
              <el-tag :class="['article', articleMenu[item.categoryId].color]">{{articleMenu[item.categoryId].label}}</el-tag>
              <div class="author">
                <span>{{item.author}}</span>
                <span v-if="item.author && item.createTime"> ‧ </span>
                <span>{{item.createTime | formatDate}}</span>
              </div>
            </div>
            <div class="title">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapActions } from 'vuex';
  import { articleMenu } from '~/utils/article';

  export default {
    name: 'ArticleList',
    data() {
      return {
        articleMenu,
        articleList: [],
      };
    },
    methods: {
      ...mapActions('article', ['setCategory', 'setCurrentId']),
      getArticles() {
        this.$api('getRandomArticle', { number: 3 }).then(data => {
          this.articleList = data;
        });
      },
      gotoList(value, id) {
        this.setCategory(value);
        this.setCurrentId(id || 0);
        this.$router.push({
          name: 'ArticleContent',
          query: { category: value, id },
        });
      },
    },
    mounted() {
      this.getArticles();
    },
  };
</script>

<style lang="scss" scoped>
  .articleListWrapper {
    @include area();
    box-sizing: border-box;
    padding: 56px 20px 64px 20px;
    background-color: $primary;

    @include rwd($xl) {
      padding: 20px 24px;
    }

    @include rwd() {
      padding: 20px 0;
    }

    .titleArea {
      & > .title {
        @include font(26, white);

        @include rwd() {
          font-size: 17px;
        }
      }
    }

    .listArea {
      @include area(100%, 472px);
      @include flex(flex-start, center, column, wrap);
      margin: -10px -14px;
      padding-top: 36px;

      @include rwd() {
        height: auto;
        padding-top: 14px;
      }

      .articleItem {
        @include area(322px, 216px);
        box-sizing: border-box;
        max-width: 100%;
        padding-bottom: 17px;
        margin: 10px 14px;
        cursor: pointer;
        overflow: hidden;

        @include rwd($md + 1, min-width) {
          &:first-child {
            @include area(calc(100% - 346px), 450px);
          }
        }

        @include rwd() {
          width: 100%;
        }

        .imgArea {
          @include area(100%, 100%, absolute);
          object-fit: cover;
          z-index: 0;
        }

        .itemArea {
          @include area(100%, auto, absolute);
          box-sizing: border-box;
          bottom: 0;
          padding: 26px 24px;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;

          @include rwd($xl) {
            padding: 12px 10px;
          }

          .title {
            @include font(16, white, false, 20);
            padding-top: 10px;

            @include rwd() {
              @include font(14, white, false, 16);
            }
          }
        }

        .timeArea {
          @include font(12, #f5f5f5, false, 12);

          .author {
            display: inline-block;
          }
        }
      }
    }
  }
</style>