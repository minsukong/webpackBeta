const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        'index' : './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use : [{
                    loader : 'file-loader',
                    options : {
                        name: '[path][name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('src/css/style.css'),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin('dist')
    ]
}