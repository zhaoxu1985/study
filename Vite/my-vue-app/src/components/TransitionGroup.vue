<template>
  <div>
    <transition-group appear name="li-item" tag="ul">
      <li
        :style="{ transition: `${i + 2}00ms` }"
        v-for="(item, i) in list"
        :key="item"
      >
        {{ item }}
      </li>
    </transition-group>
    <button @click="del">删除</button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "TransitionGroup",
  setup(props) {
    const data = reactive({
      list: [1, 2, 3, 4, 5, 1, 2, 3, 3, 3, 3, 3],
      del() {
        this.list.splice(this.list.length - 1, 1);
      },
    });
    return data;
  },
  mounted() {},
};
</script>

<style>
.li-item-enter-active {
  transition: all 0.25s ease-in;
}
.li-item-leave-active {
  transition: all 0.25s ease-in;
}
.li-item-enter-from,
.li-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
