const {
    resolve,
    join
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ //创建插件实例对象
    template: `./src/index.html`, //指定要用到的模板文件
    filename: 'index.html' //指定生成文件的名称，该文件存在于内存中，在目录中不显示
})
module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolveLoader: { // 配置自定义loader加载
        modules: [
            resolve(__dirname, 'loaders'), 'node_modules'
        ]
    },
    module: {
        rules: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use: [
                'test-loader', {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ],
        }, {
            test: /\.(png|jpg|jpge|webp)$/,
            use: [
                'file-loader'
                // {
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name].[contenthash].[ext]',
                //         outputPath: 'images/'
                //     }
                // }
            ]
        }]
    },
    plugins: [
        htmlPlugin
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示这几个文件的后缀名，可以不写
        alias: {
            '@': join(__dirname, './src'),
        }
    },

}