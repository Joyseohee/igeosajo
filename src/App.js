import { Route, Routes, HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Test from 'pages/Test';
import SinglePage from "components/Layout/SinglePage";

import { LUXActionBarProvider } from "luna-rocket/LUXActionBar";
import { LUXDialogProvider } from "luna-rocket/LUXDialog"

import { getCookie } from 'services/utils'
import locale from 'services/locale';
//다국어 처리를 위한 쿠키값 추출
const targetLang = getCookie("locale") ||'ko';

function App() {
  return (
      <LUXActionBarProvider>
          <LUXDialogProvider style={{height: "100%"}}>
              <IntlProvider locale={targetLang} messages={locale[targetLang]}>
                  <HashRouter>
                      <SinglePage>
                          <Routes>
                              <Route path='/' element={<Test/>}/>
                          </Routes>
                      </SinglePage>
                  </HashRouter>
              </IntlProvider>
          </LUXDialogProvider>
      </LUXActionBarProvider>
  );
}

export default App;
