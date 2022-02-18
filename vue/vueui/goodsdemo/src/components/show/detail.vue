<template>
  <div class="box">
        <el-row style="margin-top:30px"  gutter="20" justify='center' align="bottom">
            <el-col :span="9">
                <el-card shadow="hover">
                    <template>
                        <el-carousel style="padding:20px" indicator-position='outside' :interval="5000" arrow="always">
                            <el-carousel-item v-for="(item,key) in goodsDetails.pics" :key="key">
                                <img width="100%" :src="item.pics_mid" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </template>

                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card shadow="hover">
                    卡片
                </el-card>
            </el-col>
            
        </el-row>
        <div class='contentbox'>
             <el-row style="width:100%">
                <el-col :span="23">
                    <el-card shadow="hover">
                    </el-card>
                </el-col>
            </el-row>
        </div>
        

  </div>
</template>

<script>

export default {
    data() {
        return {
            //查询数据
            goodsInfo:{
                query:'',
                //当前页码
                pagenum:'1',
                // 每页显示几条数据
                pagesize:10
            },
            // 商品所有信息
            goodsDetails:{}
        }
    },
    methods:{
        //获取商品列表
        async getGoodsList(){
            window.sessionStorage.setItem('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MDkyMTI2NjgsImV4cCI6MTYwOTI5OTA2OH0.0cTQE1DbDFb9iux0NKpGDW1hQlrhg7nIKWSfjRab3uw')
            let {data:res} = await this.$axios.get('/goods',{
                params:{
                    ...this.goodsInfo
                }
            })
            console.log(res.data.goods[6]);
        },
        // 根据id获取商品详情
        async getIdGoods(){
            let {data:res} = await this.$axios.get(`goods/${91}`)
            console.log(res.data);
            this.goodsDetails=res.data
        }
        
    },
    created(){
        // this.getGoodsList()
        this.getIdGoods()
    }
}
</script>

<style scoped>
    .contentbox{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .box{
        width: 98%;
    }
    .el-card{
        background-color: rgba(202, 202, 202, 0.623);
    }
   .el-row{
       display: flex;
       justify-content: center;
   }

  .el-carousel__arrow {
      background-color: rgb(231, 148, 14) ;
  }
</style>