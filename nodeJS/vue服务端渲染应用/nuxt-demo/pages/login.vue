<template>
  <div>
    我是登录页面
    <nuxt-link to="/" />
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      console.log(this, 12);
      this.$router.push("/home/a1");
    }, 2000);
  },
};
</script>

<style></style>
