<template>
  <router-view></router-view>
</template>

<script>
import {mapState} from './store'
// import add from "./components/add/index.vue";
import subtraction from "./components/subtraction.vue"
import Vfor from './components/vfor.vue';
export default {
  data() {
    return {};
  },
  components: {
    subtraction,
    Vfor
  },
};
</script>

<style></style>
