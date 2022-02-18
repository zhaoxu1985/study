<template>
  <div>
    <button @click="open">弹窗</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    open() {
      this.$message({
        message: "你好",
      });
    },
  },
};
</script>

<style>
</style>