# _webpack을 사용하기 위한 기본 설치_

![nodejs](http://www.itpaper.co.kr/wp-content/uploads/2017/03/node-js-development-Brillmindz.jpg)

일단 NodeJs를 설치해 주세요!

>[NodeJs 설치링크](https://nodejs.org/ko/download/)

링크로 가서 자기 운영체제에 맞게 다운로드 후에 설치해 주세요.

에디터는 [Atom](https://atom.io/)이나 [Visual Studio Code](https://code.visualstudio.com/)를 추천합니다. <br>
저는 "Visual Studio Code" 위주로 설명 하겠습니다. <br>(줄여서 "vc"라고 하겠습니다.) <br>
[gitBash](https://gitforwindows.org/)를 사용하셔도 좋습니다. 

자 이제 폴더를 하나 만드시고, 그 폴더를 "vc"에 드래그/드랍 해 주세요.<br>
까만화면(터미널)에서 작업을 해야합니다. <br>

Ctrl + `를 누르면 폴더를 드래그/드랍한 경로로 터미널이 열립니다. <br>
(여기서 따옴표는 ESC밑에 있는 녀석입니다.)

    npm init -y

이렇게 입력하시고 엔터를 눌러주세요. <br>
좌측 섹션에 "package.json" 이라는 파일이 생깁니다.

npm 이라는 녀석은 Node Packaged Manager의 약자 입니다. <br>
위에서 NodeJs 설치했으니, npm을 사용하실 수 있는데, npm으로 node_module을 받을 수 있습니다. 그 모듈들을 받기 위해 가장 처음에  "package.json" 파일을 만들어야 한다고 생각하시면 될 것 같습니다.<br>
지금 알아보고 있는 webpack도 node_module 입니다.

"package.json" 설명은 추후에 "package.json" wiki를 따로 만들어서 링크를 걸어 두겠습니다.

이제 웹팩을 깔아보겠습니다. 우선 webpack3.x버전으로 깔아보겠습니다.

    npm i --save-dev webpack@3.x

웹팩을 devDependencies로 설치 합니다. --save-dev가 devDependencies로 설치한다는 뜻 이며, 이 부분은 "package.json" wiki에서 설명 드리겠습니다.

더 많은 것 들을 설치/추가해서 할 수 있지만, 아직은 설정파일도 안 만들었으니 추가 설치는 config 설명 하면서 설치 하겠습니다.






