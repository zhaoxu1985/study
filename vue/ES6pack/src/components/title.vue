<template>
  <div>
    <div>标题 : {{title.title}}</div>
    <div>内容 : {{title.value}}</div>
    <button @click="changeTitle">更改Title</button>
  </div>
</template>

<script>
export default {
    name:'Title',
    props:{
        title:{
            type:Number | String
        }
    },
    data() {
        return {
            
        }
    },
    mounted(){
      console.log(this)
    },
    methods:{
      changeTitle(){
        this.$emit('update:title','新址')
      }
    }
}
</script>

<style>

</style>