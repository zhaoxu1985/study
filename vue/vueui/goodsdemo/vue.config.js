
module.exports={
  lintOnSave: false,

  devServer:{
      //端口号
      port:3000,
      //自动打开浏览器
      open:true,
      disableHostCheck: true,
      proxy: 'http://127.0.0.1:8888/api/private/v1/'
  },
  css: {
    extract: false
  },

    chainWebpack : config=>{
      // production:发布模式
      config.when(process.env.NODE_ENV === 'production',config=>{
        config.entry('app').clear().add('./src/main-prod.js')
          //使用externals设置排除项
          config.set('externals',{
            vue:'Vue',
            'vue-router':'VueRouter',
            element:'ElementUI',
            axios:'axios',
            lodash:'_',
            echarts:'echarts',
            nprogress:'NProgress',
            'vue-quill-editor':'VueQuillEditor'
        })
      }),
      // development:开发模式
      config.when(process.env.NODE_ENV === 'development',config=>{
        config.entry('app').clear().add('./src/main-dev.js')

        config.set('externals',{
          vue:'Vue',
          'vue-router':'VueRouter',
          element:'ElementUI',
          // axios:'axios',
          lodash:'_',
          echarts:'echarts',
          nprogress:'NProgress',
          'vue-quill-editor':'VueQuillEditor'
      })
      })
    } 
}