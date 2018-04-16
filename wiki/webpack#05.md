# _webpack Babel_

먼저 세팅 부터하고, 시작하려 합니다. 아래의 npm을 설치해 주세요.

    npm i --save-dev babel-core babel-loader babel-preset-env

- ***babel-core*** - 바벨의 코어
- ***babel-loader*** - webpack 바벨로더
- ***babel-preset-env*** - es2015, es2016, es2017, latest를 대체하는 npm

설치 후 아래와 같이 ```babel-loader```를 ```webpack.config.js```파일에 추가 합니다.

```javascript
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
            /* babel-loader 추가 */
            {
                test: /\.js$/,
                include: path.resolve(__dirname),
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
            /* babel-loader 추가 */
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
```
위와 같이 ```option```에서 ```presets```의 설정을 브라우저의 마지막 2버전과, IE9까지 타겟으로 설정하고, 디버그와 modules 옵션을 설정 하였습니다. 

```modules : false```는 [tree shaking](https://webpack.js.org/guides/tree-shaking/)을 사용하는 옵션 입니다. 번들링시 사용되지 않는 코드를 삭제하여 파일 크기를 줄입니다.

config 파일이 복잡해 지는 것을 막기위해, 바벨의 ```option```값을 
```.babelrc``` 파일로 옮기겠습니다.


    ├── node_modules     
    ├── index.html
    ├── webpack.config.js
    ├─┬ src
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ ├─┬ css
    │ │ ├── reset.css
    │ │ └── common.css
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ └── index.js
    ├── .babelrc <-- 추가
    ├── package-lock.json
    └── package.json

```json
{
    "presets": [
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
```

config에 있는 바벨 ```option```은 지우셔도 됩니다.

_자 이제 세팅이 완료 되었으니 테스트를 해보겠습니다._ <br>
```index.js``` 파일을 열어 아래와 같이 추가합니다.

```javascript
let test = () => {
    return console.log('working!')
}
```
```let```과 ```=>``` 함수를 사용 했습니다.

번들링 하면 ```ES5```로 번들링된 것을 확인 할 수 있습니다.

```promise``` 같은 것을 사용 할 때는 ```babel-polyfill```을 설치 후에 아래와 같이 entry에서 사용하면 됩니다.
```javascript
    module.exports = {
    entry: {
        'index' : ['babel-polyfill','./src/index.js']
    },
    ...
```