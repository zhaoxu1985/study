<template>
  <div>
    <div id="parent">
      <div id="bottomBox" ref="bottomBox"></div>
    </div>
  </div>
</template>

<script>
import { throttle } from "./throttle-debounce";

export default {
  mounted() {
    this.$refs["bottomBox"];
    //----------------------------------> 父容器id值 自行替换
    var parent = document.getElementById("parent");
    parent.onscroll = this.domFormHeight;
  },
  methods: {
    domFormHeight() {
      throttle(() => {
        this.$nextTick(() => {
          // ------------------------------->  替换元素id  元素id: 存放内容的容器
          const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          const parent = document.getElementById("parent"); // 获取父元素         自行替换
          const childrenDom = document.getElementById("bottomBox"); // 获取子元素 自行替换
          const formHeight =
            parent.offsetHeight -
            (childrenDom.offsetTop - parent.scrollTop - 50) -
            childrenDom.offsetHeight;

          if (formHeight > 0) {
            console.log("触底");
            // 这里调用 加载数据函数
          }
        });
      }, 500);
    },
  },
  beforeDestroy() {
    // 组件销毁取消监听
    window.onscroll = null;
  },
};
</script>

<style>
#bottomBox {
  width: 20px;
  height: 3000px;
  border: 1px solid;
}
#parent {
  width: 100px;
  height: 600px;
  border: 1px solid black;
  overflow: scroll;
}
#button {
  position: fixed;
  top: 20px;
  left: 100px;
}
</style>
