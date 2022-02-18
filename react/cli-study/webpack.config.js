const path = require('path') //导入了 node.js 中的路径操作模块
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const htmlPlugin = new HtmlWebpackPlugin({ //创建插件实例对象
//     template: `./src/index.html`, //指定要用到的模板文件
//     filename: 'index.html' //指定生成文件的名称，该文件存在于内存中，在目录中不显示
// })
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.jsx'), //入口文件路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'index.js' //输出文件的名称
    },
    // plugins: [htmlPlugin],
    module: {
        // rules: [{
        //         test: /\.css$/,
        //         use: ['style-loader', 'css-loader']
        //     },
        //     {
        //         test: /\.js|.jsx$/,
        //         exclude: /node_modules/,
        //         use: 'babel-loader'
        //     },
        //     {
        //         test: /\.ttf|woff|woff2|eot|svg$/,
        //         use: 'url-loader' //打包处理字符文件的loader
        //     },
        //     {
        //         test: /\.scss$/,
        //         use: ['style-loader',
        //             {
        //                 loader: 'css-loader',
        //                 options: {
        //                     modules: {
        //                         localIdentName: '[path][name]-[hash:5]'
        //                     }
        //                 }
        //             }, 'sass-loader'
        //         ], //打包处理scss文件的loader
        //     }
        // ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示这几个文件的后缀名，可以不写
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
}