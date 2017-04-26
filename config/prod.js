const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./dev.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, '../dist')
        },
        plugins: [
            
            new CopyWebpackPlugin([
                { from: 'app' },
            ], {
                    ignore: ['*.js', '*.map', 'assets/**/*', 'bower_components/**/*']
                }
            ),
            new webpack.optimize.UglifyJsPlugin({
                compress:false
            }),
        ]
    })
}