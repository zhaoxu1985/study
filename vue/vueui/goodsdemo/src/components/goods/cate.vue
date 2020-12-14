<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主题卡片区域 -->
    <el-card>
      <!-- 添加分类按钮 -->

      <el-button type="primary" @click="addCate">添加分类</el-button>

      <!-- 表格区域 -->
      <tree-table
        index-text="#"
        show-index
        :expand-type="false"
        :selection-type="false"
        :data="cateFormList"
        :columns="columns"
      >
        <!-- 是否有效列模板 -->
        <template v-slot:isok="scope">
          <div>{{ scope.row.cat_id }}</div>
          <i
            style="color:rgb(84, 200, 32)"
            class="el-icon-success"
            v-if="scope.row.cat_deleted == false"
          ></i>
          <i style="color:red" v-else class="el-icon-error"></i>
        </template>
        <!-- 排序列模板 -->
        <template v-slot:order="scope">
          <div>
            <el-tag type="primary" v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.cat_level == 2"
              >三级</el-tag
            >
          </div>
        </template>

        <!-- 操作模板列 -->
        <template v-slot:operation="operation">
          <div>
            <el-button @click="editCate(operation.row)" size="mini" type="primary">
              <i class="el-icon-edit"></i>
              编辑
            </el-button>
            <el-button @click="deleteCate(operation.row)" size="mini" type="danger">
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </div>
        </template>
      </tree-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cateForm.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="cateForm.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    
    <el-dialog
      title="添加分类"
      :visible.sync="addCategoryVisible"
      width="50%"
      :before-close="cancelPrompt"
    >
      <span>
        <!-- 添加分类表单 -->
        <el-form
          :model="addCateFormList"
          :rules="rules"
          ref="addCateFormRule"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addCateFormList.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
                clearable
                v-model="selectValue"
                :options="ParentCateList"
                :props="{
                expandTrigger: 'hover',
                label: 'cat_name',
                value: 'cat_id',
                checkStrictly :true
                }"
                @change="handleChange"
                >
            </el-cascader>
          </el-form-item>
        </el-form>
        <!-- select多层选择 -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateCancel('addCateFormRule')">取 消</el-button>
        <el-button type="primary" @click="finishAddCategory('addCateFormRule')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
        title="提示"
        :visible.sync="editVisible"
        width="50%"
        :before-close="editBeforeClose">
        
        <el-form :model="cateEditForm" :rules="rules" ref="cateEditFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="cateEditForm.cat_name"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="editCancel('cateEditFormRef')">取 消</el-button>
            <el-button type="primary" @click="finishEdit('cateEditFormRef')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品分类加载配置
      cateForm: {
        //层级
        type: 3,
        //当前页码值
        pagenum: 1,
        //每页显示多少条数据
        pagesize: 5
      },
      //商品分类加载列表数据、
      cateFormList: [],
      //总条数
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          //标题名称
          label: '是否有效',
          // 表示当前列为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'isok'
        },
        {
          //标题名称
          label: '排序',
          // 表示当前列为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'order'
        },
        {
          //标题名称
          label: '操作',
          // 表示当前列为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'operation'
        }
      ],
      //添加分类页面显示隐藏
      addCategoryVisible: false,
        //添加分类表单数据
        addCateFormList:{
            //父级分类的id
            cat_pid:Number,
            //分类名称
            cat_name:'',
            // 默认添加分类为一级分类
            cat_level:Number
        },
      
      // select选择器数据
        selectValue: [],
        //获取到的一级和二级的列表数据
        ParentCateList:[],
    //编辑页显示隐藏
        editVisible:false,
    
    //编辑输入框的数据
    cateEditForm:{
        cat_name:'',
        id:Number
    },
      //规则
      rules:{
          cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],

      }
    }
  },
  methods: {
    async getCateFormList() {
      let { data: res } = await this.$axios.get('/categories', {
        params: this.cateForm
      })
      if (res.meta.status != 200) return this.$message.error('获取列表失败')
      this.cateFormList = res.data.result
      this.total = res.data.total
      console.log(res)
    },
    //监听当前显示多少数据
    handleSizeChange(newsize) {
      // console.log(newPage);
      this.cateForm.pagesize = newsize
      this.getCateFormList()
    },
    //监听当前页码值
    handleCurrentChange(newnum) {
      this.cateForm.pagenum = newnum
      this.getCateFormList()
    },
    //添加分类按钮
    addCate() {
        //先显示获取数据列表
      this.getParentCateList()
        //再显示页面
      this.addCategoryVisible = true
        
    },
    //添加分类确定按钮
    finishAddCategory(ref) {
        this.$refs[ref].validate(async bool=>{
            if(bool !== true) return 
            this.handleChange()
        let {data:res} = await this.$axios.post('/categories',this.addCateFormList)
        if(res.meta.status!==201)return this.$message.error('添加分类失败!')
        this.$message.success('添加分类成功!')
        this.$refs[ref].resetFields()
        this.selectValue=[]
        this.addCategoryVisible=false
         this.getCateFormList()
        })
        
    },
    //添加分类页面关闭前提示
    cancelPrompt(done) {
      this.$confirm('确认关闭？')
        .then(g => {
           this.addCategoryVisible = false
           this.selectValue = []
            this.addCateFormList.cat_name=''
           done()
        })
        .catch(err => {})
    },
    // 添加分类取消按钮
    addCateCancel(ref){
        this.addCategoryVisible = false
        this.selectValue = []
        this.$refs[ref].resetFields()
    },
    

    //select进行选择触发
    handleChange(value) {
        // console.log(this.selectValue)
        if(this.selectValue.length==1){
            //如果长度等于1，说明是二级分类
            // 父级分类id
            this.addCateFormList.cat_level=1
            console.log(this.selectValue[0]);
            this.addCateFormList.cat_pid=this.selectValue[0]
            return
        }else if(this.selectValue.length ==2){
            //如果长度2，说明是三级分类

            // 分类等级为三级
            this.addCateFormList.cat_level=2

            this.addCateFormList.cat_pid=this.selectValue[1]
            return
        }else{
            //一级分类
            this.addCateFormList.cat_level=0
            this.addCateFormList.cat_pid=0

        }
    },
    
    async getParentCateList(){
       let {data:res} = await this.$axios.get('/categories',{params:{type:2}})
        if(res.meta.status !== 200) return this.$message.error('获取分类列表失败!')
        this.ParentCateList=res.data
    },
    //编编按钮
    async editCate(row){
        this.editVisible=true
        let {data:res}=await this.$axios.get(`categories/${row.cat_id}`)
        if(res.meta.status !=200) return this.$message.error('获取分类失败!')
        this.cateEditForm.cat_name=res.data.cat_name
        this.cateEditForm.id = res.data.cat_id
    },
    //删除按钮
    async deleteCate(row){
       
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async bool =>{
           
            let {data:res} = await this.$axios.delete(`categories/${row.cat_id}`)
            if(res.meta.status!=200)return this.$message.error('删除失败!')
            this.$message.success('删除成功!')
            this.getCateFormList()
        }).catch(err=>{})
    },
    //编辑按钮取消前的提示
     editBeforeClose(done) {
      this.$confirm('确认关闭？')
        .then(g => {
            this.cateEditForm.cat_name=''
            this.cateEditForm.id=Number
           done()
        })
        .catch(err => {})
    },
    //编辑确定提交按钮
    finishEdit(ref){
        console.log(this.cateEditForm);
        this.$refs[ref].validate(async bool=>{
            if(bool!==true) return
            let {data:res} = await this.$axios.put(`categories/${this.cateEditForm.id}`,{
                cat_name:this.cateEditForm.cat_name
            })
            if(res.meta.status !==200)return this.$message.error('修改分类失败!')
            this.$message.success('编辑分类成功!')
            this.cateEditForm.cat_name=''
            this.cateEditForm.id=Number
            this.editVisible=false
            this.getCateFormList()
            this.$refs[ref].resetFields()
        })
        
    },
    //编辑按钮取消
    editCancel(ref){
        this.editVisible=false
        this.$refs[ref].resetFields()
        this.cateEditForm.cat_name=''
        this.cateEditForm.id=Number
    }
  },
  created() {
    this.getCateFormList()
  }
}
</script>

<style scoped>
.el-button {
  margin-bottom: 20px !important;
}
.el-cascader{
    width: 100%;
}
.el-card{
  margin-top: 20px;
}
</style>
