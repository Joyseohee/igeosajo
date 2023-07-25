import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'
import React, {useState, useEffect} from 'react';


export const CompanyList = ({  }) => {
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


      const selectCompList = async() => {
        const param = {
          dateFrom: moment(state.dateFrom).format('YYYYMMDD'),
          dateTo: moment(state.dateTo).format('YYYYMMDD'),
          company_reg_no: state.company_reg_no,
          company_name_kr: state.company_name_kr,
          company_state: state.company_state,
        };
        const {resultCode, resultData} = await callApi.getCompList(param);
        if(resultCode === 200) {
          setState({
            ...state,
            compList: resultData
          })
        }
      }
      useEffect(() => {
        console.log('useEffect')
        selectCompList()
      },[])
    
return (

    <div className="section v100">
    <div className="basicGroup v100">
      <div className="basicGroup__content v100">
        <div className="common_boxtbl style_basic cs_tbl_08_02 vflex v100">
          <div className="list_header clearfix">
            <div className="col1">회사번호</div>
            <div className="col2">사용자</div>
            <div className="col3">소속부서</div>
            <div className="col4">접속아이피</div>
            <div className="col5">접속정보</div>
            <div className="col6">처리내용</div>
          </div>
          <div className="list_body">
         { state.compList.map((item, i) => {
                        return (
                          
            <div className="row">
              <div className="col1">
                <p className="ellipsis">{item.user_no}<span className="bar" />HH:MM:SS</p>
              </div>
              <div className="col2">
                <p className="ellipsis">김더존</p>
              </div>
              <div className="col3">
                <p className="ellipsis">더존비즈온&gt;디자인센터&gt;UX/UI1팀</p>
              </div>
              <div className="col4">
                <p className="ellipsis">10.106.1.175</p>
              </div>
              <div className="col5">
                <p className="ellispsis">WEB</p>
              </div>
              <div className="col6">
                <p className="ellispsis">회사 스페이스 접속</p>
              </div>
            </div> )
         } )}
          </div>
        </div>
      </div>
    </div>
  </div>
  
)
}