<template>
  <div>
    <van-nav-bar safe-area-inset-top />
    <div class="header">
      <van-nav-bar
        fixed
        title="在线人数"
        @click-left="showPopup"
        left-text="返回"
        left-arrow
      >
        <template #left>
          <van-image
            fit="contain"
            round
            width="3rem"
            height="3rem"
            :src="myimg"
          />
        </template>
        <template #right>
          <van-icon name="more" size="30px" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 在线人数列表 >>> -->  
    <div class="box"  @click="listClick(item)"  v-for="(item, i) in oto" :key="i">
            <div class="detailBox">
              <div class="left">
                <img class="img" width="180%" :src="item.be.head_img"  alt="" />
              </div>
              <div class="right">
                <div class="rightTop">
                  {{item.be.uname}}
                </div>
                <div v-if="item.msgArr[item.msgArr.length-1].type=='text'" class="rightBottom" :key="i" >
                  {{item.msgArr[item.msgArr.length-1].message}} 
                </div>
                <div v-if="item.msgArr[item.msgArr.length-1].type=='audio/mp3'" class="rightBottom" :key="i" >
                  [语音消息]
                </div>
              </div>
              <div class="time">
                {{item.msgArr[item.msgArr.length-1].send_time}}
                <van-badge :content="item.msgArr.length" max="99" size="20px"/>
              </div>
            </div>
    </div>

    <!-- <<<  在线人数列表 -->
    <van-popup
      v-model="contentShow"
      position="left"
      round
      :style="{ height: '100%', width: '80%' }"
    >
    </van-popup>
   
  </div>
</template>

<script>
import send from './send.vue'
export default {
  data() {
    return {
      contentShow: false,
      uname: window.sessionStorage.getItem("uname"),
      uid: window.sessionStorage.getItem("uid"), //自己id
      myimg: window.sessionStorage.getItem("myImg"), //自己的头像
      oto:[],
      sendShow:false,
    };
  },
  components:{
    send
  },
  sockets: {
    //接收私发消息
    oToMessage(data) {
        console.log(data);
        let that = this
        this.oto.forEach((e,i) => {
            if(e.sid==data.uid){
              let bufer = new re
              this.oto[i].msgArr.push(data)
            }
        });
        // this.oto.push(data)
    },
  },
  methods: {
    leftClick() {
      console.log("点击");
    },
    showPopup() {
      this.contentShow = true;
    },
    //点击每个获取消息 并跳转
    async listClick(item) {
      
      this.$router.push({ name: "send", params: {
        uname:item.be.uname,
        imgPath:item.be.head_img,
        uid:item.be.uid,
        msgArr:item.msgArr
      }});
      let {data:res} = await this.$axios.post('/updateMsgRead',{
        uid:this.uid,
        sid:item.sid,
      })
      console.log(res);
    },
    //监听手机物理按键返回事件
    backChange() {
      const that = this;
      console.log("监听到了");
    },
    //获取历史消息
    async getHistoryMsg(){

      
        this.$axios({
            url: '/getHistoryMsg',
            method: 'get',
            params:{
              uid:window.sessionStorage.getItem('uid')
            },
            responseType: 'arrayBuffer'
        }).then(res => {
              console.log(res);
                 this.oto = res.data.data
        })
    //  let {data:res} = await this.$axios.get('/getHistoryMsg',{params:{uid:window.sessionStorage.getItem('uid')}})
    //  this.$toast.success('获取成功')
 
    //  console.log(res.data);
    }
  },
  created() {

  },
  mounted() {
        this.getHistoryMsg()
  },
  beforeDestroy() {
    this.$socket.emit("exit", window.sessionStorage.getItem("uid"));
  },
};
</script>

<style scoped>
.detailBox {
  display: flex;
  width: 100%;
  /* align-items: center; */
}
.box {
  width: 100%;
  height: 55px;
  background-color: rgba(224, 217, 217, 0.158);
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.left {
  display: block;
  width: 50px;
  height: 50px;
  /* background-color: aqua; */
  border-radius: 20%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 10px;
}
.van-badge{
  width: 28px !important;
  font-size: 20px !important;
}
.right {
  overflow: hidden;
  width: 100%;
  height: 100%;

  display: inline-block;
}

.rightTop {
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  height: 50%;
  font-family: "雅黑";
  font-weight: 600;
  margin-top: 5px;
}

.rightBottom {
  width: 100%;
  height: 70%;
  padding-left: 10px;
  font-size: 10px;
}

.time {
  margin-right: 5px;
  display: flex;
  align-items: center;
}
.img{
    
}
</style>
