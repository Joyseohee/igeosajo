import "./Dreamtree.css";

// getCompanyDetail() {

// }

const Dreamtree = () => {
  return (
    <div>
      <>
        <title>Dreamtree</title>
        <div className="cs_renewal">
          <div
            className="LS_subheader white_type"
            include-html="./include/subheader.html"
          >
            <div className="title">Dreamtree - 함수형</div>
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
                            <div className="searchBox__calendar">
                              {/* element 선언된 Style 속성들 빠짐없이 다 넣어주세요. */}
                              {/* element에 Style 속성 적용 안될시 문의부탁드립니다. */}
                              <div className="date_gap" style={{ flex: 1 }}>
                                {/* LUX Component 사용 */}
                                <div
                                  className="LUX_basic_date LUX_renewal"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    className="datebx"
                                    style={{ width: "100%" }}
                                  >
                                    <span
                                      className="inpbx"
                                      style={{ height: 22, paddingTop: 6 }}
                                    >
                                      <input
                                        type="text"
                                        id="btn_date3"
                                        defaultValue="2021.06.02"
                                        style={{ fontSize: 14 }}
                                      />
                                      <label htmlFor="btn_date3" />
                                    </span>
                                    <button type="button" className="btn">
                                      {/*
                                                                              imageUrl="https://static.wehago.com/imgs/eln/sp_eln_renewal.png"
                                                                              innerStyle={{ backgroundPosition: '-41px 0', backgroundSize: '250px 250px', width: '14px', height: '14px' }}
                                                                          */}
                                      <span
                                        className="sp_lux"
                                        style={{
                                          width: 14,
                                          height: 14,
                                          backgroundImage:
                                            "url(https://static.wehago.com/imgs/eln/sp_eln_renewal.png)",
                                          backgroundPosition: "-41px 0",
                                          backgroundSize: "250px 250px",
                                        }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="dash">~</div>
                              <div className="date_gap" style={{ flex: 1 }}>
                                {/* LUX Component 사용 */}
                                <div
                                  className="LUX_basic_date LUX_renewal"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    className="datebx"
                                    style={{ width: "100%" }}
                                  >
                                    <span
                                      className="inpbx"
                                      style={{ height: 22, paddingTop: 6 }}
                                    >
                                      <input
                                        type="text"
                                        id="btn_date3"
                                        defaultValue="2021.06.02"
                                        style={{ fontSize: 14 }}
                                      />
                                      <label htmlFor="btn_date3" />
                                    </span>
                                    <button type="button" className="btn">
                                      {/*
                                                                              imageUrl="https://static.wehago.com/imgs/eln/sp_eln_renewal.png"
                                                                              innerStyle={{ backgroundPosition: '-41px 0', backgroundSize: '250px 250px', width: '14px', height: '14px' }}
                                                                          */}
                                      <span
                                        className="sp_lux"
                                        style={{
                                          width: 14,
                                          height: 14,
                                          backgroundImage:
                                            "url(https://static.wehago.com/imgs/eln/sp_eln_renewal.png)",
                                          backgroundPosition: "-41px 0",
                                          backgroundSize: "250px 250px",
                                        }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </dd>
                        </div>
                        <div className="division">
                          <dt>사업자번호</dt>
                          <dd>
                            <div
                              className="LUX_basic_text LUX_renewal"
                              style={{ width: "100%", marginLeft: 4 }}
                            >
                              {/* 입력창에 포커스 - inpbx class="on" 추가  */}
                              <div
                                className="inpbx"
                                style={{
                                  float: "left",
                                  width: "100%",
                                  minWidth: 75,
                                }}
                              >
                                <input
                                  type="text"
                                  id="libText1"
                                  style={{
                                    fontFamily: "douzone !important",
                                    fontSize: 14,
                                  }}
                                  defaultValue=""
                                  placeholder="사업자번호를 입력해주세요."
                                  title="내용입력"
                                />
                              </div>
                            </div>

                            {/* <div
                              className="LUX_basic_select LUX_renewal"
                              style={{
                                float: "left",
                                width: "100%",
                                minWidth: 75,
                              }}
                            > */}
                            {/* <div className="searchbx">
                                <span className="inpbx">
                                  <span
                                    className="placeholder text_black"
                                    style={{
                                      fontFamily: "douzone !important",
                                      fontSize: 14,
                                    }}
                                  >
                                    전체
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
                                  <div className="result_scrallin">
                                    <ul className="result_lst">
                                      <li>
                                        <a href="#">
                                          <div>개인</div>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <div>공동</div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div> */}
                            {/* </div> */}
                          </dd>
                        </div>
                        <div className="division">
                          <dt>회사상태</dt>
                          <dd>
                            <div
                              className="LUX_basic_select LUX_renewal"
                              style={{
                                float: "left",
                                width: "100%",
                                minWidth: 75,
                              }}
                            >
                              <div className="searchbx">
                                <span className="inpbx">
                                  <span
                                    className="placeholder text_black"
                                    style={{
                                      fontFamily: "douzone !important",
                                      fontSize: 14,
                                    }}
                                  >
                                    전체
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
                                          <div>사용</div>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <div>중지</div>
                                        </a>
                                      </li>
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
                            {/* <div
                              className="LUX_basic_select LUX_renewal"
                              style={{ width: 85 }}
                            > */}
                            {/* <div className="searchbx">
                                <span className="inpbx">
                                  <span
                                    className="placeholder text_black"
                                    style={{
                                      fontFamily: "douzone !important",
                                      fontSize: 14,
                                    }}
                                  >
                                    전체
                                  </span>
                                </span>
                                <button type="button" className="btn">
                                  <span className="sp_lux">검색</span>
                                </button>
                              </div> */}
                            {/* <div className="resultbx">
                              <div
                                className="result_scrall"
                                style={{ maxHeight: 100 }}
                              > */}
                            {/* 스크롤 생성 height 높이값 제어 */}
                            {/* <div className="result_scrallin">
                                  <ul className="result_lst">
                                    <li>
                                      <a href="#">
                                        <div>메뉴1</div>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <div>메뉴2</div>
                                      </a>
                                    </li>
                                  </ul>
                                </div> */}
                            {/* </div>
                            </div> */}
                            {/* </div> */}
                            <div
                              className="LUX_basic_text LUX_renewal"
                              style={{ width: 210, marginLeft: 4 }}
                            >
                              {/* 입력창에 포커스 - inpbx class="on" 추가  */}
                              <div className="inpbx">
                                <input
                                  type="text"
                                  id="libText1"
                                  style={{
                                    fontFamily: "douzone !important",
                                    fontSize: 14,
                                  }}
                                  defaultValue=""
                                  placeholder="회사명을 입력해주세요."
                                  title="내용입력"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="bundle">
                            <button type="button" className="supports__button">
                              초기화
                            </button>
                            <button
                              type="button"
                              className="supports__button supports__button--confirm"
                            >
                              조회
                            </button>
                          </div>
                        </dd>
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
                          <div className="list_body">
                            <div
                              className="row"
                              // onClick={this.getCompanyDetail()}
                            >
                              <div className="col1">
                                <p className="ellipsis">
                                  YYYY.MM.DD
                                  <span className="bar" />
                                  HH:MM:SS
                                </p>
                              </div>
                              <div className="col2">
                                <p className="ellipsis">김더존</p>
                              </div>
                              <div className="col3">
                                <p className="ellipsis">
                                  더존비즈온&gt;디자인센터&gt;UX/UI1팀
                                </p>
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
        </div>
      </>
    </div>
  );
};

export default Dreamtree;
