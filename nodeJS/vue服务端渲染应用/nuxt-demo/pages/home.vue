<template>
  <div>
    <el-container>
      <el-aside width="201px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="selectHandler"
        >
          <groupItem :data="routeList"></groupItem>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header"></div>
        </el-header>
        <el-main>
          child:
          <nuxt-child keep-alive></nuxt-child>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import groupItem from "@/components/groupItem.vue";
export default {
  data() {
    return {
      routeList: [],
    };
  },
  components: {
    groupItem,
  },
  methods: {
    selectHandler(index) {
      this.$router.push(index);
    },
  },
  mounted() {
    this.routeList = this.$router.options.routes;
  },
};
</script>

<style>
.el-container {
  height: 100vh;
}
.el-menu-vertical-demo {
  width: 200px;
  min-height: 100vh;
}
.header {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
.el-header {
  padding: 0;
}
</style>
