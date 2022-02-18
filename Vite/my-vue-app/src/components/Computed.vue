<template>
  <div>computed:{{ value }}</div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "computed",
  setup(props) {
    const a = ref(1);
    const b = ref(2);
    const value = computed(() => {
      return a.value + b.value;
    });
    return { value };
  },
};
</script>

<style></style>
