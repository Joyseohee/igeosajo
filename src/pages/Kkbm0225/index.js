import React, {useState, useEffect} from 'react';
import Header from './Header';
import Select from './Select';
import Lang from './Lang';
import Globals from './Globals';
import ZustandTest from './ZustandTest';
import CommonLUXComponentTest from './CommonLUXComponentTest';
import style from './style.css'
import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'

import { CompanyList } from './CompanyList';
import { CompanySearch } from './CompanySearch';


const Kkbm0225 = () => {



  const [state, setState] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    company_reg_no: '',
    company_name_kr: '',
    company_state: 0,

    compList: [],

    isOpenDialog: false,
  })

  const handleChange = (dateFrom, dateTo, position) => {
    console.log(dateFrom, '~', dateTo, position);

    setState({...state,dateFrom:dateFrom, dateTo});
   
    
  };


  
    return (

        <div className="container">
          <div className="containerin">
            <div className="content">
              <div className="cs_renewal">
                <div className="LS_subheader white_type">{/* 서브헤더 Include */}
                {/* <Header/> */}
                  <a href="#"><h1 className="sub_tit">회사정보조회</h1></a>
                  <div className="sub_menu">
                    <ul className="tabs_wrap">
                      {/* [D] li 테그에 hover, focus 되면 li 테그에 open 클래스 추가 */}
                      <li className="no_depth">
                        <a href="#">회사정보관리</a>
                      </li>
                      <li className="no_depth">
                        <a href="#">조직/사용자관리</a>
                      </li>
                      <li className="no_depth">
                        <a href="#">서비스관리</a>
                      </li>
                      <li className="no_depth">
                        <a href="#">도메인설정</a>
                      </li>
                      <li className="no_depth">
                        <a href="#">요금 및 결제 관리</a>
                      </li>
                      <li className="no_depth">
                        <a href="#">활동기록</a>
                      </li>
                    </ul>
                  </div></div>
                <div className="cs_container">
                  <div className="cs_content">
                    <div className="pageLayout">
                      <div className="pageLayout__title">
                        <div className="pageLayout__title--textBox">
                          <p className="title__text title__text--main">회사조회</p>
                          <p className="title__text title__text--sub">회사정보를 조회합니다.</p>
                        </div>
                        <div className="pageLayout__title--optionBox" />
                      </div>
                      {/* 리스트 영역 노출 --division01 */}
                      {/* 조직도 영역 노출 --division02 */}
                      <div className="pageLayout__content">
                       <CompanySearch/>
                    <CompanyList/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
export default Kkbm0225;