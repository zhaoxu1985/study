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
        vueRouter:'vueRouter',
        axios:'axios'
      });
    });
  },
};
