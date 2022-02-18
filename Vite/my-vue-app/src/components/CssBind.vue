<template>
  <div class="box">真不错</div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  setup(props) {
    const obj = reactive({
      main: "blue",
      fontColor: "white",
    });

    return obj;
  },
};
</script>

<style>
.box {
  width: 110px;
  height: 110px; 
  background-color: v-bind(main);
  color: v-bind(fontColor);
}
</style>
