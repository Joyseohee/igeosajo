import "./DreamtreePopup.css";

const DreamtreePopup = () => {
  return (
    <div>
      <>
        {/* {this.state.openPopup ? */}
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
                        <h1>서비스 해지 신청</h1>
                        <button type="button" className="LUX_basic_btn btn_clr">
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
                                    서비스 명
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <p className="ellipsis">전자결재</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지 예정일
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <p className="ellipsis">2023년 2월 1일</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지사유
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      {/* [D] LUXComponent 사용해주세요. */}
                                      <div
                                        className="LUX_basic_select LUX_renewal"
                                        style={{ width: "100%" }}
                                      >
                                        <div className="searchbx">
                                          <span className="inpbx">
                                            <span className="placeholder text_black">
                                              기타
                                            </span>
                                          </span>
                                          <button type="button" className="btn">
                                            <span className="sp_lux">검색</span>
                                          </button>
                                        </div>
                                        <div className="resultbx">
                                          <div
                                            className="result_scrall"
                                            style={{ maxHeight: 100 }}
                                          >
                                            {/* 스크롤 생성 height 높이값 제어 */}
                                            <div className="result_scrallin">
                                              <ul className="result_lst">
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft vatop">
                                    <label htmlFor="inputText">사유입력</label>
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="common_textarea_countbox2">
                                        <div className="textareaBox">
                                          <textarea
                                            id="inputText"
                                            placeholder="최대 150자까지 입력가능합니다."
                                            title="내용입력"
                                            defaultValue={""}
                                          />
                                        </div>
                                        <span
                                          className="count_text"
                                          aria-label="글자수"
                                        >
                                          최대글자 <em>(30/150)</em>
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="dialog_data_section mgv2">
                          <div className="warningBox">
                            <strong className="warningBox__notice">
                              꼭 확인해주세요!
                            </strong>
                            <ul className="warningBox__list">
                              <li className="warningBox__listItem">
                                <em className="text_blue">2023년 2월 1일</em>
                                까지 사용 후 서비스가 자동해지 됩니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지 예정일 전까지 서비스해지 신청을 취소할 수
                                있습니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지된 서비스의 데이터는 해지 후 90일만
                                보관되며, 90일 이내 서비스 재구매 시 데이터를
                                이어서 사용 가능합니다.
                              </li>
                            </ul>
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
                        className="common_round_btn sizeBig"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="common_round_btn sizeBig disabled3"
                      >
                        해지신청
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
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
                        <h1>서비스 해지 신청</h1>
                        <button type="button" className="LUX_basic_btn btn_clr">
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
                                    서비스 명
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="serviceLicense">
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <em className="serviceLicense__name serviceLicense__name--depth">
                                          라이선스 : 6
                                        </em>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    사용 모듈
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="serviceLicense ellipsis">
                                        {/* [D] 모듈이 늘어났을 때 말줄임 처리 필요합니다. */}
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <span className="serviceLicense__name">
                                          급여관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          물류관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <span className="serviceLicense__name">
                                          급여관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          물류관리
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지 예정일
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <p className="ellipsis">2024년 2월 1일</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지사유
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      {/* [D] LUXComponent 사용해주세요. */}
                                      <div
                                        className="LUX_basic_select LUX_renewal"
                                        style={{ width: "100%" }}
                                      >
                                        <div className="searchbx">
                                          <span className="inpbx">
                                            <span className="placeholder text_black">
                                              서비스 이용량이 적어서
                                            </span>
                                          </span>
                                          <button type="button" className="btn">
                                            <span className="sp_lux">검색</span>
                                          </button>
                                        </div>
                                        <div className="resultbx">
                                          <div
                                            className="result_scrall"
                                            style={{ maxHeight: 100 }}
                                          >
                                            {/* 스크롤 생성 height 높이값 제어 */}
                                            <div className="result_scrallin">
                                              <ul className="result_lst">
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#">
                                                    <div>select list</div>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft vatop">
                                    <label htmlFor="inputText">사유입력</label>
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="common_textarea_countbox2">
                                        <div className="textareaBox">
                                          <textarea
                                            id="inputText"
                                            placeholder="최대 150자까지 입력가능합니다."
                                            title="내용입력"
                                            defaultValue={""}
                                          />
                                        </div>
                                        <span
                                          className="count_text"
                                          aria-label="글자수"
                                        >
                                          최대글자 <em>(30/150)</em>
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="dialog_data_section mgv2">
                          <div className="warningBox">
                            <strong className="warningBox__notice">
                              꼭 확인해주세요!
                            </strong>
                            <ul className="warningBox__list">
                              <li className="warningBox__listItem">
                                <em className="text_blue">2023년 2월 1일</em>
                                까지 사용 후 서비스가 자동해지 됩니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지 예정일 전까지 서비스해지 신청을 취소할 수
                                있습니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지된 서비스의 데이터는 해지 후 90일만
                                보관되며, 90일 이내 서비스 재구매 시 데이터를
                                이어서 사용 가능합니다.
                              </li>
                            </ul>
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
                        className="common_round_btn sizeBig"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="common_round_btn sizeBig blue"
                      >
                        해지신청
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
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
                        <h1>서비스 해지 신청</h1>
                        <button type="button" className="LUX_basic_btn btn_clr">
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
                                    신청자
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="serviceLicense ellipsis">
                                        <span className="serviceLicense__name">
                                          김더존 과장
                                        </span>
                                        <em className="serviceLicense__name serviceLicense__name--depth">
                                          플랫폼사업부문&gt;서비스개발2센터&gt;개발2Cell
                                        </em>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지 신청일
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <p className="ellipsis">2023년 2월 1일</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    서비스 명
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="serviceLicense">
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <em className="serviceLicense__name serviceLicense__name--depth">
                                          라이선스 : 6
                                        </em>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    사용 모듈
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <div className="serviceLicense ellipsis">
                                        {/* [D] 모듈이 늘어났을 때 말줄임 처리 필요합니다. */}
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <span className="serviceLicense__name">
                                          급여관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          물류관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          Smart A 10
                                        </span>
                                        <span className="serviceLicense__name">
                                          급여관리
                                        </span>
                                        <span className="serviceLicense__name">
                                          물류관리
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    해지 예정일
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <p className="ellipsis">2023년 2월 1일</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" className="txtlft">
                                    사유입력
                                  </th>
                                  <td>
                                    <div className="inbx">
                                      <dl className="reasonBox">
                                        <dt>기타</dt>
                                        <dd>
                                          서비스의 사용량이 많지 않아 서비스
                                          해지 신청합니다.
                                        </dd>
                                      </dl>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="dialog_data_section mgv2">
                          <div className="warningBox">
                            <strong className="warningBox__notice">
                              꼭 확인해주세요!
                            </strong>
                            <ul className="warningBox__list">
                              <li className="warningBox__listItem">
                                <em className="text_blue">2023년 2월 1일</em>
                                까지 사용 후 서비스가 자동해지 됩니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지 예정일 전까지 서비스해지 신청을 취소할 수
                                있습니다.
                              </li>
                              <li className="warningBox__listItem">
                                해지된 서비스의 데이터는 해지 후 90일만
                                보관되며, 90일 이내 서비스 재구매 시 데이터를
                                이어서 사용 가능합니다.
                              </li>
                            </ul>
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
                        className="common_round_btn sizeBig"
                      >
                        서비스해지 취소
                      </button>
                      <button
                        type="button"
                        className="common_round_btn sizeBig blue"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {/* [D] Dialog 커스텀 필요합니다. style 값에 아래 내용 다 추가해주세요. */}
                <div
                  className="dialog_wrap"
                  style={{ border: 0, borderRadius: 20, padding: "0 0 30px 0" }}
                >
                  <div
                    className="dialog_content roundstyle dz_font cs_dialog50"
                    style={{ width: 536 }}
                  >
                    {/* 데이터형태 */}
                    <div className="dialog_data" style={{ display: "block" }}>
                      <div className="dialog_data_tit customHeader">
                        <p className="serviceBenefit__notice">
                          기업의 회계 및 인사업무를 관리하는 스마트한{" "}
                          <em>Smart A 10</em>
                        </p>
                        <h1 className="serviceBenefit__title dzt_font">
                          <em>Smart A 10</em> 서비스 구매 시 제공 혜택
                        </h1>
                      </div>
                      <div className="dialog_data_area nopadding customContent">
                        {" "}
                        {/* 내부 스크롤 생성 */}
                        <div className="dialog_data_section">
                          <strong className="serviceBenefit__info dz_font">
                            <em className="serviceBenefit__info--add">
                              추가 혜택
                            </em>
                            이 가득한{" "}
                            <em className="serviceBenefit__info--service">
                              Smart A 10 서비스를
                            </em>
                            조금 더 이용해 보시는건 어떠세요?
                          </strong>
                          <div className="serviceBenefitList">
                            <div className="serviceBenefitInfo">
                              <em>CLUB 플랜</em> 대상 제공 혜택
                            </div>
                            <ul className="serviceBenefitList__bundle">
                              <li className="serviceBenefitList__item">
                                <span className="numberCircle dzt_font">1</span>
                                <em className="textOption--ft16">플랜</em> 월
                                기본료{" "}
                                <span className="textOption--highlight">
                                  <em className="textOption--blue">20,000</em>
                                  <em className="textOption--won">원</em> 매월
                                  할인
                                </span>
                              </li>
                              <li className="serviceBenefitList__item">
                                <span className="numberCircle dzt_font">2</span>
                                <em className="textOption--ft18">
                                  사용자 라이선스
                                </em>{" "}
                                <span className="textOption--highlight">
                                  <em className="textOption--blue">5</em>
                                  <em className="textOption--won">개</em>{" "}
                                  <em className="textOption--ft16">추가제공</em>
                                </span>
                              </li>
                              <li className="serviceBenefitList__item">
                                <span className="numberCircle dzt_font">3</span>
                                <em className="textOption--ft16">
                                  Smart A 10
                                </em>{" "}
                                <em className="textOption--ft14">
                                  구매수량만큼
                                </em>{" "}
                                <span className="textOption--highlight">
                                  <em className="textOption--blue">
                                    사용자 라이선스
                                  </em>{" "}
                                  <em className="textOption--ft16">추가제공</em>
                                </span>
                              </li>
                              <li className="serviceBenefitList__item">
                                <span className="numberCircle dzt_font">4</span>
                                <em className="textOption--ft16">
                                  법인카드 서비스 라이선스
                                </em>{" "}
                                <span className="textOption--highlight">
                                  <em className="textOption--ft16">카드</em>{" "}
                                  <em className="textOption--blue">3</em>
                                  <em className="textOption--won">개</em>{" "}
                                  <em className="textOption--ft16">제공</em>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="dialog_data_section"
                          style={{ marginTop: 14 }}
                        >
                          <ul className="serviceWarning">
                            <li className="serviceWarning__item">
                              Smart A 10 구매로 추가 제공되었던 라이선스는
                              서비스 해지 시 추가된 금액으로 서비스 요금이
                              청구됩니다.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* //데이터형태 */}
                  </div>
                  <div className="dialog_btnbx">
                    <div>
                      <button
                        type="button"
                        className="common_round_btn sizeBig"
                      >
                        그만 이용하기
                      </button>
                      <button
                        type="button"
                        className="common_round_btn sizeBig blue"
                      >
                        계속 이용하기
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
};

export default DreamtreePopup;
