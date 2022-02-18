const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === "development", (config) => {
      config
        .entry("app")
        .clear()
        .add("./src/main.js");
      //使用externals设置排除项
      config.set("externals", {
        element: "ElementUI",
        vue:'Vue',
        axios:'axios'
      })
     
    }); 
  },
  // configureWebpack: {
  //   // name: name, // 生成html的title
  //   // devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'eval',
  //   extensions: ['.js', '.vue', '.json'],    //这个是匹配扩展名的
  //   resolve: {
  //     alias: {
  //       '@': resolve('src'),
  //       pub: resolve('public'),
  //       lib: resolve('lib')
  //     }
  //   }
  // },
};
