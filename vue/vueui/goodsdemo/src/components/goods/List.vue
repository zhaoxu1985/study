<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            v-model="userInfo.query"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="clearSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchBtn"
            />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addGoods"
          >
            添加商品
          </el-button>
        </el-col>
      </el-row>

      <el-table
        :data="listFormValue"
        border
        stripe
      >
        <el-table-column
          type="index"
          label="#"
        />  
        <el-table-column
          prop="goods_name"
          label="商品名称"
        />  
        <el-table-column
          prop="goods_price"
          label="商品价格"
        />  
        <el-table-column
          prop="goods_weight"
          label="商品重量"
        />  
        <el-table-column
          prop="add_time"
          label="创建时间"
        >
          <template v-slot="scope">
            <div>
              {{ scope.row.add_time | dateFormat }}
            </div>
          </template>
        </el-table-column>  
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                @click="editBtn(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteBtn(scope.row)"
              >
                删除
              </el-button>
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
    <!-- 编辑商品 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="editGoodsVisible"
      width="70%"
      :before-close="editGoodsBefore"
    >
      <el-form
        ref="editFormDataRef"
        :model="editFormData"
        :rules="rules"
      >
        <el-form-item
          label="商品名称"
          prop="goods_name"
        >
          <el-input v-model="editFormData.goods_name" />
        </el-form-item>
        <el-form-item
          label="价格"
          prop="goods_price"
        >
          <el-input v-model="editFormData.goods_price" />
        </el-form-item>
        <el-form-item
          label="数量"
          prop="goods_number"
        >
          <el-input v-model="editFormData.goods_number" />
        </el-form-item>
        <el-form-item
          label="重量"
          prop="goods_weight"
        >
          <el-input v-model="editFormData.goods_weight" />
        </el-form-item>
        <el-form-item
          label="介绍"
          prop="goods_introduce"
        >
          <el-input v-model="editFormData.goods_introduce" />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelEditGoods">取 消</el-button>
        <el-button
          type="primary"
          @click="finishAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo:{
                // 查询参数
                query:'',

                // 当前页码
                pagenum:1,
                //每页显示几条
                pagesize:5

            },
            //表单数据
            listFormValue:[],
            total:0,
            pageNum:3,
            
         //编辑对话框
            editGoodsVisible:false,
           
         //编辑表单项中的数据
         editFormData:{},

          rules:{
                goods_name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max:30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ],
                goods_cat:[
                    { required: true, message: '请输入分类', trigger: 'blur' },
                ],
                goods_price:[
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    { min: 1, max:99999, message: '长度在 1 到 99999 个字符', trigger: 'blur' }
                ],
                goods_number:[
                     { required: true, message: '请输入数量', trigger: 'blur' },
                ],
                goods_weight:[
                     { required: true, message: '请输入重量', trigger: 'blur' },
                ],
                goods_introduce:[
                      { required: true, message: '请输入介绍', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ]
            }
           
        }
    },
    created(){
        this.getFormList()
    },
    methods:{
        //获取表单数据
        async getFormList(){
          let {data:res} =await this.$axios.get('/goods',{params:this.userInfo})
            if(res.meta.status!=200) return this.$message.error('获取数据列表失败!')
            this.$message.success('获取参数列表成功!')
            
            this.listFormValue=res.data.goods
            this.total=res.data.total
        },
        //清除搜索触发
        clearSearch(){
            console.log('清除');
            this.getFormList()
        },
        //搜索按钮
        searchBtn(){
            console.log('进');
            if(!this.userInfo.query.trim()) return this.$message.error('请输入查询内容 ! 请不要瞎点 !')
            this.getFormList()
        },
        //添加商品按钮
        addGoods(){
            this.$router.push('/goods/add')
        },
        //添加按钮取消之前触发
        closeAddGoods(){
            this.$confirm('确认关闭？')
            .then(_ => {
                this.addGoodsVisible=false
            })
            .catch(_ => {});
        },
        //编辑按钮
        async editBtn(row){
            console.log(row);
            this.editGoodsVisible=true
           let {data:res} =await this.$axios.get(`goods/${row.goods_id}`)
           if(res.meta.status!==200)return this.$message.error('获取失败!')
            this.$message.success('获取成功!')
            console.log(res);
            this.editFormData=res.data
        },
       
        //删除按钮
        deleteBtn(row){
              
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                  let {data:res} = await this.$axios.delete(`goods/${row.goods_id}`)
                    if(res.meta.status!=200) return this.$message.error('删除失败!')
                    this.$message.success('删除成功！')
                    this.getFormList()
                }).catch(() => {});
        },
        //确定添加按钮
        finishAddGoods(ref){
            this.$refs[ref].validate( async bool=>{
             
                if(bool == false) return 
                let {data:res} = await this.$axios.post('goods',this.addGoodsForm)
                console.log(res);
                if(res.meta.status!=201) return this.$message.error('增加商品失败!')
                this.$message.success('增加商品成功!')
                
                this.$refs[ref].resetFields()
            })
            // this.$refs[ref].resetFields()
        },


        // 每页显示几条触发
        handleSizeChange(val){
            this.userInfo.pagesize=val
            this.getFormList()
        },
        // 当前页触发
        handleCurrentChange(val){
            this.userInfo.pagenum=val
            this.getFormList()
        },
            //编辑窗口关闭前的事件
            editGoodsBefore(){
                this.$confirm('确认关闭？')
                .then(_ => {
                  this.editGoodsVisible=false
                    done();
                })
                .catch(_ => {});
            },
            //取消编辑按钮
            cancelEditGoods(){
              this.editGoodsVisible=false

            },
            //确定编辑按钮
            async finishAdd(){
             let {data:res} = await  this.$axios.put(`goods/${this.editFormData.goods_id}`,this.editFormData)
              
              if(res.meta.status!== 200)return this.$message.error('编辑失败!')
              this.$message.success('编辑成功!')

              this.editGoodsVisible = false
            }
    }
}
</script>

<style scoped>

</style>