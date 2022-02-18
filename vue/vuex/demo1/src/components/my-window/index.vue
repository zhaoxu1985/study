<template>
  <div :id="'[form-key'+key+']'" class="box">
    <div>
       <div style="height:10%;display:flex;justify-content:space-between;cursor: pointer;">
         <div style="border:1px solid black" @click="close" >关闭</div>
       </div>
       <div style="height:90%">
         <slot>我是默认</slot>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'add',
  data() {
    return {
       isShow:false,
    }
  },
  props:{
   key:{
      key:Number|String,
      default:parseInt(Math.random()*100)
   }
  },
  created() {
  },
  methods: {
    close(){
      this.isShow = false
      const formDiv = document.getElementById(`[form-key${this.key}]`)
      document.body.removeChild(formDiv)
    }
  },
  computed:{
    
  }
};
</script>

<style scoped>
  .box{
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid rgb(155, 154, 154);
    top: 33%;
    left: 33%;
  }
</style>
