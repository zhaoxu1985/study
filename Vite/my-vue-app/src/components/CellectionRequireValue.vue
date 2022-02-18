<template>
  <div>
    {{ arr }}
    <br />
    <button @click="add">变</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup(props) {
    const arr = [ref("1"), ref(2)];
    const add = () => {
      console.log((arr[0].value = "12"));
    };
    return { arr, add };
  },
};
</script>

<style></style>
