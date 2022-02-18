<template>
  <div class="message-box" :style="`width:${width}px`" v-show="hidden">
    <div class="message-title">
      <span>{{ title }}</span>
      <div class="hiddenBtn" @click="close">X</div>
    </div>
    {{ message }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidden: true,
      title: "default",
      message: "",
      width: 100,
      offsetTop: 20,
      location: "right",
      duration: 2000,
    };
  },
  methods: {
    close() {
      this.hidden = false;
      this.onClose(this.id);
    },
  },
  mounted() {},
};
</script>

<style>
.message-box {
  position: absolute;
  right: 10px;
  min-width: 200px;
  border: 1px solid rgba(114, 114, 114, 0.123);
  padding: 5px;
  background-color: rgba(77, 151, 235, 0.281);
  border-radius: 8px;
  overflow: hidden;
  transition: 1s all ease;
}
.message-title {
  height: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(185, 185, 185, 0.329);
}
.hiddenBtn {
  width: 20px;
  height: 20px;
  border: 2px solid rgb(62, 161, 243);
  border-radius: 100px;
  text-align: center;
  cursor: pointer;
}
</style>