<template>
  <div :class="{searchbarWrapper: true, isFixed: isFixed}" ref="searchbarArea">
    <div class="container searchbarContainer">
      <div class="searchbarArea">
        <div class="item input">
          <el-input v-model="searchPayload.keywords" size="large" placeholder="請輸入關鍵字" clearable></el-input>
        </div>
        <div class="item input">
          <el-cascader :options="jobCatTree" v-model="searchPayload.jobCatIds" :props="{ expandTrigger: 'hover', multiple: true, checkStrictly: true, emitPath: false }" :show-all-levels="false" placeholder="領域" clearable></el-cascader>
        </div>
        <div class="item input">
          <el-cascader :options="area" v-model="searchPayload.areaIds" :props="{ expandTrigger: 'hover', multiple: true, checkStrictly: true, emitPath: false }" :show-all-levels="false" placeholder="地區" clearable></el-cascader>
        </div>
        <div class="item button">
          <el-button type="warning" @click="onSearch">搜索</el-button>
        </div>
      </div>

      <div class="keywordsArea">
        <el-tag class="keywords">關鍵字</el-tag>
        <div class="keywordsBox">
          <span class="item" v-for="(item, index) in suggestKeywords" :key="`keywordsItem${index}`" @click="addKeyword(item)">{{item}}</span>
        </div>
      </div>
    </div>

    <div :class="{reSearchArea: true, isDown: isDown}">
      <el-button type="primary" @click="openSearch">重新搜索</el-button>
    </div>

    <FilterMenu v-if="details" @filterChange="filterChange"></FilterMenu>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { throttle } from 'throttle-debounce';
  import { cleanObj } from '~/utils';
  import FilterMenu from './FilterMenu';

  export default {
    name: 'Searchbar',
    components: {
      FilterMenu,
    },
    props: {
      details: {
        type: Boolean,
        default: false,
      },
      isFixed: {
        type: Boolean,
        default: false,
      },
      conditions: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        suggestKeywords: [],
        area: [],
        searchPayload: {
          keywords: '',
          areaIds: [],
          jobCatIds: [],
          size: 9,
          current: 1,
        },
        detailsPayload: {},
        isSearched: false,
        searchbarHeight: 212,
        isDown: false,
      };
    },
    computed: {
      ...mapGetters('common', ['jobCatTree']),
    },
    methods: {
      getAreaList() {
        this.$api('getArea', { flag: 0 }).then(({ data }) => {
          this.area = data.data;
        });
      },
      getSuggestKeywords() {
        this.$api('getKeywords').then(({ data }) => {
          this.suggestKeywords = data.data.map(item => item.value);
        });
      },
      setSearchbarHeight() {
        this.searchbarHeight = this.$refs.searchbarArea.clientHeight;
      },
      onScroll() {
        const windowTop = window.pageYOffset;
        this.isDown = windowTop >= this.searchbarHeight;
      },
      filterChange(payload) {
        this.detailsPayload = payload;
      },
      onSearch() {
        const payload = {
          ...this.searchPayload,
          ...this.detailsPayload,
        };
        this.$api('searchJobs', cleanObj(payload, true)).then(({ data }) => {
          this.$emit('search', data.data);
        });
      },
      addKeyword(word) {
        this.searchPayload.keywords = word;
      },
      openSearch() {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
    watch: {
      conditions(newConditions) {
        for (const [key, value] of Object.entries(newConditions)) {
          if (value !== null || value !== '') {
            this.searchPayload[key] = newConditions[key];
          }
        }
        this.onSearch();
      },
    },
    mounted() {
      this.getAreaList();
      this.getSuggestKeywords();
      this.onSearch();
      this.setSearchbarHeight();
      window.addEventListener('scroll', throttle(200, false, this.onScroll), {
        passive: true,
      });
      window.addEventListener('resize', this.setSearchbarHeight, {
        passive: true,
      });
    },
    destroyed() {
      window.removeEventListener('scroll', throttle(200, false, this.onScroll), {
        passive: true,
      });
      window.removeEventListener('resize', this.setSearchbarHeight, {
        passive: true,
      });
    },
  };
</script>

<style lang="scss" scoped>
  .searchbarWrapper {
    background-color: $primary;
    z-index: $indexNav;
    transition: height 0.5s;

    .searchbarContainer {
      padding-top: 32px;
      padding-bottom: 32px;

      @include rwd() {
        padding-top: 16px;
        padding-bottom: 16px;
      }
    }

    .searchbarArea {
      @include area();
      @include flex(flex-start, stretch);

      @include rwd() {
        flex-direction: column;
      }

      .item {
        margin-right: 16px;

        @include rwd() {
          margin-right: 0;
          margin-bottom: 16px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        &.input {
          flex: 1;

          input {
            @include font(26, $text2);
          }

          .el-cascader {
            width: 100%;
          }
        }

        &.button {
          .el-button {
            width: 100%;
            height: 40px;
          }
        }
      }
    }

    .keywordsArea {
      @include area();
      @include flex(flex-start);
      margin-top: 20px;

      @include rwd() {
        display: none;
      }

      .keywordsBox {
        @include flex(flex-start);
        @include font(16, white);
        padding-left: 20px;

        .item {
          padding: 0 0.5em;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .reSearchArea {
      box-sizing: border-box;
      position: fixed;
      top: $headerHeight;
      right: 0;
      padding: 12px;
      opacity: 0;
      overflow: hidden;
      transform: translateY(-100%);
      transition: transform 0.5s, opacity 0.5s;
      pointer-events: none;
      z-index: $indexNav;

      @include rwd($xl) {
        top: $headerHeightL;
      }

      @include rwd() {
        top: $headerHeightS;
      }
    }

    &.isFixed {
      .reSearchArea {
        &.isDown {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      }
    }
  }
</style>
