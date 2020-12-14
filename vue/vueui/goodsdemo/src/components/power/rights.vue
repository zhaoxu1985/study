<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

   <el-card>
       <el-table :data="rightsList" border stripe>
           <el-table-column type="index"></el-table-column>
           <el-table-column label="权限名称" prop="authName"></el-table-column>
           <el-table-column label="路径" prop="path"></el-table-column>
           <el-table-column label="权限等级" prop="level">
               <template v-slot="level">
                   <div>
                       <el-tag v-show="level.row.level==0">一级</el-tag>
                       <el-tag type="success" v-show="level.row.level==1">二级</el-tag>
                       <el-tag type="warning" v-show="level.row.level==2">三级</el-tag>
                   </div>
               </template>
           </el-table-column>
       </el-table>
   </el-card>
</div>
 
</template>

<script>
export default {
   data(){
       return{
           rightsList:[]
       }
   }
    ,
    created(){
       this.getrightsList()
    },
    methods:{
        async getrightsList(){
          let {data:res}=await this.$axios.get('rights/list')
          if(res.meta.status !==200) return this.$message.error('获取权限列表失败')
          this.$message.success('获取权限列表成功!')
          this.rightsList=res.data
          console.log(res);
        }
    }
}
</script>

<style>
.el-card{
  margin-top: 20px;
}
</style>