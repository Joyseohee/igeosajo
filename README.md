# WEHAGO UI Starter
본 프로젝트는 위하고 UI 프로젝트를 시작하기 위한 기본적인 설정을 안내하기 위해 제작되었습니다.


*Notice*
1. 본 프로젝트는 CRA를 통해 생성되었으며, React 17버전에서 사용할 수 있도록 설정되어 있습니다.<br/>
루나 컴포넌트를 사용하는 경우 17버전에서 정상동작 하지 않을 수 있으므로, 관련 문제 발생시 React 버전을 낮추십시오.

2. 개발 환경에 따른 global 변수와 script 분기 설정이 되어 있습니다. 자세한 내용은 아래에서 안내합니다.

3. 웹팩 등 환경설정을 위한 eject 처리가 되어 있습니다.


## Luna-Rocket 설정
---
### develop
- 프로젝트 설정 방법

1. 최상단 index.js에 같은 위치에 Main.js를 만들어 아래와 같은 코드를 넣어줍니다

```javascript
import React from 'react';
import PropTypes from 'prop-types'

if (!React.PropTypes) {
  React.PropTypes = PropTypes
}
```

2. 최상단 index.js에서 App.js 를 호출하기 전에 Main.js를 import 해줍니다 (순서 중요!!)

```javascript
import './Main'
import App from './App';
```

## 접속 방법
---

- 개발기로 접근하는 경우 : ip로 직접 접근하는 경우, 접속이 불가할 수도 있습니다.
  이를 우회하기 위해 호스트를 변경하여 사용합니다.

- react-scripts is not recognized as an internal or external command 에러가 발생하면 react-scrips를 전역으로 설치해 줍니다. [npm install -g react-scrips]

<br/>
<em><변경방법></em>

윈도우 : C:\windows\system32\drivers\etc\hosts
<br/>
맥 : /private/etc/hosts

파일을 열고 접속할 ip 주소와 호스트 문자열을 매핑합니다.

예시)

127.0.0.1 local.wehago.com

접속시는 http://local.wehago.com:[port번호] 로 접근하면 됩니다.

- 운영기로 접근하는 경우 : 개발기와 동일하게 호스트를 변경하여 사용합니다.

## 빌드 환경 분기
---
운영, 개발 등 원하는 환경으로 빌드 및 구동을 시킬 수 있는 설정입니다.

config/buildConfig.js 파일에서 원하는 동작 환경을 설정할 수 있습니다.

```Javascript
    const buildConfig = {

        // 개발기 관련 설정
        development: {
            indexHtml: "index.dev.html",
            buildFolderName: "build-development",
        },

        // 운영기 설정
        production: {
            indexHtml: "index.html",
            buildFolderName: "build-production",
        },

        // 로컬설정
        local: {
            indexHtml: "index.dev.html",
            buildFolderName: "build-development",
        },

    };
```

indexHtml은 진입점으로 사용할 html 파일 이름,

buildFolderName은 빌드한 목적물이 담길 폴더명입니다.

indexHtml 파일은 public 폴더 아래에 생성하십시오.

필요한 경우 특정 키값을 지정하여 위의 파일에 객체를 추가하세요.

``` 
    REACT_APP_DEPLOY_TYPE=development&& node scripts/start.js
```
지정한 키값은 package.json 파일에 정의된 scripts 항목에 process.env로 전달하면 됩니다.

(위의 예시에선 development가 전달되고 있습니다.)

*Windows, Linux 환경에서 실행 변수의 설정의 차이로 run-script-os 라이브러리를 사용하고 있습니다.

<사용법>

```bash
    "start_dev": "run-script-os",
    "start_dev:windows": "set REACT_APP_DEPLOY_TYPE=development&&node scripts/start.js",
    "start_dev:linux:darwin": "REACT_APP_DEPLOY_TYPE=development nodescripts/start.js",
```

위에서 보이는것과 같이 먼저 npm run(...) 으로 실행된 명령어에는 run-script-os를 정의합니다.

그리고 아래에 :windows, :linux:darwin과 같이 개발환경별로 변수를 설정하는 구문을 적어주면,

npm run 명령 수행시 해당 라이브러리에서 실행 환경과 맞는 명령어를 찾아 실행시킵니다.

이렇게 명령 실행시 process.env로 넘어간 변수는 config/paths에서 분기되어 실행 환경에 맞는 진입점으로 설정됩니다.

(빌드의 경우에는 scripts/build 파일에서 빌드 폴더 생성시 환경에 맞는 진입점 파일을 필터링 하도록 처리)

<br/>
<br/>

## 전역 변수 설정
---
환경 변수에 맞게 전역 변수를 분기시킬 수 있는 설정입니다.

global/index.js 에서 만든 설정 파일을 import 시킵니다.

설정 파일을 만들때는 REACT_APP_DEPLOY_TYPE 으로 전달한 변수명과 동일하게 만들어야 합니다.

```Javascript
    import production from './production';
    import development from './development';
    import local from './local';

    const env = { production, development, local };

    export default env[process.env.REACT_APP_DEPLOY_TYPE];
```

import한 파일 중에 현재 실행중인 환경과 동일한 파일이 있으면 해당 파일만 export 합니다.

설정 파일에 있는 키값은 다른 파일과 동일하게 사용하십시오.

예제)
```Javascript
    // development.js
    export default {
        wehago_url: `http://dev.wehago.com`,
        static_backend: `http://dev.wehago.com`,
        static_storage: `https://static.wehago.com`,
    };
```

```Javascript
    // production.js
    export default {
        wehago_url: `https://www.wehago.com`,
        static_backend: `https://www.wehago.com`,
        static_storage: `https://static.wehago.com`
    }
```

모든 키값을 동일하게 사용해야 global 파일을 동일한 인터페이스로 사용할 수 있습니다.

<br/>
<br/>

## 다국어처리
---

다국어 처리는 react-intl 라이브러리를 사용합니다.

locale 폴더 밑에 다국어 파일을 만들고, 키값안에 언어별로 번역된 값을 설정하십시오.

```Javascript
    // department.js => 부서에 관한 다국어 파일

    export default {
        department_name: {
            ko: "부서 이름",
            en: "Department Name",
            ja: "部署名"
        },
        department_location: {
            ko: "부서 위치",
            en: "Department Location",
            ja: "部署の位置"
        },
    }
```


```Javascript
    // locale/index.js

    import department from "./department";
    import employee from "./employee";

    //다국어 처리에 필요한 모듈을 모두 import 하고, locale 객체로 합쳐주어야 합니다.
    const locale = {
        ...department,
        ...employee
    }

```

index.js 파일안에서 import하고 local 객체에 export한 객체들을 합쳐주면 언어별로 객체를 추출할 수 있습니다.

특정 언어 추가시 export 하는 객체에 해당 언어를 추가하십시오.

```Javascript
    // locale/index.js

    // 언어별로 추출한 객체값을 export 합니다.
    export default {
        en: setUpLocale("en"),
        ko: setUpLocale("ko"),
        ja: setUpLocale("ja"),
        
        //프랑스어 객체 추가
        fr: setUpLocale("fr") 
    };
```

위의 경우 다국어 파일안에 프랑스어로 설정된 값이 존재해야 정상적으로 사용할 수 있습니다.

```Javascript
    // department.js => 부서에 관한 다국어 파일

    export default {
    department_name: {
        ko: "부서 이름",
        en: "Department Name",
        ja: "部署名",
        fr: 블라블라~
    },
    department_location: {
        ko: "부서 위치",
        en: "Department Location",
        ja: "部署の位置",
        fr: 블라블라~
    },
}

```


App.js에서 Provider를 통해 다국어 처리 객체를 어디서든 주입받을 수 있습니다.

```Javascript
    import { IntlProvider } from 'react-intl';
    import { getCookie } from './utils' 
    import locale from './locale';

    //다국어 처리를 위한 쿠키값 추출
    const targetLang = getCookie("locale") ||'ko';

    function App() {
        return (
            <IntlProvider locale={targetLang} messages={locale[targetLang]}>
                    <Lang />
            </IntlProvider>
            
        );
    }
```

targetLang은 사용자가 언어 변경시 쿠키에 있는 locale 값에 선택한 언어 정보가 저장되므로, 해당 설정값을 뽑아옵니다.

IntlProvider를 통해 언어에 대한 정보와, 언어별로 추출한 객체에서 쿠키에 있던 언어에 맞는 값을 찾아 전달합니다.


```Javascript
    import React from "react";
    import { injectIntl } from 'react-intl';

    const Lang = ({intl}) => (
        <div style={{margin: 10}}>
            <h1>다국어 예시</h1>
            <span style={{padding: 20, fontWeight: "bold"}}>{intl.formatMessage({id: "employee_info"})}</span>
        </div>
    );
    export default injectIntl(Lang);

```

injectIntl 이라는 함수로 컴포넌트를 래핑해주면 props를 통해 intl 객체를 전달 받을 수 있습니다.

intl 객체에서 id값을 통해 설정한 다국어를 뽑아올 수 있습니다.



























