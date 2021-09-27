<template>
  <div class="contactArea">
    <div class="titleArea">
      <h2>{{item.title || '聯絡我們'}}</h2>
    </div>

    <div v-if="nodata" class="nodata">未提供聯絡方式</div>
    <div v-else class="contactBox">

      <div class="leftArea" v-if="item.location">
        <iframe title="google map Area" width="100%" height="300" style="border:0" loading="lazy" allowfullscreen :src="mapUrl">
        </iframe>
      </div>

      <div :class="{rightArea: true, map: !!item.location}">
        <div class="item" v-if="item.location">
          <div class="icon location"></div>
          <div class="title">地址</div>
          {{item.location || '-'}}
        </div>
        <div class="item" v-if="item.email">
          <div class="icon mail"></div>
          <div class="title">電子信箱</div>
          <a :href="`mailto:${item.email}`">{{item.email}}</a>
        </div>
        <div class="item" v-if="item.tel">
          <div class="icon phone"></div>
          <div class="title">連絡電話</div>
          <a :href="`tel:${item.tel}`">{{item.tel}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContactBox',
    props: {
      item: { type: Object, default: () => {} },
    },
    data() {
      return {
        mapPath: 'https://www.google.com/maps/embed/v1/place',
        mapKey: 'AIzaSyBqxNUmDZpLAf5gR69KR8b1KwaaVClQncs',
      };
    },
    computed: {
      mapUrl() {
        if (!this.item.location) return '';
        const mapTaget = this.item.location.replace(/^近|\d樓$/g, '');
        return `${this.mapPath}?key=${this.mapKey}&q=${mapTaget}`;
      },
      nodata() {
        return !this.item.location && !this.item.email && !this.item.tel;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .contactArea {
    @include rwd() {
      > .titleArea {
        text-align: center;
      }
    }
  }

  .contactBox {
    @include flex(flex-start, stretch);
    margin-top: 16px;
    background-color: white;

    @include rwd() {
      flex-direction: column;
    }

    .leftArea {
      flex: 1;
    }

    .rightArea {
      @include flex();
      min-width: 335px;

      @include rwd() {
        padding: 10px 0;
        min-width: 100%;
      }

      .item {
        @include flex();
        @include font(12, $text2);
        padding: 10px;

        .title {
          @include font(16, $text1, false, 32);
          padding: 0 10px;
          text-align: center;
        }

        a {
          @include font(12, $text2);
          text-decoration: auto;

          &:hover {
            color: $primary;
          }
        }
      }

      &.map {
        flex-direction: column;

        .item {
          flex-direction: column;
        }
      }
    }

    .icon {
      @include box(20, 20, relative);

      $icons: 'location', 'mail', 'phone';

      @each $i in $icons {
        &.#{$i} {
          @include bg('~@/assets/icon/#{$i}.png');
        }
      }
    }
  }

  .nodata {
    @include area(100%, 100px);
    @include flex();
    color: $text2;
    background-color: white;
  }
</style>
