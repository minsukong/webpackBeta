# _webpack dev와 prod 설정하기#01_

현재 설정에서는 개발버전인지(develop), 배포버전인지(product) 나누지 않았습니다.
```cross-env```를 설치하고, ```node``` 환경변수를 이용해 좀 더 깊이 있게 소스 관리를 해 봅시다!

    npm i --save-dev cross-env

```package.json```파일을 열어 ```scripts```에 아래와 같이 소스를 추가/수정 합니다.
```json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
},
```
- ***"dev"***
    - ```cross-env NODE_ENV=development``` 노드의 환경변수를 ```development```로 설정.
    - ```webpack-dev-server``` 웹팩의 개발서버를 실행하고, ```--open``` 옵션을 사용하여 바로 기본 브라우저에서 개발서버가 열리게 설정하였습니다. ```--hot```은 파일이 수정/저장 되었을 때, 수정된 부분만 실시간으로 새로고침 되는 옵션입니다.([HMR](https://webpack.js.org/concepts/hot-module-replacement/)) ```--inline```을 주면 페이지 전체를 새로고침 합니다.
    - webpack.config 파일에 ```devServer```를 아래와 같이 추가 가능합니다.
```
devServer: {
    hot: true,
    inline: true,
    port: 4000,
    compress: true,
    publicPath: '/dist/',
    contentBase: path.join(__dirname, '/dist/'),
}
```
- ***"build"***
    - ```cross-env NODE_ENV=production``` 노드의 환경변수를 ```production```로 설정.
    - ```webpack``` 웹팩을 실행하고 옵션으로 ```--progress```를 줬는데 이는 터미널에 빌드가 퍼센트로 표시되며, 빌드가 진행되게 하는 옵션입니다. ```--profile```옵션을 추가하면, 좀 더 상세한 빌드 상황을 체크 할 수있습니다.
    - ```--hide-modules``` 사용하여 모듈에 대한 정보를 숨겼습니다.
- ***[webpack cli 더 많은 옵션](https://webpack.js.org/api/cli/)***

## NODE_ENV 사용해 보기

webpack.config에 아래와 같이 소스맵 옵션을 추가합니다.

    devtool: '#eval-source-map'

```#eval-source-map```을 추가하면 빌드시엔 생성되지 않습니다. 개발서버가 실행 됬을 때 사용하는 소스맵 입니다. 이렇게 개발을 위한 소스맵을 기본적인 옵션으로 설정 하고 아래와 같이 ```production```일 때는 아래와 같이도 사용 할 수 있습니다.
```javascript
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
}
```
```production``` 일때 ```#source-map```이 생성 되게 설정을 해봤습니다.
```vue.js```는 기본적으로 아래와 같이 사용합니다.
```javascript
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
```
- ***webpack.DefinePlugin*** - 컴파일할 코드에서 특정 문자열을 설정 값으로 치환
- ***webpack.optimize.UglifyJsPlugin*** - 소스 난독화
- ***webpack.LoaderOptionsPlugin*** - 각 로더들의 옵션, 여기서는 압축(minimize)

위 내용들은 아주 기본적인 사용 방법이고, 실제로는 더 복잡하고 다양하게 환경변수를 사용 할 수있습니다.

