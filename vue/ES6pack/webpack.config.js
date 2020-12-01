const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入vue单文件支持插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html'
})
module.exports={
    mode:'development',
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path: path.join(__dirname,'./dist'),//输出文件的存放路径
        filename:'bundle.js' //输出文件的名称
    },
    plugins:[htmlPlugin,new VueLoaderPlugin()],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {
                test:/\.jpg|gif|png|bmp|ttf|eot|svg|woff|woff2$/,
                use:'url-loader'
            },
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
        ]
    },
    resolve:{
        alias:{
        "vue$":"vue/dist/vue.js"
        }
    }
}