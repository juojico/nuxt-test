<template>
  <div class="aboutWrapper">

    <div class="imgArea"></div>

    <div class="textArea">
      <div class="container">
        <div class="title">
          關於STEP1NE
        </div>
        <div class="subTitle">
          About Us
        </div>
        <div class="content">
          <p>STEP1NE 是為臺灣頂尖的人力資源顧問公司，敏銳掌握各產業趨勢，深知各界即時動態，專精各項人事服務。為企業廣納菁英，並從旁提供所有協助；為人才尋找合適舞台，以利其發光發熱。讓人人皆能在職業生涯毫無保留的揮灑展現，是STEP1NE 不變的使命！</p>
          <p class="mark">歷經無數次面談媒合，STEP1NE 始終保持誠信為本的原則；不論您是充滿希望的社會新鮮人，或是閱歷豐富的高階經理人，我們的團隊皆以最專業的態度面對每一位客戶，理性分析並審慎評估，以提供客製化的最佳方案。</p>
          <p class="mark">STEP1NE 在本土深耕多年並擁有各領域的專家團隊，成員皆擅長發掘未曝光的菁英人才、頂尖團隊或高階主管。只有與企業身處同一領域的專家，才能在短時間內找到最符合企業需求的人選，有效降低企業招募的時間成本。</p>
          <p>不論您是追求美好職涯未來的優秀人才，還是期望繁盛壯大的企業；STEP1NE 皆是您最好的唯一選擇，讓我們伴您一同創造事業高峰！</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'About',
  };
</script>

<style lang="scss" scoped>
  .aboutWrapper {
    @include area();
    @include flex(flex-start, stretch);
    background-color: white;

    @include rwd() {
      flex-direction: column;
    }

    .textArea {
      @include bg('~@/assets/ui/about-text-bg.jpg', center, cover);
      background-color: $primary;
      flex: 3;

      .container {
        max-width: 800px;
        margin: 0;
        padding: 64px;

        @include rwd() {
          padding: 32px 20px;
        }
      }

      .title {
        @include font(36, white, bold, 48);

        @include rwd() {
          @include font(17, white, bold, 20);
          text-align: center;
        }
      }

      .subTitle {
        @include font(24, white, false, 30);

        @include rwd() {
          @include font(14, white, false, 16);
          text-align: center;
        }
      }

      .content {
        @include font(16, white);
        padding-top: 16px;

        @include rwd() {
          font-size: 13px;
        }

        p {
          line-height: 2;
          padding-bottom: 16px;

          &.mark {
            position: relative;
            padding-left: 32px;

            &::before {
              @include box(20, 20);
              @include bg('~@/assets/icon/star.png');
              @include position(0, 6px);
              content: '';
            }
          }
        }
      }
    }

    .imgArea {
      @include area();
      @include bg('~@/assets/ui/about-img-bg.jpg', center, cover);
      flex: 2;

      @include rwd() {
        height: 300px;
        flex: auto;
        background-position: top;
      }
    }
  }
</style>
