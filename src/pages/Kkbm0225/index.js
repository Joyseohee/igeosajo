import React, {useState, useEffect} from 'react';

import './css/style.css'
import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'

import { CompanyList } from './CompanyList';
import { CompanySearch } from './CompanySearch';
import { Dialog } from './Dialog';

const Kkbm0225 = () => {



  const [state, setState] = useState({
 

    compList: [],

    isOpenDialog: false,
  })
  const d = new Date();

  const [searchData, setSearchData] = useState({

    dateFrom:new Date(d.setFullYear(d.getFullYear() - 1)),
    dateTo: new Date(),
    company_reg_no: '',
    company_name_kr: '',
    company_state: 2,
  })
  const [selectedCompany , setSelectedCompany]=useState('');


  const handleSearch =(searchData)=>{
  
    setSearchData( searchData)
  }

  const handleSelect=(selectedCompany)=>{
  
    setSelectedCompany( selectedCompany)
  }
  useEffect(()=>{console.log('useeffect');console.log(searchData)},[])
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
                       <CompanySearch handleSearch ={handleSearch} searchData ={searchData}/>
                    <CompanyList searchData ={searchData} handleSelect={handleSelect}/>
                    {selectedCompany!=='' ?<Dialog selectedCompany={selectedCompany} handleSelect={handleSelect}/> :<></>}
              
  
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