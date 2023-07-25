import React, { Component } from "react";

class DreamtreePopup extends Component {
  openPopup = this.props.openPopup;
  closePopup = this.props.closePopup;
  listData = this.props.listData;
  listIndex = this.props.listIndex;

  constructor(props) {
    super(props);

    this.state = {
      // openPopup: this.props.openPopup,
    };
  }

  /*********************************************************
   *
   * 함수 및 API
   *
   *********************************************************/

  /*********************************************************
   *
   * LifeCycle
   *
   *********************************************************/

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  /*********************************************************
   *
   * render()
   *
   *********************************************************/

  render() {
    return (
      <div>
        <>
          <div className="al">
            <div className="LUX_basic_dialog">
              <div className="dimmed" />
              <div className="dialog_wrap_tbl">
                <div className="dialog_wrap_tblcel">
                  {/* [D] 다이얼로그 컴퍼넌트 dialogBoxStyle 영역에  padding:0;border:0;border-radius:10px 추가 */}
                  <div
                    className="dialog_wrap"
                    style={{ border: 0, borderRadius: 20 }}
                  >
                    <div
                      className="dialog_content roundstyle dz_font cs_dialog50"
                      style={{ width: 408 }}
                    >
                      {/* 데이터형태 */}
                      <div className="dialog_data" style={{ display: "block" }}>
                        <div className="dialog_data_tit">
                          <h1>회사 정보 상세보기</h1>
                          <button
                            type="button"
                            className="LUX_basic_btn btn_clr"
                            onClick={() => {
                              this.props.closePopup();
                            }}
                          >
                            <span className="sp_lux">닫기</span>
                          </button>
                        </div>
                        <div className="dialog_data_area nopadding">
                          {" "}
                          {/* 내부 스크롤 생성 */}
                          <div className="dialog_data_section">
                            <div className="common_tbl_round th_gray">
                              <table>
                                <caption>
                                  <span className="blind">입력</span>
                                </caption>
                                <colgroup>
                                  <col style={{ width: 120 }} />
                                  <col />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      회사번호
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .company_no
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      사업자번호
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .company_reg_no
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      회사명
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .company_name_kr
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      회사상태
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {this.props.listData[this.listIndex]
                                          .company_state === 0
                                          ? "사용"
                                          : "중지"}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      업태
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .business_format
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      업종
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .business_type
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      대표자명
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .ceo_name_kr
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" className="txtlft">
                                      멤버십
                                    </th>
                                    <td>
                                      <div className="inbx">
                                        {
                                          this.props.listData[this.listIndex]
                                            .membership_code
                                        }
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
                        <button
                          type="button"
                          className="common_round_btn sizeBig blue"
                          onClick={() => {
                            this.props.closePopup();
                          }}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}

export default DreamtreePopup;
