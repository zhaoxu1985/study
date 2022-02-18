<template>
  <div>
    <div v-for="(item, i) in data" :key="i">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :index="`${i}`"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item
          v-for="(item2, j) in item.children"
          :key="j"
          :index="item2.path"
        >
          {{ item2.name }}
          <groupItem :data="item2.children" />
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import groupItem from "./groupItem.vue";
export default {
  name: "groupItem",
  components: {
    groupItem,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {},
};
</script>

<style></style>
