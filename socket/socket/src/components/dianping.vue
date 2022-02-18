<template>
   <div class="DF-box">
       <div class="DF-title">
           <div class="DF-title-left">房客点评 </div>
           <div class="DF-title-right">
               <div class="Df-title-right-score">
                   <p>5.0</p>
                   <div class="DF-title-right-1-line"></div>
               </div>
               <div>
                   <p>超赞</p>
                   <p>96条评论</p> 
                       <van-rate v-model="dtAvgRage" :size="8" allow-half readonly void-icon="star" void-color="#eee" />
               </div>
           </div>
       </div>
       <div class="DF-content-box">
           <div class="DF-content">
                <div class="DF-content-head">
                    <div class="DF-content-head-userInfo">
                        <img height="32px" src="https://pic.tujia.com/upload/festatic/app/tujia_useravatar.png" alt="">
                        <div>
                            <div>
                                钱*****竹
                            </div>
                            <div>2020-10-02入住</div>
                        </div>
                    </div>
                    <div>
                        <p>5.0</p>
                        <van-rate v-model="dtAvgRage" :size="8" allow-half readonly void-icon="star" void-color="#eee" />
                    </div>
                </div>
                <div class="Df-content-message">
                        说下房价，开始觉得有点贵，但是到了以后才明白贵有贵的道理，网上图片全部真实，去过的还会再想去第二次
                </div>
           </div>
       </div>
       <div class="DF-bottom-lookAllComments">
           <font style="padding-right:16px">查看全部99条评价></font>
       </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            //防瞌平均评分
            dtAvgRage:4
        }
    },
}
</script>

<style>
/* 房客点评开始>>>>>>>>>>>>>start  */
p{
    margin: 0;
}
.DF-title{
    padding: 14px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC-Regular,Helvetica Neue,sans-serif;
}
.DF-title-left{
    color: #333;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
}
.DF-title-right{
    display: flex;
    align-items:center;
}
.DF-title-right div:nth-child(1){
    font-size: 48px;
    font-weight: 600;
    line-height: 25px;
}
.Df-title-right-score{
    margin-right: 15px;
}
.DF-title-right div:nth-child(2){
    font-size: 12px;
}
.DF-title-right-1-line{
    width: 100%;
    height: 5px;
    border-radius: 20px;
    background:linear-gradient(90deg,#fa8c1d,#fcaf3f);
}
.DF-content-box{
    padding: 16px;
}
.DF-content{
    border-radius: 6px;
    background-color: #F7F9FB;
    padding: 12px;
    
}
.DF-content-head{
    display: flex;
    justify-content: space-between;
}
.DF-content-head-userInfo{
    display: flex;
    align-items: center;
    font-size: 10px;
}
.DF-content-head-userInfo div{
    margin-left: 5px;
}
.DF-content-head p{
    text-align: end;
    font-size: 18px;
    font-weight: 600;
}
.Df-content-message{
    margin-top: 15px;
    font-size: 12px;
}
/* 底部点击弹出所有评论  可以使用房屋设施 ` .DF-lookAll ` 样式代替，待优化 。。。  */
.DF-bottom-lookAllComments{
    width: 100%;
    text-align: end;
    color: #ff9645;
    font-size: 14px;
    font-weight:600;
    padding-bottom: 16px;
}
/* 房客点评结束>>>>>>>>>>>>>end  */
</style>