<template>
  <div>
    <div ref="str">{{ str }}</div>
    <div ref="obj">{{ obj.a }}</div>
    <button @click="changeData">更改</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: "str",
      obj: {
        a: 1,
      },
    };
  },
  methods: {
    changeData() {
      this.str = "更改";
      console.log(this.$refs["str"]);
      this.obj.a = "更改obj";
      console.log(this.$refs["obj"]);
    },
  },
  computed: {
    computedStr() {
      return this.str + "111";
    },
  },
};
</script>
