<template>
  <div class="articleContentWrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/article' }" @click="clearArticleId">精選閱讀</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <img v-if="item.imgBigUrl" class="imgArea" :src="item.imgBigUrl" alt="文章圖片">
    <div class="container">

      <div class="itemArea">
        <div class="title">{{item.title}}</div>
        <div class="timeArea">
          <el-tag v-if="item.categoryId" :class="['article', articleMenu[item.categoryId].color]">{{articleMenu[item.categoryId].label}}</el-tag>
          <span>{{item.author}}</span>
          <span v-if="item.author && item.createTime"> ‧ </span>
          <span>{{item.createTime | formatDate}}</span>
        </div>
        <div class="text" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { articleMenu } from '~/utils/article';

  export default {
    name: 'ArticleContentDetails',
    props: {
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        articleMenu,
      };
    },
    methods: {
      ...mapActions('article', ['setCurrentId']),
      clearArticleId() {
        this.setCurrentId(0);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .articleContentWrapper {
    @include area();

    .el-breadcrumb {
      @include rwd() {
        display: none;
      }
    }

    .container {
      background-color: white;
    }

    .imgArea {
      @include area(100%, 480px);
      object-fit: cover;

      @include rwd() {
        height: calc(50vw - 20px);
      }
    }

    .itemArea {
      flex: 1;
      padding: 40px 76px;

      @include rwd() {
        padding: 20px 0;
      }

      .title {
        @include font(20, $text1, bold, 24);
        padding-bottom: 20px;

        @include rwd() {
          @include font(15, $text1, bold, 20);
        }
      }

      .timeArea {
        @include flex(flex-start, center);
        @include font(12, $text3);
      }

      /deep/ .text {
        @include font(14, $text1);
        padding-top: 32px;

        @include rwd() {
          padding-top: 20px;
        }

        h1 {
          font-size: 20px;
        }

        h2 {
          font-size: 16px;
          margin-bottom: 0.5em;
        }

        p {
          text-indent: 2em;
          margin-bottom: 1em;
          line-height: 2;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        p img {
          margin-left: -2em;
        }
      }
    }
  }
</style>

