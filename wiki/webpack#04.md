# _webpack config 세팅_

웹팩으로 이전 시간에는 가장 기본이 되는 부분만 설명 하였습니다. <br>
이번에는 실전 세팅에 대해 알아보겠습니다.

"plugins"을 먼저 세팅하고, 시작하려 합니다. 아래의 플러그인을 설치해 주세요.

    npm i --save-dev html-webpack-plugin clean-webpack-plugin

"html-webpack-plugin"은 html파일도 번들링 해서 output 해줍니다.<br>
"clean-webpack-plugin"은 매번 번들링 파일을 지우는 수고를 덜게 해줍니다.<br>
기존 번들링 파일을 삭제하고, 새로운 파일로 번들링 됩니다.

```javascript
    const webpack = require('webpack')
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const CleanWebpackPlugin = require('clean-webpack-plugin')

    module.exports = {
        entry: {
            'index' : './src/index.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CleanWebpackPlugin('dist')
        ]
    }
```
"output" 부분의 "[filename]"을 "[name]"으로 하게되면 원래 파일 이름으로 번들링 됩니다. <br>
"plugins" 부분을 추가 했습니다.

## loader
웹팩은 모든 것 들을 모듈로 처리합니다.<br>
그렇기 때문에 어떤 파일을 읽기 위해 "loader"가 필요합니다. 순서대로 알아보겠습니다.

일단 "file-loader"를 설치해 보겠습니다.

    npm i --save-dev file-loader

파일 경로는 다음과 같이 만들고, 아무 이미지나 준비해서 넣어 줍니다.<br>
(아무 이미지나 상관없습니다.)

    ├── node_modules     
    ├── index.html
    ├── webpack.config.js
    ├─┬ src
    │ ├─┬ images <-- 추가
    │ │ └── what-is-webpack.png <-- 추가
    │ └── index.js
    ├── package-lock.json
    └── package.json

"index.html"을 열어서 아래와 같이 이미지를 하나 추가해 보겠습니다. 
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack-basic</title>
</head>
<body>
    <img src="${require("./src/images/what-is-webpack.png")}" alt="">
</body>
</html>
```
html 파일에 "img" 태그를 추가 하고, "src"에 "require"로 경로를 적어 주었습니다.

"webpack.config.js"를 열어 아래와 같이 "module", "rules" 부분을 추가해 주세요.

```javascript
    const webpack = require('webpack')
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const CleanWebpackPlugin = require('clean-webpack-plugin')

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
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CleanWebpackPlugin('dist')
        ]
    }
```
"rules"에 로더들을 추가 할 수있습니다. 현재 위 소스에서는 "test"에 정규식으로 <br>
"/\.(jpe?g|png|gif|svg)$/" 각 입력된 파일들을 만날 시, "file-loader"를 사용하여 로드를 하고,<br>
"options"에서 파일 위치와 이름을 "name: '[path][name].[ext]'" 이렇게 정의 하였습니다. <br>
번들링 후 "dist" 폴더를 열어보시면, 이미지와 "index.html" 파일 등 설정한 경로로 잘 들어 간 것을 확인 할 수 있습니다. 

또 로더에서는 사용하지 않는 자원들은 번들링 되지 않습니다.

다음은 "css"를 읽어와 보겠습니다. <br>
파일 경로를 다음과 같이 만들어주세요.

    ├── node_modules     
    ├── index.html
    ├── webpack.config.js
    ├─┬ src
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ ├─┬ css <-- 추가
    │ │ └── common.css <-- 추가
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ └── index.js
    ├── package-lock.json
    └── package.json

"common.css"를 열어 아래와 같이 입력합니다.

    body {
        background-color: #000;
    }

"src/index.js"를 열어 "common.css"를 불러와 주세요.

    require('./css/common.css')

***번들링을 시도하면 번들이 되지 않습니다!***
css파일을 로드하려면 로더가 필요합니다.<br>
아래와 같이 "style-loader","css-loader"를 설치합니다.

    npm i --save-dev style-loader css-loader

"webpack.config.js"를 열어 아래와 같이 소스를 추가/수정 합니다.

```javascript
    const webpack = require('webpack')
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const CleanWebpackPlugin = require('clean-webpack-plugin')

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
                    test: /\.css$/,
                    use: [
                         {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
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
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CleanWebpackPlugin('dist')
        ]
    }
```
"css-loader" 로더는 css 파일을 읽고, "style-loader"는 html을 실행하면,
style태그로 css를 넣어 줍니다. 

번들링 된 파일을 열어 보시면  ```<head>```에 ```<style>```이 추가 되어 있습니다.
``` html
<style type="text/css">body {
    background-color: #000;
}</style>
```
번들링된 "index.js"를 확인 해 보면 css에 적은 내용이 모듈화 돼있는 것을 확인 할 수 있습니다. <br>
"css-loader"의 옵션으로 "url: false"를 주었는데, 이렇게 하게되면 번들링 파일을 기준으로 경로가 변경 됩니다.<br>
해당옵션을 주지 않으면 css 파일에서 "../images/what-is-webpack.png" 이런 결과를 원해도 "src/images/what-is-webpack.png" 이런식으로 번들링되서 이미지를 찾지 못 합니다.

css를 하나의 파일로 합쳐서 ```<link>```로 불러오는 방법을 알아보겠습니다.<br>
이번엔 파일 경로를 다음과 같이 만들어주세요. reset.css를 추가하겠습니다.

    ├── node_modules     
    ├── index.html
    ├── webpack.config.js
    ├─┬ src
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ ├─┬ css
    │ │ ├── reset.css <-- 추가
    │ │ └── common.css
    │ ├─┬ images
    │ │ └── what-is-webpack.png
    │ └── index.js
    ├── package-lock.json
    └── package.json

"reset.css" 파일을 열어서 아래와 같이 추가합니다.

    body{
        margin: 0;
        padding: 0;
    }
    
"common.css" 파일을 열어서 아래와 같이 추가합니다.

    @import './reset.css';

"common.css"에서 "reset.css"를 불러왔습니다.

"extract-text-webpack-plugin"을 설치해주세요.

    npm i --save-dev extract-text-webpack-plugin

"webpack.config.js"를 열어 아래와 같이 소스를 추가/수정 합니다.

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
                    test: /\.css$/,
                    use:ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false
                                }
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
```
"ExtractTextPlugin"을 사용하면 css 파일들을 하나의 파일로 번들링 합니다.

번들링을 하면, ```<link>```태그가 <br>
"index.html"에 삽입 되 있는 걸 확인 할 수 있습니다. 경로는 'src/css/style.css'로 설정 했습니다.

번들된 "style.css"를 열어보면, css의 소스가 합쳐져 있음을 확인 할 수 있습니다.

## css에서 cdn url 사용 방법과 sass 사용 방법

css에서 cdn url을 사용하면 오류가 납니다. cdn의 경우는 약간의 설정이 필요합니다.

"resolve-url-loader"를 설치해 보겠습니다.

    npm i --save-dev resolve-url-loader

"webpack.config.js"를 열어 아래와 같이 소스를 추가/수정 합니다.

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
                    test: /\.css$/,
                    use:ExtractTextPlugin.extract({
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
```
"resolve-url-loader"은 url 경로를 유지한채 번들링이 되게 도와줍니다.

"common.css"를 열어 아래와 같이 소스를 추가/수정 합니다.

``` css
@import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');

body {
    background-color: #000;
    background-image: url('../images/what-is-webpack.png');
}
```
번들링 해보면, 오류없이 잘 번들이 되서 나옵니다.

"sass"를 사용하기 위해선 "node-sass", "sass-loader"를 설치해야합니다.
    npm i --save-dev node-sass sass-loader

"webpack.config.js"를 열어 아래와 같이 소스를 추가/수정 합니다.

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
                    use:ExtractTextPlugin.extract({
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
```
여기서는 scss,css를 읽었을 때 로더가 읽게 했습니다.
css로 되있는 파일을 scss로 바꾸고 테스트 해봅니다.

우선 "src/index.js"에서 파일 확장자를 변경합니다.

    require('./css/common.scss')

"common.css"를 "common.scss"로 바꾼 후 아래와 같이 코드를 변경 합니다.

``` css
@import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');

body {
    background-color: #000;
    background-image: url('../images/what-is-webpack.png');

    &:hover{
        background-color: rgb(255, 0, 0);
    }
}
```
```&:hover``` 이런식으로 scss를 써봤습니다.

번들링을 해보면 "common.scss"가 "style.css"로 컴파일이 됬음을 확인 할 수 있습니다.

수고하셨습니다~ <br>
지금 까지 세팅한 파일을 아래에 링크에서 받으실 수 있습니다.

[Git Repository](https://github.com/jsStudyGroup/webpackBeta/tree/master/webpack%2304-config)




