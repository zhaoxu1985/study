<template>
  <div class="box">
    
    <div class="center">
      
      <router-view>
          
      </router-view>
    </div>
      <van-number-keyboard safe-area-inset-bottom />
    <div class="bottom" route>
      <van-tabbar v-model="active">
        <van-tabbar-item to='/theContent' icon="chat">消息</van-tabbar-item>
        <van-tabbar-item to='/contact' icon="friends">联系人</van-tabbar-item>
        <van-tabbar-item to="/login"  icon="star">动态</van-tabbar-item>
      </van-tabbar>
    </div>
  
  </div>
</template>

<script>
import 'vue';
import SocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'

Vue.use(new SocketIO({
  debug: true,
    connection: ClientSocketIO.connect('http://localhost:9000',{
    autoConnect: false,
    transports: ['websocket'], 
     auth:{
        imgPath:window.sessionStorage.getItem('myImg'),
        uid:window.sessionStorage.getItem('uid'),
        uname:window.sessionStorage.getItem('uname'),
     }
  }) 
}))
console.log(Vue);
export default {
  name: "messageList",
  data() {
    return {
      route:this.$route.path,
      active:0
    };
  },
  sockets:{
    //连接成功回调
    reconnect(a,b){
      console.log('成功回调',a,b);
    },
    reconnecting(){
      console.log('reconnecting');
    }
  },
  methods: {
    
  },
  updated() {
        if(this.$route.path==='/theContent'){
            this.active=0
        }else if(this.$route.path==='/contact'){
          this.active=1
        }else if(this.$route.path==='/send'){
          this.active=2
        }
  },
  watch:{
    
  },
  created(){

  },
  mounted() { 
     this.$socket.open()
   
  },
   destroyed() {

  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
}
.header {
  width: 100%;
}
.center {
  width: 100%;
  height: 80vh;
}
.bottom {
  width: 100%;
  height: 10%;
  position: fixed;
  bottom: 0;
}
</style>
