# _webpack config 기본적인 설정_

웹팩 기본 설정에 대해 알아 보겠습니다.

우선 작업 하던 폴더의 구조를 보면,

    ├── node_modules <-- npm 으로 설치한 것들은 여기에
    ├── package-lock.json
    └── package.json

이렇게 되있네요.(이렇게 안되 있으면...이전 편으로...)

"index.html", "webpack.config.js" 파일을 추가해 주세요.

    ├── node_modules      
    ├── index.html <-- 추가
    ├── webpack.config.js <-- 추가
    ├── package-lock.json
    └── package.json   

"index.html" 파일에 다음 소스를 복사/붙여넣기 해주세요.

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
    
    <script src="./dist/bundle.js"></script>
</body>
</html>
```

"webpack.config.js" 파일에 다음 소스를 복사/붙여넣기 해주세요. <br>
"webpack.config.js" 파일이 웹팩 설정 입니다.

``` javascript
const path = require('path')

module.exports = {
    entry: {
        'index' : './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

"src" 폴더를 만들고, 그 안에 "index.js"를 만듭니다.

    ├── node_modules      
    ├── index.html
    ├── webpack.config.js
    ├─┬ src <-- 추가
    │ └── index.js <-- 추가
    ├── package-lock.json
    └── package.json

"./src/index.js" 파일에 다음 소스를 복사/붙여넣기 해주세요.
``` javascript
console.log("webpack!!")
```

"require"로 모듈을 불러와서 쓸 수 있습니다."path"는 경로를 설정 할 때 쓰입니다.<br>
(path를 자세히 알고 싶으면 콘솔로 찍어보세요.)

"entry"는 웹팩으로 번들링 할 소스들의 시작점 입니다.<br>
"output"는 웹팩으로 번들링 된 파일 입니다.

"entry"는 시작 ---> "output"은 결과 이렇게 되겠네요.

"__dirname" 현재 폴더, "resolve"에 경로를 설정 했습니다. "join"으로도 쓸 수 있습니다.

"join"은 이전 인수와 연결하지만 "resolve"는 루트 디렉토리로 간주하고 모든 이전 경로를 무시합니다 "./" cd 경로에 각 인수를 사용하여 실행 한 결과로 생각해 보겠습니다.

    path.join('/21323', '/a', '/b') // Outputs '/21323/a/b'

    path.resolve('/21323', '/a', '/b') // Outputs '/b'

위에 아웃풋 결과를 보시면 이해가 되실 것 같습니다.

"path.resolve(__dirname, 'dist')"를 해석하면, './dist/bundle.js' 입니다.<br>
"package.json"  파일을 열어 "scripts" 부분을 아래와 같이 해주세요.
``` javascript
"scripts": {
    "build": "webpack"
},
```

콘솔 창에 아래와 같이 입력해보세요.
    
    npm run build

"npm run" + "name" 을 콘솔에 입력하면 그에 해당하는 "scripts"가 실행 됩니다. 현재는 "build"를 사용했는데, 작업경로의 npm에서 "webpack"을 실행하게 했습니다. 그러니까 실제로 실행되는 건 "webpack"입니다.

만약 글로벌로 웹팩을 설정했다면,
콘솔에 webpack으로 입력을 하셔도 됩니다.

"dist"폴더가 생성되고 아래와 같이 "dist"안에 "bundle.js"가 추가되었습니다.

    ├─┬ dist <-- 추가 됨
    │ └── bundle.js <-- 추가 됨
    ├── node_modules     
    ├── index.html
    ├── webpack.config.js
    ├─┬ src
    │ └── index.js
    ├── package-lock.json
    └── package.json

"index.html" 파일을 실행하고 브라우저에서 콘솔창을 보시면 "webpack!!"이 나옵니다.

만약 오타가 있거나, 제데로 설정이 안되면 번들링 되지 않습니다.

수정 할 때 마다 번들링을 해야 하는 수고를 덜기 위해서 아래와 같이 
"package.json" 파일의 "scripts"를 수정해 보세요.

``` javascript
"scripts": {
    "build": "webpack",
    "dev": "webpack --watch"
},
```

이제 콘솔창에 "npm run dev"를 실행하면, "dev" 부분이 실행 됩니다.
"webpack --watch"는 "webpack" 실행이 끝나는지 않고, 계속 파일들을 감지 하고 있다가, 소스나 파일이 수정되면 자동으로 번들링 됩니다.

똑같이 웹팩을 사용하고 있지만, "--watch"를 사용해 봤습니다.
옵션은 왓치 외에도 많이 있지만, 추후에 알아보도록 하겠습니다.

왓치를 그만하고 싶으면, 콘솔창에서 Ctrl + c 하시면 됩니다.

아주 기초적인 설정만 알아 봤습니다. <br>
다음은 실제로 작업시에는 어떤 설정 및 설치가 필요한지 알아보겠습니다.