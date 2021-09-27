<template>
  <div class="sign-canvas">
    <canvas id="canvas" width="400" height="600" @mousedown="canvasDown($event)" @mousemove="canvasMove($event)" @mouseup="canvasUp()" @mouseleave="canvasLeave()" ref="canvas">
      抱歉，您的浏览器暂不支持canvas元素
    </canvas>
    <div class="sign-btn">
      <div class="clear" @click="clear">
        清空
      </div>
      <div class="save" @click="save">
        保存
      </div>
    </div>
    <img :src="saveImage" />
  </div>
</template>

<script>
  export default {
    data() {
      return { saveImage: '' };
    },
    mounted() {
      this.show();
    },
    methods: {
      show() {
        this.canvas = this.$refs.canvas; // 指定canvas
        this.ctx = this.canvas.getContext('2d'); // 设置2D渲染区域
        this.ctx.lineWidth = 2; // 设置线的宽度
      },
      canvasDown(e) {
        this.canvasMoveUse = true;
        const canvasX =
          e.clientX - e.target.offsetLeft + document.documentElement.scrollLeft;
        const canvasY =
          e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
        this.ctx.beginPath(); // 移动的起点
        this.ctx.moveTo(canvasX, canvasY);
      },
      canvasMove(e) {
        // 只在移动是进行绘制图线
        if (this.canvasMoveUse) {
          const t = e.target;
          let canvasX;
          let canvasY;
          canvasX =
            e.clientX - t.offsetLeft + document.documentElement.scrollLeft;
          canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
          this.ctx.lineTo(canvasX, canvasY);
          this.ctx.stroke();
        }
      },
      canvasUp() {
        this.canvasMoveUse = false;
      },
      canvasLeave() {
        this.canvasMoveUse = false;
      },
      clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      },
      save() {
        const imgBase64 = this.$refs.canvas.toDataURL();
        this.saveImage = imgBase64;
      },
    },
  };
</script>

<style scoped>
  .sign-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px 30px;
  }
  .sign-canvas canvas {
    background-color: #e0e3e5;
  }
  .sign-btn {
    display: flex;
    margin: 20px 0;
  }
  .sign-btn div {
    width: 175px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    color: #ffffff;
  }
  .sign-btn div:active {
    background-color: #cccccc;
    color: #333333;
  }
  .sign-btn .clear {
    background-color: #ff8f58;
  }
  .sign-btn .save {
    background-color: #0599d7;
  }
</style>