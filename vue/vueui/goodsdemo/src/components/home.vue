<template>
  <div class="home_box">
    <el-container class="container">
      <el-header class="header_box">
        <div class="header_content_left">
          后台管理
        </div>
        <div class="header_content_right">
          <el-button
            type="danger"
            @click="goback"
          >
            退出
          </el-button>
        </div>
      </el-header>
      <div>
        <el-radio-group
          v-model="isCollapse"
          style=""
        >
          <el-radio-button :label="false">
            展开
          </el-radio-button>
          <el-radio-button :label="true">
            收起
          </el-radio-button>
        </el-radio-group>
      </div>
      <el-container>
        <!-- 左侧区域 -->
        <el-aside
          class="left_box"
          style="border-right:none"
          width=""
        >
          <el-menu
            :default-active="left_router"
            style="border-right:none"
            class="el-menu el-menu-vertical-demo"
            :collapse="isCollapse"
            unique-opened
            router
          >
            <el-submenu
              v-for="item in Menulist"
              :key="item.id"
              :index="item.id+''"
            >
              <template slot="title">
                <i :class="iconId[item.id]" />
                <span slot="title">{{ item.authName }}</span>
              </template>
              <el-menu-item-group
                v-for="items in item.children"
                :key="items.id"
              >
                <el-menu-item
                  :index="'/'+items.path+''"
                  @click="sessionleft_path(items.path)"
                >
                  <i class="el-icon-menu" />{{ items.authName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 左侧区域结束 -->
        <!-- 右侧区域 -->
        <el-main class="right_box">
          <router-view />
        </el-main>
        <!-- 右侧区域结束 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      Menulist:[],
      left_router:'/users',
      iconId:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      }
    }
  },
  created() {
    this.getMenuList()
    this.left_router=window.sessionStorage.getItem('activePath')
   
  },
  methods: {
    goback: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMenuList: async function() {
        
       let {data:res} = await this.$axios.get('/menus')
       if(res.meta.status !== 200) return this.$message.error('错误')
       this.Menulist=res.data
       console.log(res.data);
    },
    sessionleft_path:function(path){
      window.sessionStorage.setItem('activePath','/'+path)
      this.left_router=window.sessionStorage.getItem('activePath')
    }
  }
}
</script>

<style scoped>

.iconfont{
  margin-right: 10px;
  margin-left: 5px;
}
.container {
  width: 100%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.home_box {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.header_box {
  background-color: #363d40;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_content_left {
  font-size: 20px;
  color: #e9edf1;
  font-family: '黑体';
}
.header_content_right {
  
}
.left_box {
  background-color: #ffffff;
}
.right_box {
  background-color: #e9edf1;
}
.el-menu{
  border-right: none;
}
</style>
