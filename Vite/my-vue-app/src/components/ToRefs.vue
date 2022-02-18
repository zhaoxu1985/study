<template>
  <div>
    <hr />
    <div>{{ d }} / {{ a }}</div>
    <button @click="click">更新值</button>
    <button @click="updateA">updateA</button>
  </div>
</template>

<script>
import { ref, toRefs, reactive, toRef } from "vue";
export default {
  name: "Trefs",
  setup(props) {
    const { d, a } = reactive({
      a: 1,
      b: 2,
      c: 3,
      d: { name: 111 },
    });
    // console.log("aaa");
    return { d, a };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    click() {
      this.d.name = "更新后";
    },
    updateA() {
      this.a = "更新后";
    },
  },
};
</script>

<style></style>
