import React, { Component } from "react";
import moment from "moment";
import "./Dreamtree.css";
import DreamtreePopup from "./DreamtreePopup";

//LUX
import LUXPeriodDatePicker from "luna-rocket/LUXPeriodDatePicker";
import LUXBusinessField from "luna-rocket/LUXTextField/LUXBusinessField";
// import LUXTextField from "luna-rocket/LUXTextField";
import LUXInputField from "luna-rocket/LUXTextField/LUXInputField";
import LUXSelectField from "luna-rocket/LUXSelectField";

//회사상태 드롭다운리스트
const company_state_list = [
  { value: -1, text: "전체" },
  { value: 0, text: "사용" },
  { value: 1, text: "중지" },
];

class DreamtreeClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openPopup: false,

      //조회조건
      start_date: new Date(),
      end_date: new Date(),
      company_reg_no: "",
      company_state: -1,
      company_name_kr: "",

      //결과 리스트
      listData: [],
      listIndex: 0,
    };
  }

  /*********************************************************
   *
   * 함수 및 API
   *
   *********************************************************/

  closePopup = () => {
    this.setState({ openPopup: false });
  };

  //조회조건 [가입일] - onChange 처리
  changeJoinDate = (dateFrom, dateTo, position) => {
    console.log(dateFrom, "~", dateTo);

    this.setState({
      start_date: dateFrom,
      end_date: dateTo,
    });
  };

  //조회조건 [사업자번호] - onChange 처리
  changeCompanyRegNo = (event, value) => {
    // console.log("@@@ event : ", event);
    // console.log("@@@ value : ", value);
    this.setState({ company_reg_no: value });
  };

  //조회조건 [회사상태] - onChange 처리
  changeCompanyState = (value, text) => {
    // console.log("@@@ value : ", value);
    // console.log("@@@ text : ", text);
    this.setState({ company_state: value });
  };

  //조회조건 [회사명] - onChange 처리
  changeCompanyNameKr = (value, text) => {
    // console.log("@@@ value : ", value);
    // console.log("@@@ text : ", text);
    this.setState({ company_name_kr: text });
  };

  //DidMount시 호출 (전체 조회)
  getCompanyList = () => {
    fetch("http://localhost:8080/wehago_task1/dreamtree/list")
      .then((response) => response.json()) //JSON 형태로 변환
      .then((data) => {
        this.setState({ listData: data.resultData }); //API 호출 결과를 listData에 담기
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //조회버튼 클릭 시 호출 (검색 조회)
  getCompanySearch = () => {
    const {
      start_date,
      end_date,
      company_reg_no,
      company_state,
      company_name_kr,
    } = this.state;

    fetch(
      `http://localhost:8080/wehago_task1/dreamtree/search?start_date=${moment(
        start_date
      ).format("YYYYMMDD")}&end_date=${moment(end_date).format(
        "YYYYMMDD"
      )}&company_reg_no=${company_reg_no}&company_name_kr=${company_name_kr}&company_state=${company_state}`
    )
      .then((response) => response.json()) //JSON 형태로 변환
      .then((data) => {
        this.setState({ listData: data.resultData });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  /*********************************************************
   *
   * LifeCycle
   *
   *********************************************************/

  componentDidMount() {
    this.getCompanyList();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.openPopup !== this.state.openPopup) {
    //   console.log("this.state.openPopup : ", this.state.openPopup);
    // }

    // if (prevState.company_name_kr !== this.state.company_name_kr) {
    //   console.log("company_name_kr : ", this.state.company_name_kr);
    // }

    // if (prevState.company_state !== this.state.company_state) {
    //   console.log("company_state : ", this.state.company_state);
    // }

    if (prevState.listData !== this.state.listData) {
      console.log("listData : ", this.state.listData);
      console.log("listData.length : ", this.state.listData.length);
    }
  }

  /*********************************************************
   *
   * render()
   *
   *********************************************************/

  render() {
    return (
      <div>
        <>
          <title>Dreamtree</title>
          <div className="cs_renewal">
            <div
              className="LS_subheader white_type"
              include-html="./include/subheader.html"
            >
              <div className="title">회사정보조회 (Dreamtree) </div>
            </div>

            <div className="cs_container">
              <div className="cs_content">
                <div className="pageLayout">
                  <div className="pageLayout__title">
                    <div className="pageLayout__title--textBox">
                      <p className="title__text title__text--main">회사조회</p>
                      <p className="title__text title__text--sub">
                        회사 정보를 조회합니다.
                      </p>
                    </div>
                    <div className="pageLayout__title--optionBox" />
                  </div>
                  {/* 리스트 영역 노출 --division01 */}
                  {/* 조직도 영역 노출 --division02 */}
                  <div className="pageLayout__content">
                    <div className="section">
                      <div className="searchBox">
                        <dl className="searchBox__item">
                          <div className="division">
                            <dt>가입일</dt>
                            <dd>
                              <LUXPeriodDatePicker
                                valueFrom={this.state.start_date}
                                valueTo={this.state.end_date}
                                onChange={this.changeJoinDate}
                                onTouchTapOkButton={this.handleTouchTapOk}
                              />
                            </dd>
                          </div>
                          <div className="division">
                            <dt>사업자번호</dt>
                            <dd>
                              <div
                                className="LUX_basic_text LUX_renewal"
                                style={{ width: "100%", marginLeft: 4 }}
                              >
                                <LUXBusinessField
                                  width="180px"
                                  value={this.state.company_reg_no}
                                  hintText="사업자등록번호를 숫자형태로 입력해주세요."
                                  onChange={this.changeCompanyRegNo}
                                  valueOuterControl
                                />
                              </div>
                            </dd>
                          </div>
                          <div className="division">
                            <dt>회사상태</dt>
                            <dd>
                              <LUXSelectField
                                checkObjectList={true}
                                selectFieldData={company_state_list}
                                defaultData={this.state.company_state}
                                handleChoiceData={this.changeCompanyState}
                                listAutoHeight
                              />
                            </dd>
                          </div>
                          <div className="division">
                            <dt>회사명</dt>
                            <dd className="division division--justify">
                              {/* <LUXTextField
                                value={this.state.company_name_kr}
                                hintText="회사명을 입력해주세요."
                                editCheck={true}
                                onChange={this.changeCompanyNameKr}
                                // onChange={(e) =>
                                //   this.setState({ company_name_kr: e })
                                // }
                              /> */}
                              <LUXInputField
                                value={this.state.company_name_kr}
                                hintText="회사명을 입력해주세요."
                                onChange={this.changeCompanyNameKr}
                              />
                            </dd>
                          </div>

                          <div className="division">
                            <div className="bundle">
                              <button
                                type="button"
                                className="supports__button"
                                onClick={() => {
                                  this.setState({
                                    start_date: new Date(),
                                    end_date: new Date(),
                                    company_reg_no: "",
                                    company_state: 0,
                                    company_name_kr: "",
                                  });
                                  // this.setState(
                                  //   {
                                  //     start_date: new Date(),
                                  //     end_date: new Date(),
                                  //     company_reg_no: "",
                                  //     company_state: 0,
                                  //   },
                                  //   () => {
                                  //     this.setState({
                                  //       company_name_kr: "",
                                  //     });
                                  //   }
                                  // );
                                }}
                              >
                                초기화
                              </button>
                              <button
                                type="button"
                                className="supports__button supports__button--confirm"
                                onClick={() => {
                                  this.getCompanySearch();
                                }}
                              >
                                조회
                              </button>
                            </div>
                          </div>
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
                              <div className="col4">대표 관리자 이름</div>
                              <div className="col5">대표 관리자 연락처</div>
                              <div className="col6">대표 관리자 이메일</div>
                            </div>
                            {this.state.listData.length >= 1 ? (
                              <div className="list_body">
                                {this.state.listData.map((item, index) => (
                                  <div
                                    className="row"
                                    onClick={(e) => {
                                      this.setState({
                                        openPopup: true,
                                        listIndex: index,
                                      });
                                    }}
                                    key={index}
                                  >
                                    <div className="col1">
                                      {item.company_no}
                                    </div>
                                    <div className="col2">
                                      {item.company_reg_no}
                                    </div>
                                    <div className="col3">
                                      {item.company_name_kr}
                                    </div>
                                    <div className="col4">
                                      {item.ceo_name_kr}
                                    </div>
                                    <div className="col5">
                                      {item.user_contact}
                                    </div>
                                    <div className="col6">
                                      {item.user_email}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="list_body">
                                <div className="no_data">
                                  <p className="no_data_text">
                                    해당 기간에는 데이터가 존재하지 않습니다.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <React.Fragment>
            {/* 팝업 다이얼로그 */}
            {this.state.openPopup ? (
              <DreamtreePopup
                openPopup={this.state.openPopup}
                listIndex={this.state.listIndex}
                listData={this.state.listData}
                closePopup={this.closePopup}
              ></DreamtreePopup>
            ) : (
              <></>
            )}
          </React.Fragment>
        </>
      </div>
    );
  }
}

export default DreamtreeClass;
