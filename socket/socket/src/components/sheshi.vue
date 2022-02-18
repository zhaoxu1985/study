<template>
  <div class="DF-box">
        <!-- 标题 -->
        <div class="DF-title">房屋设施</div>
        <!-- 内容区域 -->
        <div class="DF-content">
            <!-- 每一行分类 后期使用v-for渲染-->
            <div v-for="item in 3" :key="item">
                <div class="DF-content-1">
                    <img width="20px" src="https://pic.tujia.com/upload/festatic/crn/jichu.png" alt="">
                    <div style="width:100%;text-align:center">
                        <font style="width:100%">基础设施</font>
                    </div>
                </div>
                <div class="DF-content-2">
                    <div class="DF-content-2-content">
                            <div>
                                <img height="12px" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
                                <div>无线网络</div>
                            </div>
                            <div>
                                <img height="12px" src="https://pic.tujia.com/upload/festatic/mp/error_red.png" alt="">
                                <div>电梯</div>
                            </div>
                            <div>
                                <img height="12px" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
                                <div>无线网络</div>
                            </div>
                            <div>
                                <img height="12px" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
                                <div>无线网络</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部区域 查看全部 -->
        <div class="DF-lookAll">
            <font style="padding-right:16px">查看全部设施></font>
        </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>
/* 房屋设施开始>>>>>>>>>start */
.DF-box{}
.DF-title{
    padding: 14px 16px;
    font-size: 20px;
    color: #333;
    line-height: 22px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
}
.DF-content{
    padding:0px 16px 0px 16px;
    box-sizing: border-box;
    width: 100%;
    margin-top: 20px;
}
.DF-content div{
    display: flex;
    background-color: #F7F9FB;
    border-radius: 6px;
}
.DF-content-1{
    /* padding: 16px; */
    flex:20%;
    flex-wrap:wrap;
    display: flex;
    box-sizing: border-box;
    padding: 16px 0px 16px 0px !important;
    justify-content: center !important;
    align-items: center;
    font-size: 11px;
    color: #333;
    font-weight: 600;
    margin-top: 3px;
}
.DF-content-1 image{
    flex-shrink: 0;
    width: 20;
    height: 20px;
}
.DF-content-2{
    flex:80%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-left:16px;
}
.DF-content-2 div{
    flex:48%;
    padding-left: 4px;
    font-size: 11px;
    color: #333;
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    margin: 0;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.DF-lookAll{
    width: 100%;
    text-align: end;
    color: #ff9645;
    font-size: 14px;
    font-weight:600;
    margin-top: 16px;
    padding-bottom: 16px;
}
.DF-content-2-content{
    padding: 10px;
    flex-wrap: wrap;
}

/* 房屋设施结束>>>>>>>>>end */

</style>