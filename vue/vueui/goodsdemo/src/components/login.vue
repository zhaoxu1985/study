<template>
  <div class="box">
    <div class="box_content">
      <div class="box_img">
        <img
          src="../assets/logo.png"
          alt=""
        >
      </div>
      <div class="form_box">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          style="margin:0px"
        >
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              prefix-icon="el-icon-user"
            />
          </el-form-item>

          <el-form-item
            style="width:100%"
            prop="upwd"
            autocomplete="off"
          >
            <el-input
              v-model="ruleForm.upwd"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>

          <el-form-item class="button_box">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              登录
            </el-button>
            <el-button @click="resetForm('ruleForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      ruleForm: {
        name: '',
        upwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let value = await this.$axios.post('/login', {
            username: this.ruleForm.name,
            password: this.ruleForm.upwd
          })

          if (value.data.meta.status == 200) {
            this.$message({
              showClose: true,
              center: true,
              message: '恭喜你，登陆成功!!!',
              type: 'success'
            })
            window.sessionStorage.setItem('token', value.data.data.token)
            this.$router.push('/home')
          } else {
            this.$message({
              center: true,
              showClose: true,
              message: '密码错误或账户名不存在,登陆失败!!!',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box_content {
  width: 450px;
  height: 300px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.box_img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #eee;
  margin-top: -100px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 10px #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.box_img img {
  width: 130px;
  background-color: antiquewhite;
  border-radius: 50%;
}
.form_box {
  width: 95%;
  border: 1px solid balck;
}
.button_box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
input {
  width: 90%;
}
</style>
