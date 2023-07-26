import React, {useState, useEffect} from 'react';

import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'
import "./css/style.css";

import { Dialog } from './Dialog';


export const CompanyList = (props) => {
    const [state, setState] = useState({
        dateFrom: new Date(),
        dateTo: new Date(),
        company_reg_no: '',
        company_name_kr: '',
        company_state: 0,
    
        compList: [],
    
       
      })
      const [selectedCompany , setSelectedCompany]=useState('');
    
      const selectCompList = async(param) => {
        console.log('--------------------------param')
     console.log(param)

          var param2 = {
            dateFrom:moment(param.dateFrom).format('YYYY-MM-DD') ,
            dateTo :moment(param.dateTo).format('YYYY-MM-DD'),
            company_name_kr: param.company_name_kr,
            company_state: param.company_state,
            company_reg_no:param.company_reg_no
          }
         // props.searchData;

        console.log("param2")
        console.log(param2)

        const {resultCode, resultData} = await callApi.getCompList(param2);
        console.log("resultData")
        console.log(resultData)
        if(resultCode === 200) {
          setState({
            ...state,
            compList: resultData
          })
        }
      }
      useEffect(() => {
        console.log('useEffect List')
        console.log(props)
        selectCompList(props.searchData);
      },[props.searchData])
    
      useEffect(() => {
        console.log('useEffect List mount')
        console.log(props.searchData)
        selectCompList(props.searchData);
      },[])
    
    
      // const onRowClick=(value)=>{
      //   console.log(value)
      //   setSelectedCompany(value);
      // }
return (

    <div className="section v100">
    <div className="basicGroup v100">
      <div className="basicGroup__content v100">
        <div className="common_boxtbl style_basic cs_tbl_08_02 vflex v100">
          <div className="list_header clearfix">
            <div className="kkbm0225col1">회사번호</div>
            <div className="kkbm0225col2">사업자번호</div>
            <div className="kkbm0225col3">회사명</div>
            <div className="kkbm0225col4">대표 관리자 이름</div>
            <div className="kkbm0225col5">대표 관리자 연락처</div>
            <div className="kkbm0225col6">대표 관리자 이메일</div>
          </div>
          <div className="list_body">
         { state.compList.length!==0 ?state.compList.map((item, i) => {
                        return (
            <div className="row" onClick={()=>props.handleSelect(item.company_no)}>
              <div className="kkbm0225col1">
                <p className="ellipsis"><span className="bar" />{item.company_no}</p>
              </div>
              <div className="kkbm0225col2">
                <p className="ellipsis">{item.company_reg_no}</p>
              </div>
              <div className="kkbm0225col3">
                <p className="ellipsis">{item.company_name_kr}</p>
              </div>
              <div className="kkbm0225col4">
                <p className="ellipsis">{item.user_name}</p>
              </div>
              <div className="kkbm0225col5">
                <p className="ellispsis">{item.user_contact.length===11?item.user_contact.substr(0,3)+ '-'+ item.user_contact.substr(3,4)+ '-' + item.user_contact.substr(7,3):item.user_contact}</p>
              </div>
              <div className="kkbm0225col6">
                <p className="ellispsis">{item.user_default_email}</p>
              </div>
            </div> )
         } ) : <div  className="row" style={{textAlign:'center', height:'400px', justifyContent: 'center',fontSize:'20px'}}> <br/> <br/>데이터가 없습니다</div>}

          
          </div>
          
        </div>
      </div>
    </div>
  </div>
  
)
}