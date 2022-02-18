<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input v-model="userInfo.query">
            <el-button
              slot="append"
              icon="el-icon-search"
            />
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="orderList"
        style="width: 100%"
      >
        <el-table-column
          label="#"
          type="index"
          width="40"
        />
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="260"
        />
        <el-table-column
          prop="order_price"
          label="订单价格"
        />
        <el-table-column
          prop="order_pay"
          label="是否付款"
        >
          <template v-slot="scope">
            <div>
              <el-tag
                v-if="scope.row.pay_status == 0"
                type="warning"
              >
                未支付
              </el-tag>
              <el-tag
                v-if="scope.row.pay_status == 1"
                type="success"
              >
                已支付
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货"
        />
        <el-table-column
          label="下单时间"
        >
          <template v-slot="scope">
            <div>
              {{ scope.row.create_time | dateFormat }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template v-slot="scope">
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <el-button
                  size="mini"
                  type="primary"
                  @click="editOrder(scope.row)"
                >
                  <i class="el-icon-edit" />
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="Top Center 提示文字"
                placement="top"
              >
                <el-button
                  size="mini"
                  type="success"
                >
                  <i class="el-icon-location" />
                </el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
        
      <el-pagination
        :current-page="userInfo.pagenum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="userInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 修改地址的对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="addresVisible"
      width="50%"
      :before-close="addresVisibleClose"
      @close="addressClose('addresFormRef')"
    >
      <el-form
        ref="addresFormRef"
        :model="addresForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="省市区/县"
          prop="address1"
        >
          <el-cascader
            v-model="addresForm.address1"
            :options="citydata"
            @change="addressChange"
          />
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="address2"
        >
          <el-input
            v-model="addresForm.address2"
            type="text"
          />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelAddres">取 消</el-button>
        <el-button
          type="primary"
          @click="finishAddres('addresFormRef')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import citydata from './citydata'
export default {
   
    data() {
        return {
            userInfo:{
                query:'',
                //当前页码数
                pagenum:1,
                // 每页显示几条数据
                pagesize:5
            },
            // 列表数据
            orderList:[],
            total:0,

            //控制修改地址的对话框
            addresVisible:false,
            //省市级联内容
            addresForm:{
                address1:[],
                address2:''
            },
            //省市文件
            citydata:citydata,
            //路由规则
            rules:{
                address1:[
                    { required: true, message: '请选择地址', trigger: 'blur' },
                ],
                address2:[
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { min: 2, max:30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.getList()
    },
     methods:{
        async getList(){

          let {data:res} = await this.$axios.get('orders',{params:this.userInfo})
            console.log(res)
            if(res.meta.status!=200) return this.$message.error('查询失败!')
            this.$message.success('查询成功!')    
            this.orderList =res.data.goods
            this.total = res.data.total
            console.log(this.orderList);
        },

        //编辑订单按钮
        editOrder(){
            this.addresVisible=true
        },
        //每页显示几条数据调整触发,接受一个新值
        handleSizeChange(size){
            this.userInfo.pagesize=size
            this.getList()
        },
        // 当前页码值改变触发,接收一个新值
        handleCurrentChange(size){
            this.userInfo.pagenum=size
            this.getList()
        },
        //修改地址取消前
        addresVisibleClose(){
         this.$confirm('确认关闭？')
          .then(_ => {
              this.addresVisible=false
            done();
          })
          .catch(_ => {});
        },

        //对话框的取消按钮
        cancelAddres(){
            this.addresVisible=false
        },
        //修改地址的确定按钮
        finishAddres(ref){
            this.$refs[ref].validate(bool=>{
                console.log(bool);
            })
        },
        //级联选择触发
        addressChange(val){
            console.log(val);
        },
        addressClose(ref){
            this.$refs[ref].resetFields()
        }
    }
}
</script>

<style scoped>
.el-cascader{
    width: 100%;
}
</style>