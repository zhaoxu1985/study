<template>
  <nuxt-child />
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    selectHandler(index) {
      this.$router.push("home");
    },
  },
};
</script>
<style scoped></style>
