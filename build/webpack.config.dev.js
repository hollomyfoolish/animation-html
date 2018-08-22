const base = require('./webpack.config')

module.exports = Object.assign({
    mode: 'development',
    devtool: 'inline-source-map'
}, base)