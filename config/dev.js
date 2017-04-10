const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function (env) {
    return {
        entry: {
            main: './app/index.js' //Notice that we do not have an explicit vendor entry here
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, '../app')
        },
        resolve: {
            alias: {
                XuntongJSBridge$: path.resolve(__dirname, '../app/qingjs.js')
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    // fallback: "style-loader",
                    use: ['css-loader']
                })
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file-loader'
            }, { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }]
        },
        devServer: {
            contentBase: path.join(__dirname, "../app"),
            compress: true,
            host: '0.0.0.0',
            port: 3005,
            inline: true //文件改动是否自动刷新页面git 
        }
        ,
        plugins: [
            new HtmlWebpackPlugin({
                template: 'app/lib/index.html'
            }),
            new webpack.ProvidePlugin({
                // $: 'webpack-zepto',
                // Zepto: 'webpack-zepto',
                // 'window.Zepto': 'webpack-zepto',
                'moment': 'moment'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            }),
            // new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin("[name].[chunkhash].css")
        ]
    }
}