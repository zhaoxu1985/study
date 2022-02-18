<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">
        商品列表
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        :closable="false"
        title="添加商品"
        type="info"
        center
        show-icon
      />

      <el-steps
        align-center
        :space="200"
        :active="Number(activeIndex)"
        finish-status="success"
      >
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>
      <el-form
        ref="addGoodsFormRef"
        :model="addGoodsForm"
        :rules="rules"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :before-leave="tabClickChange"
          tab-position="left"
          @tab-click="clickTabParams"
        >
          <el-tab-pane
            label="基本信息"
            name="0"
          >
            <el-form-item
              label="商品名称"
              prop="goods_name"
              label-width="100px"
            >
              <el-input v-model="addGoodsForm.goods_name" />
            </el-form-item>
            <el-form-item
              label="分类"
              prop="goods_cat"
              label-width="100px"
            >
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="cateList"
                :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_id',children:'children'}"
                @change="cateChange"
              />
            </el-form-item>
            <el-form-item
              label="价格"
              prop="goods_price"
              label-width="100px"
            >
              <el-input
                v-model="addGoodsForm.goods_price"
                type="number"
              />
            </el-form-item>
            <el-form-item
              label="数量"
              prop="goods_number"
              label-width="100px"
            >
              <el-input
                v-model="addGoodsForm.goods_number"
                type="number"
              />
            </el-form-item>
            <el-form-item
              label="重量"
              prop="goods_weight"
              label-width="100px"
            >
              <el-input
                v-model="addGoodsForm.goods_weight"
                type="number"
              />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane
            label="商品参数"
            name="1"
          >
            <el-form-item
              v-for="(item,i) in manyForm"
              :key="i"
              :label="item.attr_name"
              label-width="100px"
            >
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(val,j) in item.attr_vals"
                  :key="j"
                  border
                  :label="val"
                />
              </el-checkbox-group> 
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2"
          >
            <el-form-item
              v-for="(item, index) in onlyForm"
              :key="index"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3"
          >
            <!-- 要上传的地址 -->
            <el-upload
              class="upload-demo"
              :action="url"
              :headers="headerObject"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :on-success="oploadSuccess"
            >
              <el-button
                size="mini"
                type="primary"
              >
                点击上传
              </el-button>
            </el-upload>

            <el-dialog

              title="提示"
              :visible.sync="picDialogVisible"
              width="50%"
            >
              <img
                :src="previePath"
                width="100%"
                alt=""
              >
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4"
          >
            <quill-editor
              v-model="addGoodsForm.goods_introduce"
              :options="options"
            />

            <el-button
              type="primary"
              class="btn"
              @click="addGoods"
            >
              添加商品
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex:0,

        //分类数据
        cateList:[],
        //添加商品的表单数据
            addGoodsForm:{
                goods_name:'', //商品名称
                goods_cat:'', //以为','分割的分类列表
                goods_price:0, //价格
                goods_number:0, //数量
                goods_weight:0, //重量
                goods_introduce:'', //介绍
                pics:[],
                attrs:[]  //商品的参数（数组），包含 `动态参数` 和 `静态属性`
            },
            // 动态参数
            manyForm:[],
            //静态属性
            onlyForm:[],
            options:{
              placeholder:'请输入商品介绍...'
            },
            //图片列表?
            
               fileList:[],
            //上传图片配置

            url:'http://127.0.0.1:8888/api/private/v1/upload',
            headerObject:{
              Authorization:window.sessionStorage.getItem('token')
            },

            //  预览图片的对话框
            previePath:'',
            picDialogVisible:false,
           
            
           //规则
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
    computed:{
      catId(){
        if(this.addGoodsForm.goods_cat.length == 3){
          return this.addGoodsForm.goods_cat[2]
        }
        return null
      }
    },
    created(){
      this.getCateList()
    },
    methods:{
      async getCateList(){
        let {data:res} = await this.$axios.get('categories')
        if(res.meta.status!=200) return this.$message.error('获取参数列表失败!')
        this.$message.success('获取参数列表成功!')
        this.cateList=res.data
     },
     //分类选择触发事件
     cateChange(val){
       console.log(this.addGoodsForm);
       
     },

     //切换标签被触发
     tabClickChange(activeName,oldActiveName){
          if(oldActiveName=='0' && this.addGoodsForm.goods_cat.length !=3){
            this.$message.error('请选择分类! 并且为三级分类!')
             return false
          }
     },
     async clickTabParams(){
       if(this.activeIndex == 1){
         let {data:res} = await this.$axios.get(`/categories/${this.catId}/attributes`,{
           params:{
             sel:'many'
           }
         })
        if(res.meta.status!=200)return this.$message.error('获取失败!')
       res.data.forEach(element => {
          element.attr_vals=element.attr_vals.length == 0 ? [] : element.attr_vals = element.attr_vals.split(',')
          
       });
       this.manyForm = res.data
        
       }else if(this.activeIndex==2){
         let {data:res} = await this.$axios.get(`/categories/${this.catId}/attributes`,{
           params:{
             sel:'only'
           }
         })
         console.log(res);
        if(res.meta.status!=200)return this.$message.error('获取失败!')
        this.onlyForm = res.data
      }
     },
     //点击图片名字触发
     handlePreview(file){
       this.previePath=file.response.data.url
       this.picDialogVisible=true
     },
    //  关闭按钮
     handleRemove(file){
       const filePath = file.response.data.tmp_path
       console.log(filePath);
       let i = this.addGoodsForm.pics.findIndex(item=>{
         return item.pic==filePath
       })
       this.addGoodsForm.pics.splice(i,1)
     
     },
     //上传成功的事件
     oploadSuccess(res){
       console.log(res);
       const pic = {pic:res.data.tmp_path}
       this.addGoodsForm.pics.push(pic)
    
     }
     ,
     //添加商品按钮
     addGoods(){
      
       this.$refs['addGoodsFormRef'].validate( async bool=>{

         if(!bool) {
           this.activeIndex='0'
           return this.$message.error('请填写必要的信息!!!')
        }
        let data = _.cloneDeep(this.addGoodsForm)
        data.goods_cat=data.goods_cat.join(',')
        //处理动态参数
        this.manyForm.forEach(item => {
            const data=
              {
                attr_id:item.attr_id,
                attr_value:item.attr_vals.join(',')
              }
            
            this.addGoodsForm.attrs.push(data)
        });

        //处理静态参数
        this.onlyForm.forEach(item=>{
          const data=
            {
              attr_id:item.attr_id,
              attr_value:item.attr_vals
            }
          
          this.addGoodsForm.attrs.push(data)
        })
        data.attrs=this.addGoodsForm.attrs

        console.log(data);
        let {data:res} = await this.$axios.post('/goods',data)
        console.log(res);
        if(res.meta.status!=201) return this.$message.error(res.meta.msg)
        this.$message.success('添加商品成功!')
        this.$router.push('/goods')
   
       })
     },
     
    }
}
</script>

<style scoped>
  .el-steps{
    margin-top: 20px;
  }
 .el-form{
   margin-top: 30px;
 }
 .el-input{
    width: 500px;
 }
 .el-checkbox{
   margin: 0 10px 0 0 !important;
 }
 .btn{
   margin-top: 20px;
 }
</style>