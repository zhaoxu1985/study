module.exports={
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [

            // 增加新的loader
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader']
            },
            
        ]
    },
}