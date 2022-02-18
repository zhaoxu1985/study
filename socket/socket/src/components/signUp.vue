<template>
  <div class="box">
        
      <div class="center">
            <van-uploader v-model="fileList" multiple :max-count="1" />
          <div style="border-radius:10px 10px 10px 10px; overflow: hidden;z-index: 20;">
               <van-field v-model="username" placeholder="输入一个名字开始聊天吧" />
          </div>
          
            <van-button  round type="info" @click="add">点击加入</van-button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            
            fileList: [],
        }
    },
    methods: {
        async add(values){
            if(this.username=='')return this.$toast({message:'输入一个名字吧',position:'bottom'})
            window.sessionStorage.setItem('uname',this.username)
            //创建图片储存表单
            let formdata =new FormData()
            //判断是否选择图片
            if(this.fileList.length==0){
                return this.$toast({message:'选择一个头像吧',position:'bottom'})
            }
            formdata.append('file',this.fileList[0].file)
            formdata.append('uname',sessionStorage.getItem('uname'))
            formdata.append('uid',this.username)
              //发送图片信息和注册信息
            let {data:res}= await this.$axios.post('/uploadImg',formdata)
            console.log(res);
            window.sessionStorage.setItem('uid',res.uid)
            window.sessionStorage.setItem('uname',res.uname)
            //获取头像
            window.sessionStorage.setItem('myImg','http://localhost:9000'+res.imgPath)
           
            //路由跳转
            this.$router.push('/theContent')

        },
    },
    sockets:{
        reconnect(){
            console.log('aaaaaaaa');
        }
    }
}
</script>

<style scoped>

    .box{
        display: flex;
        width: 100%;
        height: 100vh;
        background: rgb(226, 137, 20);
        justify-content: center;
        align-items: center;
    }
    .center{
        width: 70%;
        height:20%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        /* background-color: rgb(119, 187, 73); */
    }
    .textBox{
        background-color: rgb(235, 65, 65);
        overflow: hidden;
        z-index: 20;
        border-radius: 10px 10px 10px 10px;
    }
</style>