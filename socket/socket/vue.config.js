
module.exports={
    lintOnSave: false,
  
    devServer:{
        //自动打开浏览器
        open:true,
        disableHostCheck: true,
        proxy: 'http://localhost:9000',
    },
    chainWebpack : config=>{
    // development:开发模式
    config.when(process.env.NODE_ENV === 'development',config=>{
        config.entry('app').clear().add('./src/main.js')

        config.set('externals',{
          vue:'Vue',
          vant:'vant',
          axios:'axios',
          socketIo:'socketIo'
        })
      })
    }
}