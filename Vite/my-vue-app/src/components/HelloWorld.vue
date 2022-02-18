
<template>
  <div>
    <div>组合:{{ a }},{{ b }},{{ c }}</div>
    <hr />
    <div>dataArr:{{ dataArr }}</div>
    <button @click="aClick">aclick</button>
    <button @click="bClick">aclick</button>
    <button @click="cClick">aclick</button>
    <hr />
    <button @click="dataArrClick">arrDataClick</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const obj = reactive({
      a: 1,
      b: [1, 2, 3],
      c: 3,
      aClick() {
        this.a = 2;
      },
      bClick() {
        this.b[1] = "可以！！！";
      },
      cClick() {
        this.c = 4;
      },
    });
    return obj;
  },
  data() {
    return {
      dataArr: [1, 2, 3],
    };
  },
  methods: {
    dataArrClick() {
      this.dataArr[2] = "data也可以!";
    },
  },
};
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
