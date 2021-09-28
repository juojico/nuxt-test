<template>
  <div class="cityListWrapper">
    <div class="container">

      <div class="cityListArea">
        <div class="titleArea">
          <h2>職涯之⾏・世界之旅</h2>
        </div>

        <div class="listArea">
          <div v-for="(item,index) in cityList" :key="`cityItem${index}`" class="cityItem" @click="gotoJobs(item.value)">
            <img class="cityImg" :src="require(`@/assets/city/${item.value}.webp`)" :alt="item.label">
            <p class="name">{{item.label}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CityList',
    data() {
      return {
        cityList: [
          { label: '台北市', value: '6001001000' },
          { label: '新北市', value: '6001002000' },
          { label: '桃園市', value: '6001005000' },
          { label: '台中市', value: '6001008000' },
        ],
      };
    },
    methods: {
      getCityPopular() {
        this.$api('getAreaPopular').then(data => {
          if (data.length) return (this.cityList = data);
        });
      },
      gotoJobs(value) {
        this.$router.push({ name: 'Jobs', query: { areaIds: [value] } });
      },
    },
    mounted() {
      this.getCityPopular();
    },
  };
</script>

<style lang="scss" scoped>
  .cityListWrapper {
    @include area();

    .cityListArea {
      padding: 40px 0 64px 0;

      @include rwd() {
        > .titleArea {
          text-align: center;
        }
      }
    }

    .listArea {
      @include area();
      @include flex(flex-start, stretch, row);
      margin: 0 -15px;
      padding-top: 20px;

      @include rwd() {
        margin: 0;
      }

      .cityItem {
        @include area(100%, 236px);
        flex: 1;
        margin: 0 15px;
        overflow: hidden;
        cursor: pointer;

        @include rwd() {
          height: 25vw;
          margin: 0;
          border-radius: 0;
        }

        .cityImg {
          @include area(100%, 100%);
          object-fit: cover;
        }

        .name {
          @include font(26, white);
          position: absolute;
          left: 30px;
          bottom: 24px;

          @include rwd() {
            width: 100%;
            left: 0px;
            bottom: 12px;
            text-align: center;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
