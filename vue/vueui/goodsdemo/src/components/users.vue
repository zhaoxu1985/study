<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- stop 面包屑导航区域 -->

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.query"
            class="input-with-select"
            clearable
            @clear='clearSearch'
          >
            <el-button
              @click='searchBtn'
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button @click="addUsers" type="primary">添加用户</el-button></el-col
        >
      </el-row>

      <div class="text item"></div>

      <!--stop 卡片区域 -->
      <el-table :data="userList" style="width: 100%;" stripe :border="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="a">
            <div>
              <el-switch
                @change="userstatechange(a.row)"
                v-model="a.row.mg_state"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="233px" label="操作">
          <template v-slot="operation">
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                :enterable="false"
                content="编辑"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                   @click='showEdit(operation.row.id)'
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                :enterable="false"
                content="删除"
                placement="top"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="(deleteUser(operation.row.id))"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                :enterable="false"
                content="分配权限"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="assignPermissions(operation.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="userInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <el-dialog
        title="添加成员"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="usercancel('addUserRef')"
         :before-close="handleClose"
        >

          <el-form :model="addUsersFrom" :rules="addUsersRules" ref="addUserRef" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addUsersFrom.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addUsersFrom.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUsersFrom.email"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="addUsersFrom.mobile"></el-input>
              </el-form-item>
          </el-form>
          <div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible=false">取消</el-button>
              <el-button type="primary" @click="yesAddUser('addUserRef')">确 定</el-button>
            </span>
          </div>
      </el-dialog>
  <!-- 编辑对话框 -->
        <el-dialog
          title="编辑用户"
          :visible.sync="eidtUsersSync"
          width="50%"
          >
          <span>
            <el-form :model="editForm" ref='editUserRefs' :rules="editUsersRules">
              <el-form-item label="用户名" prop="username">
                <el-input disabled v-model="editForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model='editForm.email'></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
            </el-form>
          </span>
          <span slot="footer">
            <el-button @click="editFormClose('editUserRefs')">取 消</el-button>
            <el-button type="primary" @click="editUserInfo('editUserRefs')">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
      let rulesEmail=(rule,value,cb)=>{
        const Zemail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(Zemail.test(value)) {
          cb()
        }else{
          cb(new Error('请输入合法的邮箱！'))
        }
      }
      let rulesMobile=(rule,value,cb)=>{
        const mobile =/^1[3|4|5|7|8][0-9]{9}$/
        if(mobile.test(value)) {
          cb()
        }else{
          cb(new Error('请输入合法的手机号！'))
        }
      }
    //获取用户列表数据
    return {
      userInfo: {
        query: '',
        pagenum: 1, //当前页码
        pagesize: 10 //每页显示几条数据
      },
      total: 0,
      searchValue: '',
      userList: [],
      addDialogVisible:false,
      eidtUsersSync:false,
      //添加用户表单
      addUsersFrom:{
          username:'',
          password:'',
          email:'',
          mobile:''
      },
      //添加用户表单验证规则
      addUsersRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          email: [
             { validator: rulesEmail, trigger: 'blur' }
          ],
          mobile: [
             { validator:rulesMobile, trigger: 'blur' }
          ],
      },
    //编辑用户表单验证规则
      editUsersRules:{
        username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          email: [
             { validator: rulesEmail, trigger: 'blur' }
          ],
          mobile: [
             { validator:rulesMobile, trigger: 'blur' }
          ]
      },
      editForm:{},

      
    }
  },
  methods: {
    
    async getUserList() {
      let { data: res } = await this.$axios.get('/users', {
        params: this.userInfo
      })
      if (res.meta.status !== 200) return console.log('失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    //分配权限
    assignPermissions(val) {
      console.log(val)
    },
    //每页显示几条数据
    handleSizeChange(val) {
      this.userInfo.pagesize = val
      this.getUserList()
    },
    //当前页数
    handleCurrentChange(val) {
      this.userInfo.pagenum = val
      this.getUserList()
    },
    //状态
    async userstatechange(val) {
      const {data:res} = await this.$axios.put(`/users/${val.id}/state/${val.mg_state}`)
      if(res.meta.status !== 200){
          val.msg_status=!val.msg_status
         return this.$message.error('更改用户状态失败')
      }
      this.$message.success({message:'修改用户状态成功！',center:true})
   },
      //搜索按钮
    searchBtn(){
      this.getUserList()
    },
    clearSearch(){
      this.getUserList()
    },
    //添加用户按钮
    addUsers(){
      this.addDialogVisible=true
    },
    //确定
    
    //取消
    usercancel(val){
      this.$refs[val].resetFields()
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_=> {
            done();
          })
          .catch(_=> {});
      }
    ,
    //确定的时候验证全部表单
     yesAddUser(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
              let {data:res} = await this.$axios.post('users',this.addUsersFrom)
              if(res.meta.status !==201) return this.$message.error('添加失败!')
              this.$message.success('添加成功!')
              this.addDialogVisible=false
              this.getUserList()
          } else {
            console.log('添加失败!');
            return false;
          }
        });
      },
      //显示编辑用户对话框
      async showEdit(id){
        this.eidtUsersSync=true
        console.log(id);
        let {data:res} = await this.$axios.get(`users/${id}`)
        if(res.meta.status !== 200) return this.$message.error('获取失败')
        this.$message.success('获取成功')
        this.editForm=res.data
        console.log(this.editForm);
      },
      //监听关闭对话光事件
      editFormClose(ref){
        this.$refs[ref].resetFields()
          this.eidtUsersSync=false
      },
      //修改用户信息并以交
       editUserInfo(editUserRefs){
       this.$refs[editUserRefs].validate(async bool=>{
         if(!bool) return 
         //修改用户信息请求
         let {data:res} = await this.$axios.put(`users/${this.editForm.id}`,{email:this.editForm.email,mobile:this.editForm.mobile})
         if(!200) return this.$message.error('更新失败!')
         this.$message.success('更新成功!')
         this.eidtUsersSync=false
         this.getUserList()
         this.$refs[editUserRefs].resetFields()
       })
      },
      async deleteUser(id){
        
        
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data:res} =await this.$axios.delete(`/users/${id}`)
          if(!res.meta.status) return this.message.error('删除失败!')
          this.$message.success('删除成功!')
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.el-breadcrumb {
  font-size: 14px;
  margin-bottom: 30px;
}
</style>
