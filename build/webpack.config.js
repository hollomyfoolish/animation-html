const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir){
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('static/'),
                to: resolve('dist/static/'),
                toType: 'dir'
            }
        ])
    ]
}