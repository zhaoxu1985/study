<template>
  <div class="app">
      <button @click="handler">弹出</button>
  </div>
</template>

<script>
export default {
  name: "asyncComponent",
  props: {
  },
  methods:{
      handler(){
          this.form({
            component: ()=>import('@/components/form1')
          })
      }
  }
};
</script>

<style>
</style>