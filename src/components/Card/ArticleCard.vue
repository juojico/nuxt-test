<template>
  <div :class="['articleItem', color]" @click="gotoList(articleMenu[item.categoryId].value, item.id)">

    <img class="imgArea" :src="item.imgBigUrl" alt="文章圖片">

    <div class="itemArea">
      <div class="timeArea">
        <el-tag :class="['article', color]">{{articleMenu[item.categoryId].label}}</el-tag>
        <span>{{item.author}}</span>
        <span v-if="item.author && item.createTime"> ‧ </span>
        <span>{{item.createTime | formatDate}}</span>
      </div>
      <div class="title">{{item.title}}</div>
      <div v-if="item.subContent" class="text">{{item.subContent | previewContent}}</div>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { articleMenu } from '~/utils/article';

  export default {
    name: 'ArticleCard',
    props: {
      item: { type: Object, default: () => {} },
    },
    data() {
      return {
        articleMenu,
      };
    },
    computed: {
      ...mapGetters('article', ['category', 'currentId']),
      color() {
        return this.articleMenu[this.item.categoryId].color;
      },
    },
    methods: {
      ...mapActions('article', ['setCategory', 'setCurrentId']),
      gotoList(value, id) {
        if (this.category === value && this.currentId === id) return;
        this.setCategory(value);
        this.setCurrentId(id || 0);
        this.$router.push({
          name: 'ArticleContent',
          query: { category: value, id },
        });
      },
    },
    filters: {
      previewContent(content) {
        if (content === null || content === undefined) return '';

        if (content.length > 70) {
          return content + '...';
        }

        return content;
      },
    },
    mounted() {
      this.isFavorite = !!this.item.isFavorites;
    },
  };
</script>

<style lang="scss" scoped>
  .articleItem {
    @include area();
    max-width: calc(33.33% - 24px);
    flex: 1 1 30%;
    box-sizing: border-box;
    margin: 0 12px 36px 12px;
    background-color: white;
    border-bottom: 12px solid;
    overflow: hidden;
    cursor: pointer;

    @each $i, $color in $tagColors {
      &.#{$i} {
        border-bottom-color: #{$color};
      }
    }

    @include rwd($lg) {
      max-width: calc(50% - 24px);
      flex: 1 1 40%;
    }

    @include rwd() {
      max-width: calc(100% - 24px);
      flex: 1 1 100%;
    }

    .imgArea {
      @include area(100%, 166px);
      object-fit: cover;
    }

    .itemArea {
      padding: 12px 30px;

      .title {
        @include font(16, $text2, bold, 20);
        padding-top: 12px;
      }

      .text {
        @include font(12, $text3, false, 18);
        padding-top: 8px;
      }
    }

    .timeArea {
      @include flex(flex-start, center);
      @include font(12, $text3);
    }
  }
</style>
