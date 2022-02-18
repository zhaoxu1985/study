<template>
    <div class="US-box">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        >
            <template #title>
                <div style="font-size:16px;color:#333">账号安全设置</div>
            </template>
            <template #left>
                <van-icon name="arrow-left" size="25" />
            </template>
         </van-nav-bar>
        <!-- 个人资料------start -->
        <div class="US-box-item">
            <div> 个人资料 </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 个人资料------end -->

        <!-- 用户名------start -->
         <div class="US-box-item">
            <div> 用户名 </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 用户名------end -->

        <div class="US-box-item US-box-item-title">
            账号安全
        </div>

          <!-- 手机号------start -->
         <div class="US-box-item">
            <div> 手机号 </div>
            <div class="US-box-item-right">
              
                <font style="font-weight:600;color:#454545">183****3334</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 手机号------end -->

        <!-- 邮箱------start -->
         <div class="US-box-item">
            <div> 邮箱 </div>
            <div class="US-box-item-right">
                
                <font style="font-weight:600;color:#454545">zhao1985019435@gmail.com</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 邮箱------end -->

        <div class="US-box-item US-box-item-title">
            安全设置
        </div>

         <!-- 登陆密码------start -->
         <div class="US-box-item">
            <div> 登陆密码 </div>
            <div class="US-box-item-right">
                <font style="font-weight:600;color:#454545">修改</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 登陆密码------end -->

        <div class="US-box-signOut">
            <div>退出登录</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods:{
        onClickLeft() {
            this.$router.go(-1)
        },
    }
}
</script>

<style>
/* user setting  => US*/
.US-box{
    background-color: #F4F8FB;
    height: 100vh;
}
.van-icon-arrow-left{
    color: #333 !important;
}
.van-icon-arrow{
    color: #CFCFCF !important;
}
.US-box-item{
    height:50px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background-color:#FFFFFF;
    font-weight: 500;
    align-items: center;
    padding: 0px 16px;
    box-sizing: border-box;
    position: relative;
}
.US-box-item-title{
     background-color:#F4F8FB;
     font-weight: 600;
}
.US-box-item-right{
    position: absolute;
    right: 12%;
}
.US-box-signOut{
    height: 50px;
    padding: 0px 15px;
    margin-top: 50px;
}
.US-box-signOut div{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    color: white;
    background: linear-gradient(90deg,#fa8c1d,#fcaf3f);;
}
</style>