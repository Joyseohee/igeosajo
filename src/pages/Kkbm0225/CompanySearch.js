import {LUXDatePicker, LUXPeriodDatePicker,LUXSelectField, LUXInputField} from 'luna-rocket';
import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'
import React, {useState, useEffect} from 'react';

import './css/style.css'


export const CompanySearch = (props) => {

 
    const [state, setState] = useState({
     

        isOpenDialog: false,
        defaultData :2
      })
      

      const [searchData, setSearchData] = useState(props.searchData)
    
      const selectFieldDataObject = [
        { value: 2, text: '전체' },
        { value: 0, text: '사용' },
        { value: 1, text: '중지' },
      ];
      
      const handleChange = (dateFrom, dateTo, position) => {
        console.log(dateFrom, '~', dateTo, position);
    
        setSearchData({...searchData , dateFrom:dateFrom, dateTo:dateTo});
       
        
      };

      const  handleChoiceDataObject = (value, text) => {
       
        setSearchData({ ...searchData,company_state: value });
      };

      const onClickSearch =() =>{
      props.handleSearch(searchData);   
      }
      const onClickReset =() =>{
        const d = new Date();
        setSearchData({

          dateFrom:new Date(d.setFullYear(d.getFullYear() - 1)),
          dateTo: new Date(),
          company_reg_no: '',
          company_name_kr: '',
          company_state: 2,
        });   
        }

      const onChangeSearch =(event, value) =>{
        console.log('onChangeSearch')
     console.log(value)
     console.log(event)
        //console.log(value.nativeEvent.data);
        
       const id= event.nativeEvent.target.id;
     
        if(id ==='companyreq'){
        setSearchData({...searchData,company_reg_no:value})
      }
      else if(id ==='companyname'){
        setSearchData({...searchData, company_name_kr:value})
      }
      
      }
      useEffect (() =>{
        console.log('searchDataUseeffect')
      console.log(searchData);
      },[searchData])


      useEffect (() =>{ console.log("searchData");

        console.log(searchData);
              },[])
        



    return ( <div className="section">
    <div className="searchBox">
      <dl className="kk_searchBox__item">
        <div className="division">
          <dt>가입일</dt>
          <dd>
            <div className="searchBox__calendar">
              {/* element 선언된 Style 속성들 빠짐없이 다 넣어주세요. */}
              {/* element에 Style 속성 적용 안될시 문의부탁드립니다. */}
              <div className="date_gap" style={{flex: 1, width: '410px'}}>
                {/* LUX Component 사용 */}
               
                  <LUXPeriodDatePicker
                     valueFrom={searchData.dateFrom}
                     valueTo={searchData.dateTo}
                     onChange={handleChange}
                     fullWidth={true}
                  /> 
              </div>
           
              
            </div>
          </dd>
        </div>
        <div className="division">
          <dt>사업자번호</dt>
          <dd>
          <LUXInputField
           style={{width: '500px', marginLeft: '4px'}}
          value={searchData.company_reg_no}
          koreanText={false}
          englishText={false}
          numberText={true}
          specialText={false}
          onChange={onChangeSearch}
          id="companyreq"
          placeholder="사업자번호를 입력해주세요." 
          width='500px'
        />
          </dd>
        </div>
        <div className="division">
          <dt>회사상태</dt>
          <dd>
           
            <LUXSelectField  
            id ='companystate'
            style={{width: '500px', marginLeft: '4px'}}
            listAutoHeight={true}
          checkObjectList={true}
          selectFieldData={selectFieldDataObject}
          defaultData={searchData.company_state}
          handleChoiceData={handleChoiceDataObject}
        />
          </dd>
        </div>
      </dl>
      <dl className="kk_searchBox__item">
        <dt>회사명</dt>
        <dd className="division division--justify">
          <div className="bundle">
            {/* <div className="LUX_basic_select LUX_renewal" style={{width: '85px'}}>
              <div className="searchbx">
                <span className="inpbx">
                  <span className="placeholder text_black" style={{fontFamily: 'douzone !important', fontSize: '14px'}}>전체</span>
                </span>
                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
              </div>
              <div className="resultbx">
                <div className="result_scrall" style={{maxHeight: '100px'}}>
                  <div className="result_scrallin">
                    <ul className="result_lst">
                      <li><a href="#"><div>메뉴1</div></a></li>
                      <li><a href="#"><div>메뉴2</div></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            
           
              {/* 입력창에 포커스 - inpbx class="on" 추가  */}
            
              <LUXInputField
               style={{width: '460px'}}
          value={searchData.company_name_kr}
          koreanText={true}
          englishText={true}
          numberText={true}
          specialText={true}
          onChange={onChangeSearch}
          id="companyname"
          placeholder="회사명을 입력해주세요." 
        />
{/* 
<LUXInputField
          value={searchData.company_name_kr}
          hintText="한글/영어/숫자/특수문자만"
          koreanText={true}
          englishText={true}
          numberText={true}
          specialText={true}
          onChange={onChangeSearch}
          id="companyname"
        /> */}
                {/* <input type="text" id="companyname" style={{fontFamily: 'douzone !important', fontSize: '14px'}} defaultValue='' value={searchData.company_name_kr} onChange={onChangeSearch} placeholder="회사명을 입력해주세요." title="내용입력" /> */}
              </div>
        
         
          <div className="bundle">
            <button type="button" className="supports__button"  onClick={onClickReset}>초기화</button>
            <button type="button" className="supports__button supports__button--confirm" onClick={onClickSearch}>조회</button>
          </div>
        </dd>
      </dl>
    </div>
  </div> ) 
};