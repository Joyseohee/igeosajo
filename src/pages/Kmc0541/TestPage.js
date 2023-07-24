import React, { useEffect, useState } from 'react'

// 공통 컴포넌트
import { LUXButton, LUXPeriodDatePicker, LUXInputField, LUXSelectField, LUXDialog} from 'luna-rocket'

// css
import './styles/style.css'

// util
import callApi from 'services/apis/Kmc0541'
import moment from 'moment';

/* ================================================================================== */
/* [ Title            ] 신규과제페이지
/* [ Author           ] 김민찬
/* [ Date of Creation ] 2023.07.20
/* [ Editor           ] 수정자 이름
/* [ Date Updated     ] 2022.00.00
/* ================================================================================== */

export default function TestPage(props) {

  /* ================================================================================== */
  /* 상태(state) 선언
  /* ================================================================================== */
  const [state, setState] = useState({
    dateFrom: new Date('2023/01/01'),
    dateTo: new Date(),
    company_reg_no: '',
    company_name_kr: '',
    company_state: 0,

    compList: [],

    isOpenDialog: false,
  })

  const [compDetail, setCompDetail] = useState({
    company_no: '',
    company_reg_no: '',
    company_name_kr: '',
    company_state: '',
    business_format: '',
    business_type:'',
    ceo_name_kr: '',
    membership_code: ''
  })

  /* ================================================================================== */
  /* 함수(function) 선언
  /* ================================================================================== */

  const handleDateChange = (dateFrom, dateTo, position) => {
    setState({
      ...state,
      dateFrom: dateFrom,
      dateTo: dateTo
    })
  }

  const handleRegNoChange = (event, value) => {
    setState({
      ...state,
      company_reg_no: value
    })
  }

  const handleNameChange = (event, value) => {
    setState({
      ...state,
      company_name_kr: value
    })
  }

  const handleChoiceCompState = (value, text) => {
    setState({
      ...state,
      company_state: value
    })
  }

  const selectFieldDataObject = [
    { value: 0, text: '사용' },
    { value: 1, text: '중지' },
  ];

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

  const handleClear = () => {
    setState({
      ...state,
      dateFrom: new Date('2023/01/01'),
      dateTo: new Date(),
      company_reg_no: '',
      company_name_kr: '',
      company_state: 0,
    })
  }

  const selectDetail = async(data) => {
    const param = {
      company_no: data
    };
    const { resultCode, resultData } = await callApi.getCompDetail(param);
    if (resultCode === 200) {
      setCompDetail(resultData[0]);
      handleDialogOpen()
    }
  }

  const handleDialogOpen = () => {
    setState({
      ...state,
      isOpenDialog: true
    })
  }
  const handleDialogClose = () => {
    setState({
      ...state,
      isOpenDialog: false
    })
  }
  const handleOnReqeustClose = () => {
    setState({
      ...state,
      isOpenDialog: false
    })
  }
  const handleOnEscClose = () => {
    setState({
      ...state,
      isOpenDialog: false
    })
  }




  /* ================================================================================== */
  /* Hook(useEffect)
  /* ================================================================================== */
  useEffect(() => {
    selectCompList()
  },[])


  /* ================================================================================== */
  /* render() : Front html
  /* ================================================================================== */
  return (
    <>
      <div className="cs_renewal">
        <div className="LS_subheader white_type">
          {/* 서브헤더 Include */}
          <a href="#/kmc0541">
            <h1 className="sub_tit">회사정보조회</h1>
          </a>
        </div>
        <div className="cs_container">
          <div className="cs_content">
            <div className="pageLayout">
              <div className="pageLayout__title">
                <div className="pageLayout__title--textBox">
                  <p className="title__text title__text--main">조회조건</p>
                </div>
                <div className="pageLayout__title--optionBox" />
              </div>
              <div className="pageLayout__content">
                <div className="section">
                  <div className="searchBox">
                    <dl className="searchBox__item">
                      <div className="division">
                        <dt>가입일</dt>
                        <dd>
                          <LUXPeriodDatePicker
                            autoMoveNext={true}
                            valueFrom={state.dateFrom}
                            valueTo={state.dateTo}
                            onChange={handleDateChange}
                            fullWidth={true}
                          />
                        </dd>
                      </div>
                      <div className="division">
                        <dt>사업자번호</dt>
                        <dd>
                          <LUXInputField
                            numberText
                            value={state.company_reg_no}
                            hintText="사업자번호를 입력하세요."
                            onChange={handleRegNoChange}
                            fullWidth={true}
                            maxLength={10}
                          />
                        </dd>
                      </div>
                      <div className="division">
                        <dt>회사명</dt>
                        <dd>
                          <LUXInputField
                            value={state.company_name_kr}
                            hintText="회사명을 입력하세요."
                            onChange={handleNameChange}
                            fullWidth={true}
                          />
                        </dd>
                      </div>
                    </dl>
                    <dl className="searchBox__item">
                      <dt>회사상태</dt>
                      <dd className="division division--justify">
                        <LUXSelectField
                          checkObjectList={true}
                          selectFieldData={selectFieldDataObject}
                          defaultData={state.company_state}
                          handleChoiceData={handleChoiceCompState}
                        />
                      </dd>
                      <LUXButton label="초기화" onTouchTap={handleClear} />
                      <LUXButton label="조회" onTouchTap={selectCompList} blue={true} />
                    </dl>
                  </div>
                </div>
                <div className="section v100">
                  <div className="basicGroup v100">
                    <div className="basicGroup__content v100">
                      <div className="common_boxtbl style_basic cs_tbl_08_02 vflex v100">
                        <div className="list_header clearfix">
                          <div className="col1">회사번호</div>
                          <div className="col2">사업자번호</div>
                          <div className="col3">회사명</div>
                          <div className="col4">대표관리자 이름</div>
                          <div className="col5">대표관리자 연락처</div>
                          <div className="col6">대표관리자 이메일</div>
                        </div>
                        <div className="list_body">
                          {state.compList.map((item) => {
                            return (
                              <div
                                className="row"
                                onClick={() => {
                                  selectDetail(item.company_no);
                                }}
                                key={item.company_no}
                              >
                                <div className="col1">
                                  <p className="ellipsis">{item.company_no}</p>
                                </div>
                                <div className="col2">
                                  <p className="ellipsis">{item.company_reg_no}</p>
                                </div>
                                <div className="col3">
                                  <p className="ellipsis">{item.company_name_kr}</p>
                                </div>
                                <div className="col4">
                                  <p className="ellipsis">{item.user_name}</p>
                                </div>
                                <div className="col5">
                                  <p className="ellispsis">{item.user_contact}</p>
                                </div>
                                <div className="col6">
                                  <p className="ellispsis">{item.user_default_email}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LUXDialog
          onRequestClose={handleOnReqeustClose}
          handleOnReqeustClose={handleOnReqeustClose}
          handleOnEscClose={handleOnEscClose}
          dialogOpen={state.isOpenDialog}
          dialogButton={[
            <LUXButton
              label="확인"
              onClick={handleDialogClose}
              style={{ width: '60px', height: '30px', marginLeft: '5px', background: '#03A9F4', border: 'none', color: '#fff' }}
            />,
          ]}
        >
          <div className="dialog_wrap" style={{ border: 0, borderRadius: '20px' }}>
            <div className="dialog_content roundstyle dz_font cs_dialog50" style={{ width: '408px' }}>
              <div className="dialog_data" style={{ display: 'block' }}>
                <div className="dialog_data_tit">
                  <h1>회사 정보 상세 보기</h1>
                  <button type="button" className="LUX_basic_btn btn_clr" onClick={handleDialogClose}>
                    <span className="sp_lux" />
                  </button>
                </div>
                <div className="dialog_data_area nopadding">
                  <div className="dialog_data_section">
                    <div className="common_tbl_round th_gray">
                      <table>
                        <colgroup>
                          <col style={{ width: '120px' }} />
                          <col />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>회사번호</th>
                            <td>
                              <span>{compDetail.company_no}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>사업자번호</th>
                            <td>
                              <span>{compDetail.company_reg_no.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>회사명</th>
                            <td>
                              <span>{compDetail.company_name_kr}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>회사상태</th>
                            <td>
                              <span>{compDetail.company_state === 0 ? '사용' : '중지'}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>업태</th>
                            <td>
                              <span>{compDetail.business_format}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>업종</th>
                            <td>
                              <span>{compDetail.business_type}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>대표자명</th>
                            <td>
                              <span>{compDetail.ceo_name_kr}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>멤버십</th>
                            <td>
                              <span>{compDetail.membership_code}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LUXDialog>
    </>
  )
}