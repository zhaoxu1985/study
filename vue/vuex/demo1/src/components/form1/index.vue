<template>
  <div>
      我是内容哇哇哇哇哇哇哇 
      key:{{key}}
  </div>
</template>

<script>
export default {
    name:'form1',
    props:{
        key:{
          type:Number|String,
          default:'我是默认key'  
        }
    },
    data(){
        return {
            '我是name':'aaaa'
        }
    },
}
</script>

<style>

</style>