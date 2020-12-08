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
          :page-sizes="[1, 2, 3, 4]"
          :page-size="userInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <el-dialog
        title="添加成员"
        :visible.sync="addDialogVisible"
        width="50%">

      <el-form :model="addUsersFrom" :rules="addUsersRules" ref="addUserRef" label-width="80px">
         <el-form-item label="用户名" prop="uname">
          <el-input v-model="addUsersFrom.uname"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="upwd">
          <el-input type="password" v-model="addUsersFrom.upwd"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUsersFrom.email"></el-input>
         </el-form-item>
         <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUsersFrom.mobile"></el-input>
         </el-form-item>
      </el-form>
      

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="yesAddUser('addUserRef')">确 定</el-button>
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
        pagesize: 4 //每页显示几条数据
      },
      total: 0,
      searchValue: '',
      userList: [],
      addDialogVisible:false,
      //添加用户表单
      addUsersFrom:{
          uname:'',
          upwd:'',
          email:'',
          mobile:''
      },
      //添加用户表单验证规则
      addUsersRules:{
          uname: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          upwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          email: [
             { validator: rulesEmail, trigger: 'blur' }
          ],
          mobile: [
             { validator:rulesMobile, trigger: 'blur' }
          ],
     
      }

      
    
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
    yesAddUser(){
      console.log(this.$refs.addUserRef.$el);
    },
    //确定的时候验证全部表单
     yesAddUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('成功!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
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
