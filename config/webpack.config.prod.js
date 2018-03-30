const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        'common': './src/common.js',
        'main': './src/main.js',
        'sub': './src/sub.js',
        'vendors': [
            'jquery',
            'ScrollMagic',
            'debug.addIndicators',
            'slick',
            'matchMedia', //media mach
            'matchMedia.addListener', //media mach ie9 polyfill            
            'objectFitPolyfill', // video full polyfill
            'pace' // loading
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            "jquery": path.resolve(__dirname, 'src/vendors/jquery-2.2.4.min.js'),
            "ScrollMagic": path.resolve(__dirname, 'src/vendors/ScrollMagic.min.js'),        
            "debug.addIndicators": path.resolve(__dirname, 'src/vendors/debug.addIndicators.min.js'),
            "slick": path.resolve(__dirname, 'src/vendors/slick.min.js'),
            "matchMedia": path.resolve(__dirname, 'src/vendors/matchMedia.js'),
            "matchMedia.addListener": path.resolve(__dirname, 'src/vendors/matchMedia.addListener.js'),
            "objectFitPolyfill": path.resolve(__dirname, 'src/vendors/objectFitPolyfill.basic.min.js'),
            "pace": path.resolve(__dirname, 'src/vendors/pace.min.js')
        },
    },
    module: {
        rules: [
            { 
                test: /\.(html)$/,
                include: path.join(__dirname),
                use: {
                    loader: 'html-loader',
                    options: {
                    interpolate: true
                    }
                }
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname),
                exclude: [/(node_modules)|(dist)/, path.resolve(__dirname, "./src/vendors")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "env", 
                                {
                                    "targets": {
                                        "browsers": ["last 2 versions", "ie 9"]
                                        },
                                    "debug" : true,
                                    "modules" : false
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test:/\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader?outputStyle=compact']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use : [
                    'file-loader?name=/assets/images/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '/assets/media/[name].[ext]'
                    }  
                  }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common', 'vendors']
        }),
        new ExtractTextPlugin('assets/css/[name].css'),
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks : ['main', 'common', 'vendors']
        }),
        new HtmlWebpackPlugin({
            template: './about.html',
            filename: './sub/about.html',
            chunks : ['sub', 'common', 'vendors']
        }),
        new HtmlWebpackPlugin({
            template: './career.html',
            filename: './sub/career.html',
            chunks : ['sub', 'common', 'vendors']
        }),
        new HtmlWebpackPlugin({
            template: './solution.html',
            filename: './sub/solution.html',
            chunks : ['sub', 'common', 'vendors']
        }),
        new HtmlWebpackPlugin({
            template: './technology.html',
            filename: './sub/technology.html',
            chunks : ['sub', 'common', 'vendors']
        }),
        new CleanWebpackPlugin('dist')
    ]
}