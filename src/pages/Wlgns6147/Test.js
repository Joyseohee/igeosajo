import React, { Component } from 'react';
import LUXButton from 'luna-rocket/LUXButton';
import LUXPeriodDatePicker from 'luna-rocket/LUXPeriodDatePicker';
import LUXInputField from 'luna-rocket/LUXTextField/LUXInputField';
import LUXSelectField from 'luna-rocket/LUXSelectField';
import LUXDialog from 'luna-rocket/LUXDialog';

import './styles/styles.css';
import callApi from 'services/apis/Wlgns6147';
import moment from 'moment';

const selectFieldDataObject = [
  { value: 0, text: '사용' },
  { value: 1, text: '중지' },
];

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date('2023/01/01'),
      dateTo: new Date(),
      company_reg_no: '', // 사업자번호
      company_name_kr: '', // 회사명
      company_state: 0, // 회사상태

      compList: [], // 조회 목록

      compDetail: {
        company_no: '', // 회사번호
        company_reg_no: '', // 사업자번호
        company_name_kr: '', // 회사명
        company_state: '', // 회사상태
        business_format: '', // 업태
        business_type: '', // 업종
        ceo_name_kr: '', // 대표자명
        membership_code: '', // 멤버십코드
      }, // 회사 정보 상세

      dialogOpen: false,
    };
  }

  // 가입일 변경 이벤트
  handleChange = (dateFrom, dateTo, position) => {
    this.setState({
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
  };

  // 사업자번호 변경 이벤트
  handleRegNoChange = (event, value) => {
    this.setState({ company_reg_no: value });
  };

  // 회사명 변경 이벤트
  handleNameChange = (event, value) => {
    this.setState({ company_name_kr: value });
  };

  // 회사상태 변경 이벤트
  handleChoiceCompState = (value, text) => {
    this.setState({ company_state: value });
  };

  selectCompList = async () => {
    const param = {
      dateFrom: moment(this.state.dateFrom).format('YYYYMMDD'),
      dateTo: moment(this.state.dateTo).format('YYYYMMDD'),
      company_reg_no: this.state.company_reg_no, // 사업자번호
      company_name_kr: this.state.company_name_kr, // 회사명
      company_state: this.state.company_state, // 회사상태,
    };
    const { resultCode, resultData } = await callApi.getCompList(param);
    if (resultCode === 200) {
      this.setState({ compList: resultData });
    }
  };

  handleClear = () => {
    this.setState({
      dateFrom: new Date('2023/01/01'),
      dateTo: new Date(),
      company_reg_no: '', // 사업자번호
      company_name_kr: '', // 회사명
      company_state: 0, // 회사상태
    });
  };

  selectDetail = async (data) => {
    const param = {
      company_no: data,
    };
    const { resultCode, resultData } = await callApi.getCompDetail(param);
    if (resultCode === 200) {
      this.setState(
        {
          compDetail: resultData[0],
        },
        this.handleDialogOpen()
      );
    }
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleOnReqeustClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleOnEscClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <>
        <div className="cs_renewal">
          <div className="LS_subheader white_type">
            {/* 서브헤더 Include */}
            <a href="#/Wlgns6147">
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
                              valueFrom={this.state.dateFrom}
                              valueTo={this.state.dateTo}
                              onChange={this.handleChange}
                              fullWidth={true}
                            />
                          </dd>
                        </div>
                        <div className="division">
                          <dt>사업자번호</dt>
                          <dd>
                            <LUXInputField
                              numberText
                              value={this.state.company_reg_no}
                              hintText="사업자번호를 입력하세요."
                              onChange={this.handleRegNoChange}
                              fullWidth={true}
                              maxLength={10}
                            />
                          </dd>
                        </div>
                        <div className="division">
                          <dt>회사명</dt>
                          <dd>
                            <LUXInputField
                              value={this.state.company_name_kr}
                              hintText="회사명을 입력하세요."
                              onChange={this.handleNameChange}
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
                            defaultData={this.state.company_state}
                            handleChoiceData={this.handleChoiceCompState}
                          />
                        </dd>
                        <LUXButton label="초기화" onTouchTap={this.handleClear} />
                        <LUXButton label="조회" onTouchTap={this.selectCompList} blue={true} />
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
                            {this.state.compList.map((item) => {
                              return (
                                <div
                                  className="row"
                                  onClick={() => {
                                    this.selectDetail(item.company_no);
                                  }}
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
          onRequestClose={true}
          handleOnReqeustClose={this.handleOnReqeustClose}
          handleOnEscClose={this.handleOnEscClose}
          dialogOpen={this.state.dialogOpen}
          dialogButton={[
            <LUXButton
              label="확인"
              onClick={this.handleDialogClose}
              style={{ width: '60px', height: '30px', marginLeft: '5px', background: '#03A9F4', border: 'none', color: '#fff' }}
            />,
          ]}
        >
          <div className="dialog_wrap" style={{ border: 0, borderRadius: '20px' }}>
            <div className="dialog_content roundstyle dz_font cs_dialog50" style={{ width: '408px' }}>
              <div className="dialog_data" style={{ display: 'block' }}>
                <div className="dialog_data_tit">
                  <h1>회사 정보 상세 보기</h1>
                  <button type="button" className="LUX_basic_btn btn_clr" onClick={this.handleDialogClose}>
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
                              <span>{this.state.compDetail.company_no}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>사업자번호</th>
                            <td>
                              <span>{this.state.compDetail.company_reg_no.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>회사명</th>
                            <td>
                              <span>{this.state.compDetail.company_name_kr}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>회사상태</th>
                            <td>
                              <span>{this.state.compDetail.company_state === 0 ? '사용' : '중지'}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>업태</th>
                            <td>
                              <span>{this.state.compDetail.business_format}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>업종</th>
                            <td>
                              <span>{this.state.compDetail.business_type}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>대표자명</th>
                            <td>
                              <span>{this.state.compDetail.ceo_name_kr}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>멤버십</th>
                            <td>
                              <span>{this.state.compDetail.membership_code}</span>
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
    );
  }
}

Test.propTypes = {};

export default Test;
