import { Route, Routes, HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Test from 'pages/Test';

import Sangmik from 'pages/Sangmik';
import Sij919 from 'pages/Sij919';
import Judylee from 'pages/Judylee';
import Goeunlee from 'pages/Goeunlee';
import Aminiyolo from 'pages/Aminiyolo';
import Sk74575 from 'pages/Sk74575';
import Clarities from 'pages/Clarities';
import Ssy0409 from 'pages/Ssy0409';
import Janghyeon from 'pages/Janghyeon';
import Yeo72 from 'pages/Yeo72';
import Hyeeun from 'pages/Hyeeun';
import Ryuhj51 from 'pages/Ryuhj51';
import Skylife05 from 'pages/Skylife05';
import Wlgns6147 from 'pages/Wlgns6147';
import Kmc0541 from 'pages/Kmc0541';
import Rhj1216 from 'pages/Rhj1216';
import Faigi from 'pages/Faigi';
import Kjk81 from 'pages/Kjk81';
import Vcld22 from 'pages/Vcld22';
import Luxury369 from 'pages/Luxury369';
import Dotochan1 from 'pages/Dotochan1';
import Si0852 from 'pages/Si0852';
import Young0708 from 'pages/Young0708';
import Ant9406 from 'pages/Ant9406';
import Dohee3959 from 'pages/Dohee3959';
import Kimryeongeun from 'pages/Kimryeongeun';
import Khgkjg12 from 'pages/Khgkjg12';
import Egbrother from 'pages/Egbrother';
import Jinhankim988 from 'pages/Jinhankim988';
import Kkbm0225 from 'pages/Kkbm0225';
import Dreamtree from 'pages/Dreamtree';
import Yujeans23 from 'pages/Yujeans23';
import Kevin3918 from 'pages/Kevin3918';

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
                              <Route path='/Sangmik' element={<Sangmik/>}/>
                              <Route path='/Sij919' element={<Sij919/>}/>
                              <Route path='/Judylee' element={<Judylee/>}/>
                              <Route path='/Goeunlee' element={<Goeunlee/>}/>
                              <Route path='/Aminiyolo' element={<Aminiyolo/>}/>
                              <Route path='/Sk74575' element={<Sk74575/>}/>
                              <Route path='/Clarities' element={<Clarities/>}/>
                              <Route path='/Ssy0409' element={<Ssy0409/>}/>
                              <Route path='/Janghyeon' element={<Janghyeon/>}/>
                              <Route path='/Yeo72' element={<Yeo72/>}/>
                              <Route path='/Hyeeun' element={<Hyeeun/>}/>
                              <Route path='/Ryuhj51' element={<Ryuhj51/>}/>
                              <Route path='/Skylife05' element={<Skylife05/>}/>
                              <Route path='/Wlgns6147' element={<Wlgns6147/>}/>
                              <Route path='/Kmc0541' element={<Kmc0541/>}/>
                              <Route path='/Rhj1216' element={<Rhj1216/>}/>
                              <Route path='/Faigi' element={<Faigi/>}/>
                              <Route path='/Kjk81' element={<Kjk81/>}/>
                              <Route path='/Vcld22' element={<Vcld22/>}/>
                              <Route path='/Luxury369' element={<Luxury369/>}/>
                              <Route path='/Dotochan1' element={<Dotochan1/>}/>
                              <Route path='/Si0852' element={<Si0852/>}/>
                              <Route path='/Young0708' element={<Young0708/>}/>
                              <Route path='/Ant9406' element={<Ant9406/>}/>
                              <Route path='/Dohee3959' element={<Dohee3959/>}/>
                              <Route path='/Kimryeongeun' element={<Kimryeongeun/>}/>
                              <Route path='/Khgkjg12' element={<Khgkjg12/>}/>                           
                              <Route path='/Egbrother' element={<Egbrother/>}/>
                              <Route path='/Jinhankim988' element={<Jinhankim988/>}/>
                              <Route path='/Kkbm0225' element={<Kkbm0225/>}/>
                              <Route path='/Dreamtree' element={<Dreamtree/>}/>
                              <Route path='/Yujeans23' element={<Yujeans23/>}/>
                              <Route path='/Kevin3918' element={<Kevin3918/>}/>
                          </Routes>
                      </SinglePage>
                  </HashRouter>
              </IntlProvider>
          </LUXDialogProvider>
      </LUXActionBarProvider>
  );
}

export default App;
