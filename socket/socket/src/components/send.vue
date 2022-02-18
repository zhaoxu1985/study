<template>
  <div>
    <div style="position:fixed;width:100%;z-index: 10;">
      <van-row>
        <van-col span="24">
          <div style="width:100%;background-color:red;"></div>
          <van-nav-bar
            :title="separateMessage.name"
            @click-left="exitBtn"
            @click-right="rightBtn"
            left-arrow
          >
            <template #right>
              <van-icon name="search" size="18" />
            </template>
          </van-nav-bar>
        </van-col>
      </van-row>
    </div>
    <div style="height:50px"></div>

    <!-- 消息区域 -->
    <div v-for="(item, i) in message" :key="i">
      <!-- 自己的消息 -->
      <van-row v-if="item.uname == uname" :key="i">
        <van-col span="20">
          <div>
            <div class="rightContent">
              <div style="text-align: end;">{{ uname }}</div>
              <div class="Rmsg">
                <div v-if="item.type != 'audio/mp3'" v-html="item.message"></div>
                <audio v-else :src="item.audio" controls></audio>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="4">
          <div style="margin-top:20px;text-align:end">
            <van-image
              round
              fit="cover"
              width="3rem"
              height="3rem"
              :src="myImg"
            />
          </div>
        </van-col>
      </van-row>

      <!-- 对方的信息 -->
      <van-row v-else>
        <div>
          <van-col span="4">
            <div style="margin-top:10px ">
              <van-image
                round
                fit="cover"
                width="3rem"
                height="3rem"
                :src="item.head_img"
              />
            </div>
          </van-col>
          <van-col span="18">
            <div class="contentBox">
              <div>
                <div style="text-align:start;">{{ item.uname }}</div>
                <div class="Lmsg">
                  <div>
                    <div v-if="item.type != 'audio/mp3'">
                      {{ item.message }}
                    </div>
                    <audio
                      v-else
                      :src="item.audio"
                      controls
                    ></audio>
                  </div>
                </div>
              </div>
            </div>
          </van-col>
        </div>
      </van-row>
    </div>

    <div style="height:60px"></div>
    <div class="sendBox">
      <van-row>
        <!-- v-if="isAudio" -->
        <van-col span="4">
          <van-cell-group>
            <v-touch
              @press="audioStart"
              @pressup="audioStop"
              :enabled="{ press: true }"
              :press-options="{ direction: 'horizontal', threshold: 100 }"
              class="TJ TJyuyin"
            >
            </v-touch>
          </van-cell-group>
        </van-col>
        <van-col span="16">
          <van-cell-group>
            <van-field v-model="sendValue" />
          </van-cell-group>
        </van-col>
        <van-col span="4">
          <van-button
            @click="send"
            style="width:100%"
            icon="https://z3.ax1x.com/2021/01/02/rzJLoq.png"
          ></van-button>
        </van-col>
      </van-row>
      <van-number-keyboard safe-area-inset-bottom />
    </div>
  </div>
</template>

<script>
import "../../public/js/recorder";
var that;
var recorder = new Recorder({
  sampleRate: 10100, //采样频率，默认为44100Hz(标准MP3采样率)
  bitRate: 40, //比特率，默认为128kbps(标准MP3质量)
  success: function() {
    //成功回调函数
    that.isAudio = true;
  },
  error: function(msg) {
    //失败回调函数
    alert(msg);
  },
  fix: function(msg) {
    //不支持H5录音回调函数
    console.log(that);
    that.isAudio = false;
    alert(msg);
  },
});

export default {
  data() {
    return {
      sendValue: "", //输入框的值
      uname: window.sessionStorage.getItem("uname"), //自己的名字
      myImg: window.sessionStorage.getItem("myImg"), //自己的头像
      //单发人信息
      separateMessage: {},
      //消息
      message: [],
      isAudio: true,
    };
  },
  //监听socket事件 也就是接收消息
  sockets: {
    connect: function() {
      //与socket.io连接后回调
      console.log("连接成功");
    },
    //接收私发消息
    //>>>>>>>>    待完善
    oToMessage(data) {
      if (data.type == "audio/mp3") {
        // let blob = new Blob([data.audio], {
        //   type: data.type,
        // });
        // data.audio = URL.createObjectURL(blob);
        this.message.push(data);
      } else {
        this.message.push(data);
      }
    },
  },
  methods: {
    //后退按钮
    exitBtn() {
      this.$router.go(-1);
    },
    filterAudio(item) {
      console.log(typeof(item));
        if(typeof(item) === "string"){
          return item
        }else{
           return URL.createObjectURL(new Blob([item],{type:'audio/mp3'}))
        }
    },
    //发送文本消息
    send() {
      let sendObj = {
        uid: window.sessionStorage.getItem("uid"), //发送者id
        sid: this.separateMessage.uid, //  接收者id
        audio: "", //语音消息,
        message: this.sendValue, //文本消息
        type: "text",
        head_img: this.myImg,
        uname: this.uname,
        is_read: false, // text是否已读
        send_date: this.$getDate(),
        send_time: this.$getTime(),
        audio_isRead: false, //语音是否已读
        m_id: Date.now(),
        be_uname: this.separateMessage.uname, //接收者uname
        be_head_img: this.separateMessage.imgPath, //接收者头像
      };
      this.message.push(sendObj);

      this.$socket.emit("puoToMessage", sendObj);
      this.sendValue = "";
    },
    // 语音按下
    audioStart() {
      console.log(this.isAudio);
      if (this.isAudio == false) {
        return alert("不支持");
      }
      recorder.start();
    }, //语音抬起
    audioStop() {
      let that = this;
      recorder.getBlob(function(blob) {
        let sendObj = {
          uid: window.sessionStorage.getItem("uid"), //发送者id
          sid: that.separateMessage.uid, //  接收者id
          audio: blob, //语音消息,
          message: "", //文本消息
          type: "audio/mp3",
          head_img: that.myImg,
          uname: that.uname,
          is_read: 0, // text是否已读
          send_date: that.$getDate(),
          send_time: that.$getTime(),
          audio_isRead: 0, //语音是否已读
          m_id: Date.now(), //发送毫秒数 用于排序 和 是否已读
          be_uname: that.separateMessage.uname,
          be_head_img: that.separateMessage.imgPath,
        }
        that.$socket.compress(true).emit("puoToMessage", sendObj);
        sendObj.audio = URL.createObjectURL(blob)
        that.message.push(sendObj);
      });
      recorder.stop();
      return false;
    },
  },
  mounted() {
    that = this;
  },
  created() {
    this.separateMessage = this.$route.params;
    this.message = this.$route.params.msgArr;
    console.log(this.$route.params);
  },
  updated() {
    window.scroll(0, document.body.scrollHeight);
  },
};
</script>

<style scoped>
.TJyuyin {
  font-size: 40px;
}
</style>
