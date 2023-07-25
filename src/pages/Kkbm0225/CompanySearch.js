import {LUXDatePicker, LUXPeriodDatePicker} from 'luna-rocket';
import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'
import React, {useState, useEffect} from 'react';

 

export const CompanySearch = ({  }) => {
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
    return ( <div className="section">
    <div className="searchBox">
      <dl className="searchBox__item">
        <div className="division">
          <dt>가입일</dt>
          <dd>
            <div className="searchBox__calendar">
              {/* element 선언된 Style 속성들 빠짐없이 다 넣어주세요. */}
              {/* element에 Style 속성 적용 안될시 문의부탁드립니다. */}
              <div className="date_gap" style={{flex: 1}}>
                {/* LUX Component 사용 */}
               
                  <LUXPeriodDatePicker
                     valueFrom={state.dateFrom}
                     valueTo={state.dateTo}
                     onChange={handleChange}
                    
                  /> 
              </div>
           
              <div className="date_gap" style={{flex: 1}}>
                {/* LUX Component 사용 */}
                
              </div>
            </div>
          </dd>
        </div>
        <div className="division">
          <dt>사업자번호</dt>
          <dd>
            <div className="LUX_basic_select LUX_renewal" style={{float: 'left', width: '100%', minWidth: '75px'}}>
              <div className="searchbx">
                <span className="inpbx">
                  <span className="placeholder text_black" style={{fontFamily: 'douzone !important', fontSize: '14px'}}>전체</span>
                </span>
                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
              </div>
              <div className="resultbx">
                <div className="result_scrall" style={{maxHeight: '100px'}}>{/* 스크롤 생성 height 높이값 제어 */}
                  <div className="result_scrallin">
                    <ul className="result_lst">
                      <li><a href="#"><div>개인</div></a></li>
                      <li><a href="#"><div>공동</div></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </div>
        <div className="division">
          <dt>기능</dt>
          <dd>
            <div className="LUX_basic_select LUX_renewal" style={{float: 'left', width: '100%', minWidth: '75px'}}>
              <div className="searchbx">
                <span className="inpbx">
                  <span className="placeholder text_black" style={{fontFamily: 'douzone !important', fontSize: '14px'}}>전체</span>
                </span>
                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
              </div>
              <div className="resultbx">
                <div className="result_scrall" style={{maxHeight: '100px'}}>{/* 스크롤 생성 height 높이값 제어 */}
                  <div className="result_scrallin">
                    <ul className="result_lst">
                      <li><a href="#"><div>일반</div></a></li>
                      <li><a href="#"><div>국가</div></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </div>
      </dl>
      <dl className="searchBox__item">
        <dt>회사명</dt>
        <dd className="division division--justify">
          <div className="bundle">
            <div className="LUX_basic_select LUX_renewal" style={{width: '85px'}}>
              <div className="searchbx">
                <span className="inpbx">
                  <span className="placeholder text_black" style={{fontFamily: 'douzone !important', fontSize: '14px'}}>전체</span>
                </span>
                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
              </div>
              <div className="resultbx">
                <div className="result_scrall" style={{maxHeight: '100px'}}>{/* 스크롤 생성 height 높이값 제어 */}
                  <div className="result_scrallin">
                    <ul className="result_lst">
                      <li><a href="#"><div>메뉴1</div></a></li>
                      <li><a href="#"><div>메뉴2</div></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="LUX_basic_text LUX_renewal" style={{width: '210px', marginLeft: '4px'}}>
              {/* 입력창에 포커스 - inpbx class="on" 추가  */}
              <div className="inpbx">
                <input type="text" id="libText1" style={{fontFamily: 'douzone !important', fontSize: '14px'}} defaultValue placeholder="검색어를 입력해주세요." title="내용입력" />
              </div>
            </div>
          </div>
          <div className="bundle">
            <button type="button" className="supports__button">초기화</button>
            <button type="button" className="supports__button supports__button--confirm">조회</button>
          </div>
        </dd>
      </dl>
    </div>
  </div> ) 
};