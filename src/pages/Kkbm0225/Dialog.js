import React, {useState, useEffect} from 'react';
import './css/style.css'
import moment from 'moment'
import callApi from 'services/apis/Kkbm0225'
export const Dialog = (props) => {

  const [detail, setDetail] = useState({
    
  })

  useEffect (()=>{
    console.log('diaolguseeffect')
    console.log(props.selectedCompany)
     if(props.selectedCompany!==''){ 
      console.log('diaolguseeffect not null')
    console.log(props.selectedCompany)
      getDetail();
    }
  },[props.selectedCompany])


const getDetail =async() =>{
  console.log('getDetail')
    console.log(props.selectedCompany)
  const param ={
    company_no:props.selectedCompany
  }
  const {resultCode, resultData} = await callApi.getCompDetail(param);
  console.log("resultData")
  console.log(resultData)
  if(resultCode === 200) {
    setDetail(resultData[0])
  }
}

      return (
        <div>
          
            <div className="LUX_basic_dialog">
              <div className="dimmed" />
              <div className="dialog_wrap_tbl">
                <div className="dialog_wrap_tblcel">
                  {/* [D] 다이얼로그 컴퍼넌트 dialogBoxStyle 영역에  padding:0;border:0;border-radius:10px 추가 */}
            
                  <div className="dialog_wrap" style={{border: 0, borderRadius: '20px'}}>
                    <div className="dialog_content roundstyle dz_font cs_dialog50" style={{width: '408px'}}>
                      {/* 데이터형태 */}
                      <div className="dialog_data" style={{display: 'block'}}>
                        <div className="dialog_data_tit">
                          <h1>회사 정보 상세 보기</h1>
                          <button type="button" className="LUX_basic_btn btn_clr">
                           
                          </button>
                        </div>
                        <div className="dialog_data_area nopadding"> {/* 내부 스크롤 생성 */}
                          <div className="dialog_data_section">
                            <div className="common_tbl_round th_gray">
                              <table>
                               
                                <colgroup>
                                  <col style={{width: '120px'}} />
                                  <col />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th scope="row" className="txtlft">회사번호</th>
                                    <td>
                                      <div className="inbx">
                                        <p className="ellipsis"> {props.selectedCompany}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">사업자번호</th>
                                    <td>
                                      <div className="inbx">
                                        <p className="ellipsis">{detail.company_reg_no}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">회사명</th>
                                    <td>
                                      <div className="inbx">
                                      <p className="ellipsis">{detail.company_name_kr}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">회사상태</th>
                                    <td>
                                      <div className="inbx">
                                      <p className="ellipsis">{detail.company_state===0? <>사용</>:<>중지</>}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">업태</th>
                                    <td>
                                      <div className="inbx">
                                        <p className="ellipsis">{detail.business_format}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">업종</th>
                                    <td>
                                      <div className="inbx">
                                      <p className="ellipsis">{detail.business_type}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">대표자명</th>
                                    <td>
                                      <div className="inbx">
                                      <p className="ellipsis">{detail.ceo_name_kr}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">멤버십</th>
                                    <td>
                                      <div className="inbx">
                                      <p className="ellipsis">{detail.membership_code ==='WC'?<> WEHAGO Club</> :  detail.membership_code ==='WH'?<>WEHAGO Hybrid</> : detail.membership_code ==='WT'?<> WEHAGO TAX Accountant</>:<> {detail.membership_code}</>}</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                      {/* //데이터형태 */}
                    </div>
                    <div className="dialog_btnbx">
                      <div>
                      <button type="button" className="common_round_btn sizeBig blue" onClick={()=>props.handleSelect('')}>확인</button>
                      </div>
                    </div>
                  </div>
                 
                    
              
                
              </div>
            </div>
          </div>
   </div>
      );
    }
    export default Dialog;