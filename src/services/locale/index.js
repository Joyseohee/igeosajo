import department from "./department";
import employee from "./employee";

//다국어 처리에 필요한 모듈을 모두 import 하고, locale 객체로 합쳐주어야 합니다.
const locale = {
    ...department,
    ...employee
}

// 합친 Local 객체에서 언어별로 설정된 키값을 추출하는 함수입니다.
// 각 local 파일안에는 ko, en 등 미리 설정한 언어 타입별로 값을 추출할 수 있습니다.
const setUpLocale = (lang) => {
    const titles = Object.keys(locale);
    return titles.reduce((newLocale, title)=>{
        const titleObj = locale[title];
        newLocale[title] = titleObj[lang];
        return newLocale;
    }, {})
}

// 언어별로 추출한 객체값을 export 합니다.
export default {
    en: setUpLocale("en"),
    ko: setUpLocale("ko"),
    ja: setUpLocale("ja")
};