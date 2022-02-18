<template>
    <div class="ES-box">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickSava"
        >
            <template #title>
                <div style="font-size:16px;color:#333">编辑个人信息</div>
            </template>
            <template #left>
                <van-icon name="cross" size="25" />
            </template>
             <template #right>
                <font style="font-size:16px;color:#FCAA3A">保存</font>
            </template>
         </van-nav-bar>
         <!-- 头像 昵称-------start -->
        <div class="ES-item-box">
            <van-uploader :after-read="afterUploadHeadImg">
                <div class="ES-item-head-photo">
                    
                        <img class="ES-item-head-img" height="100%" src="https://pic.tujia.com/upload/resourcespic/day_200903/202009031819461069.jpg" alt="">
                
                </div>
             </van-uploader>
            <div class="ES-item-uname"> 
                <van-cell-group>
                    <van-field v-model="userConfig.nickname" placeholder="请输入用户名" />
                </van-cell-group>    
            </div>
        </div>
         <!-- 头像 昵称-------end -->
         
         <!-- 说明------start -->
         <div class="ES-box-item-comment">
             <div style="width:100%">个人信息</div>
             <div>完善您的个人信息有助于获得房东的信任</div>
         </div>
         <!-- 说明------end -->


        <div @click="clickEditUname" class="ES-box-item-content">
            <div>姓名</div>
            <div v-if="!userConfig.uname" class="ES-box-item-right-position">请选择你的姓名</div>
            <div v-else class="ES-box-item-right-position">{{userConfig.uname}}</div>
            <van-icon name="arrow" size="25" />
        </div>
        

        <div @click="clickEditSex" class="ES-box-item-content">
            <div>性别</div>
            <div class="ES-box-item-right-position">{{filterSex}}</div>
            <van-icon name="arrow" size="25" />
        </div>

        <div @click="clickEditAge" class="ES-box-item-content">
            <div>年龄</div>
            <div v-if="!userConfig.age" class="ES-box-item-right-position">请选择你的年龄</div>
             <div v-else class="ES-box-item-right-position">{{userConfig.age}}</div>
            <van-icon name="arrow" size="25" />
        </div>
        <div @click="locaitonClick" class="ES-box-item-content">
            <div>所在城市</div>
            <div v-if="!userConfig.currentCity" class="ES-box-item-right-position">选择你当前的城市地区</div>
            <div v-else class="ES-box-item-right-position">{{userConfig.currentCity}}</div>
            <van-icon name="arrow" size="25" />
        </div>

        <!-- 姓名区域 ----------start -->
        
        <van-dialog :beforeClose="unameClickRules"  v-model="dialogShow" title="姓名" show-cancel-button>
          
                <van-form ref="unameRef" @submit="onSubmit">
                    <van-field
                        v-model="userConfig.uname"
                        name="姓名"
                        label="姓名"
                        placeholder="请填写姓名"
                        :rules="[{ required: true, message: '不能为空' }]"
                    />
                </van-form>
            
        </van-dialog>

        <!-- 姓名区域 ----------start -->

        <!-- 性别选择区域-----------start -->
        <van-action-sheet v-model="sexShow">
            <van-picker
                title="选择性别"
                show-toolbar
                :columns="selectSex"
                @confirm="selectSexFinish"
                @cancel="selectSexCancel"
            />
        </van-action-sheet>
          <!-- 性别选择区域-----------end -->

        <!-- 年龄选择区域----------start -->
        <van-action-sheet v-model="ageShow">
            <van-datetime-picker
                v-model="currentDate"
                :swipe-duration="100"
                type="date"
                title="选择年 月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="selectAgeFinish"
                @cancel="selectAgeCancel"
            />
        </van-action-sheet>

        <!-- 所在城市 dialog-------------start -->
        <van-action-sheet v-model="locationShow">
           <van-area @confirm="locationFinish" @cancel="locationCancel" title="标题" :area-list="areaList" value="110101" />
         </van-action-sheet>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
export default {
    data() {
        return {
            dialogShow:false,
            currentDialogOption:'',
            headImgBlob:'',
            userConfig:{
                nickname:'游客123123',
                uname:'', //真实姓名
                sex:'',  //性别
                age:'', //年龄
                currentCity:'', //当前城市
            },
            areaList,
            //选择性别数据
                selectSex:['男','女'],
            //选择性别控制dialog显示隐藏
                sexShow: false,
            //选择年龄控制dialog显示隐藏
                ageShow:false,

            //年龄选择范围
                minDate: new Date(1970, 0, 1),
                maxDate: new Date(new Date().getFullYear()-16 , 11, 1),
                currentDate: new Date(2000 , 1, 1),
            //省市区选择dialog显示隐藏
            locationShow:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        async onClickSava(){
            this.$toast('保存')
            let {data:res}  = await this.$axios.post('/[待完善]',userConfig)
            if(res.code!==200) return this.$toast.fail('更新信息失败')
            this.$toast.success('更新成功')
            //需要对本地缓存的个人信息进行更新  [待完善]
        },
        clickEditUname(item){
            this.currentDialogOption = item
            this.dialogShow=true
        },
        //修改性别点击
        clickEditSex(){
            this.sexShow = true
        },
        //修改姓名确定触发
        unameClickRules(action, done){
            if (action === 'confirm') {
                
                if(this.userConfig.uname.replace(/(^s*)|(s*$)/g, "").length ==0){
                    this.$refs['unameRef'].submit()
                    done(false)
                }
                else{
                    done()
                }
            } else {
                done();
                this.$refs['unameRef'].resetValidation()
                this.userConfig.uname=''
            }
        },
       //性别选择确认
       selectSexFinish(value, index){
           this.userConfig.sex = index
           this.sexShow = false
       },
       //性别取消选择
       selectSexCancel(){
           this.userConfig.sex=''
           this.sexShow=false;
       },
        //点击编辑年龄显示隐藏
        clickEditAge(){
            this.ageShow=true
            console.log();
        },
        //确定选择年龄
        selectAgeFinish(){
            let now = new Date().getFullYear();
            let selectDate = this.currentDate.getFullYear()
            this.userConfig.age=(now - selectDate)
            this.ageShow=false
        },
        
        selectAgeCancel(){
            this.ageShow=false;
            this.userConfig.age='';
        },

        //所在城市点击
        locaitonClick(){
            this.locationShow=true
        },
        //省市区选择确定按钮
        locationFinish(value){
            let arr = []
            value.forEach(e => {
                arr.push(e.name)
            });
            this.userConfig.currentCity=arr.join('/')
            this.locationShow=false
        },
        //
        locationCancel(){
            this.locationShow = false;
        },
        //上传图片之前,获取file对象
        async afterUploadHeadImg(file){
            console.log(file);
           let formDate = new FormData()
           formDate.append('file',file.file)
           let {data:res} = await this.$axios.post('/[待完善]',formDate)
           if(res.code!=200)return this.$toast.fail('更新头像失败')
        }
    },
    computed:{
        //过滤性别
        filterSex(){
            var sex = ''
           this.userConfig.sex.length==0?sex='请选择你的性别':this.userConfig.sex==1?sex='女': this.userConfig.sex==0?sex='男':''
            return sex
        },
    }
}
</script>

<style>
    .van-icon-cross{
        color: black !important;
    }
    .ES-item-box{
        height: 15vh;
        display: flex;
        align-items: center;
        padding: 0px 20px;
        border-bottom: 0.5px solid rgb(230, 230, 230);
    }
      /* 图片  Box*/
    .ES-item-head-photo{
        width:70px;
        height: 70px;
        background-color: balck;
        border-radius: 80px;
        overflow: hidden;
        box-shadow: 0px 6px 10px -3px rgb(133 132 132);
        display: flex;
        justify-content: center;
    }
    /* 昵称 */
    .ES-item-uname{
        font-size: 20px;
        margin-left: 20px;
    }
     .ES-box-item-comment{
         box-sizing: border-box;
         height: 10vh;
         padding: 15px;
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         border-bottom: 0.5px solid rgb(230, 230, 230);
     }
    .ES-box-item-comment div:nth-child(1){
        font-weight:600;
        font-size: 20px;
    }
    .ES-box-item-comment div:nth-child(2){
        font-size: 13px;
        color: rgb(140, 140, 140);
    }
    /* 内容编辑区域 */
    .ES-box-item-content{
        height: 7vh;
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0px 15px;
        position: relative;
        border-bottom: 0.5px solid rgb(230, 230, 230);
    }
    .ES-box-item-content div:nth-child(1){
        color: rgb(59, 58, 58);
    }
    /* 右侧固定定位  请选择性别 年龄 ......*/
    .ES-box-item-right-position{
        position: absolute;
        right: 12%;
        font-size: 15px;
        color: rgb(146, 146, 146);
    }
</style>
