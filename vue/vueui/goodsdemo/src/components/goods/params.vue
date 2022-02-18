<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-alert
        title="注意:只允许为第三级分类设置相关参数!"
        :closable="false"
        type="warning"
        show-icon
      />
      <!-- 选择商品分类 -->
      <el-row class="rowMargin">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="selectCateValue"
            clearable
            :show-all-levels="false"
            :options="cateList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id'
            }"
            @change="selectCateChange"
          />
        </el-col>
      </el-row>
      <el-row class="rowMargin">
        <el-col>
          <el-tabs
            v-model="activeName"
            @tab-click="activeHandleClick"
          >
            <el-tab-pane
              label="动态参数"
              name="many"
            >
              <el-button
                :disabled="isBtn"
                type="primary"
                size="mini"
                @click="addManyParams"
              >
                添加参数
              </el-button>
              <!-- 动态参数表格 -->
              <el-table
                :data="manyTableData"
                border
                stripe
              >
                <!-- 展开行 -->
                <el-table-column type="expand">
                  <template v-slot="scope">
                    <div>
                      <el-tag
                        v-for="(item,i) in scope.row.attr_vals"
                        :key="i"
                        closable
                        @close="closeTag(i,scope.row)"
                      >
                        {{ item }}
                      </el-tag>
                      <el-input
                        v-if="scope.row.InputVisible"
                        ref="saveTagInput"
                        v-model="scope.row.inputValue"
                        v-focus
                        class="input-new-tag"
                        size="small"
                        @blur="handleInputConfirm(scope.row)"
                        @keyup.enter.native="$event.target.blur"
                      />
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="addTag(scope.row)"
                      >
                        + New Tag
                      </el-button>
                    </div>
                  </template>
                </el-table-column>

                <!-- 索引列 -->
                <el-table-column
                  type="index"
                  label="#"
                />
                <el-table-column
                  label="参数名称"
                  prop="attr_name"
                />
                <el-table-column label="操作">
                  <template v-slot="scope">
                    <div>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="editMonyDialog(scope.row)"
                      >
                        修改
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="deleteCate(scope.row)"
                      >
                        删除
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane
              label="静态属性"
              name="only"
            >
              <el-button
                :disabled="isBtn"
                type="primary"
                size="mini"
                @click="addOnlyParams"
              >
                添加属性
              </el-button>

              <!-- 静态参数列表 -->
              <el-table
                :data="onlyTableData"
                border
                stripe
              >
                <!-- 展开行 -->
                <el-table-column type="expand">
                  <template v-slot="scope">
                    <el-tag
                      v-for="(item,i) in scope.row.attr_vals"
                      :key="i"
                      closable
                      @close="closeTag(i,scope.row)"
                    >
                      {{ item }}
                    </el-tag>
                    <el-input
                      v-if="scope.row.InputVisible"
                      ref="saveTagInput"
                      v-model="scope.row.inputValue"
                      v-focus
                      class="input-new-tag"
                      size="small"
                          
                      @blur="handleInputConfirm(scope.row)"
                      @keyup.enter.native="$event.target.blur"
                    />
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="addTag(scope.row)"
                    >
                      + New Tag
                    </el-button>
                  </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column
                  type="index"
                  label="#"
                />
                <el-table-column
                  label="属性名称"
                  prop="attr_name"
                />
                <el-table-column label="操作">
                  <template v-slot="scope">
                    <div>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="editOnlyDialog(scope.row)"
                      >
                        修改
                      </el-button>
                      <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="deleteCate(scope.row)"
                      >
                        删除
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addParamsVisible"
      width="30%"
      :before-close="addParamsVisibleClose"
    >
      <!-- 添加数据的表单 -->
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          :label="titleText"
          prop="attr_name"
        >
          <el-input v-model="addForm.attr_name" />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelAddParams('addFormRef')">取 消</el-button>
        <el-button
          type="primary"
          @click="fnishAddManyForm('addFormRef')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 静态编辑对话框 -->
    <el-dialog
      :title="'编辑' + titleText"
      :visible.sync="editParamsVisible"
      width="30%"
      :before-close="editParamsVisibleClose"
    >
      <!-- 添加数据的表单 -->
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          :label="titleText"
          prop="attr_name"
        >
          <el-input v-model="editForm.attr_name" />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelEditParams('editFormRef')">取 消</el-button>
        <el-button
          type="primary"
          @click="fnishEditManyForm('editFormRef')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有分类数据
      cateList: [],
      //级联选择器数据绑定
      selectCateValue: [],
      //激活的tabs标签名字
      activeName: 'many',

      //动态参数数据
      manyTableData: [],
      //静态参数数据
      onlyTableData: [],
      //控制添加参数显示隐藏
      addParamsVisible: false,
      //添加动态参数表达
      
      //编辑对话框显示隐藏
      editParamsVisible:false,
      //tag按钮显示隐藏
      InputVisible:false,

      addForm:{
          attr_name:''
      },
      //编辑对话框数据
      editForm:{
      
      },
      rules:{
          attr_name:[
              { required: true, message: '请输入参数', trigger: 'blur' },
              { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
      },
    }
  },
  computed: {
    isBtn() {
      if (this.selectCateValue.length !== 3) {
        return true
      }
      return false
    },
    //当前选中的三级id
    cateId() {
      if (this.selectCateValue.length === 3) return this.selectCateValue[2]
      return null
    },

    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },

  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios.get('/categories')
      if (res.meta.status !== 200)
        return this.$message.error('获取商品分类失败!')
      this.$message.success('获取商品分类成功!')
      this.cateList = res.data
    },
    //级联选择器触发，有选择就触发
    async selectCateChange() {
      this.getParamsData()
      if(this.selectCateValue.length==0){
          this.manyTableData=[]
          this.onlyTableData=[]
      }
    },
    //获取参数列表数据
    async getParamsData() {
      if (this.selectCateValue.length !== 3) return (this.selectCateValue = [])

      let { data: res } = await this.$axios.get(
        `categories/${this.cateId}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      )
          res.data.forEach((element,i) => {
            element.attr_vals=element.attr_vals ? element.attr_vals.split(',') :[]
            element.InputVisible=false
            element.inputValue = ''
          });
      //如果是动态参数
      if (this.activeName === 'many') {
        if (res.meta.status !== 200)return this.$message.error('获取动态参数失败!')
        this.$message.success('获取动态参数成功!')
        this.manyTableData = res.data
   
      } else {
        if (res.meta.status !== 200)return this.$message.error('获取静态属性失败!')
        this.$message.success('获取静态属性成功!')
        this.onlyTableData = res.data
      }
    },
    //tabs选择标签触发的事件
    activeHandleClick() {
      this.getParamsData()
    },
    //添加动态参数按钮
    addManyParams() {
      this.addParamsVisible = true
    },
    //添加静态属性触发
    addOnlyParams() {
      this.addParamsVisible = true
    },
    //添加参数页面关闭前提示
    addParamsVisibleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    //动态编辑对话框取消前触发
    editParamsVisibleClose(done){
        this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    //添加参数取消按钮
    cancelAddParams(ref) {
      this.addParamsVisible = false
        this.$refs[ref].resetFields()
        this.addForm.attr_name=''
    },

    
    //添加参数确定按钮
    fnishAddManyForm(ref){
        this.$refs[ref].validate(async bool=>{
            if(bool==false) return 
            let {data:res}= await this.$axios.post(`categories/${this.cateId}/attributes`,{
                attr_name:this.addForm.attr_name,
                attr_sel:this.activeName
            })
            if(res.meta.status !==201) return this.$message.error(`添加${this.titleText}错误!`)
            
            this.$message.success(`添加${this.titleText}成功!`)
            this.addForm.attr_name=''
            this.getParamsData()
            this.addParamsVisible=false
        })
    },
    //编辑按钮
    async editMonyDialog(row){
        console.log('动态编辑');
        let {data:res} = await this.$axios.get(`categories/${this.cateId}/attributes/${row.attr_id}`,{
            attr_sel:this.activeName
        })
        if(res.meta.status!==200)return this.$message.error('获取分类失败!')
        this.editForm=res.data
        this.editParamsVisible=true
    },
    //静态编辑按钮
    async editOnlyDialog(row){
        console.log('静态编辑');

        let {data:res} = await this.$axios.get(`categories/${this.cateId}/attributes/${row.attr_id}`,{
            attr_sel:this.activeName
        })
        if(res.meta.status!==200)return this.$message.error('获取分类失败!')
        this.editForm=res.data
        this.editParamsVisible=true
    },

    //编辑取消按钮
    cancelEditParams(){
        this.editParamsVisible=false
        this.editForm={}
    },

    //编辑按钮确定
     fnishEditManyForm(ref){

        this.$refs[ref].validate( async bool=>{

            if(bool==true){
                
                    let {data:res} = await this.$axios.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{
                        attr_name:this.editForm.attr_name,
                        attr_sel:this.activeName
                    })
                    if(res.meta.status!=200) return this.$message.error(`修改${this.titleText}失败`)
                    this.$message.success(`修改${this.titleText}成功`)
                    this.editParamsVisible=false
                    this.getParamsData()
                    this.editForm={}
            }else{
                return false
            }
        })
       
    },
    //删除按钮
    deleteCate(row){
       
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async val=> {
            let {data:res} =await this.$axios.delete(`/categories/${this.cateId}/attributes/${row.attr_id}`)
        
            if(res.meta.status!==200)return this.$message.error(`删除${this.titleText}失败!`)
            this.$message.success(`删除${this.titleText}成功!`)
            this.getParamsData()
        }).catch(_=>{})

       
   },
   //tag回车或者失去焦点的时候触发
    async handleInputConfirm(res){
        //如果为空,清空内容并阻止
        
        if(res.inputValue.trim() == ''){
            return this.$message.error('请输入内容!!!')
        }
        //不为空则进行下一步操作
        res.attr_vals.push(res.inputValue)
        res.inputValue=''
        this.saveTag(res)
    },
    //保存tag和各项参数属性的操作
    async saveTag(res){
        
        let {data:resp} = await this.$axios.put(`categories/${this.cateId}/attributes/${res.attr_id}`,{
            attr_name:res.attr_name,
            attr_sel:res.attr_sel,
            attr_vals:res.attr_vals.join(','),
        })

        if(resp.meta.status!==200) return this.$message.error('更新失败!')
        this.$message.success('更新成功!')
        this.getCateList()
        res.InputVisible=false
    },
    //添加tag按钮
    addTag(res){
        res.InputVisible=true
         this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    //关闭tag触发事件
    closeTag(i,row){
        
        row.attr_vals.splice(i,1)
        console.log(row);
        this.saveTag(row)
    }
  }
}
</script>

<style scoped>
.rowMargin {
  margin-top: 20px;
}
.el-tag{
    margin:10px
}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
  }
</style>
