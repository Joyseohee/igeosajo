import { LUXDialog, LUXButton } from "luna-rocket";
import jinhankim988Store from "services/store/zustand/Jinhankim988";
import shallow from "zustand/shallow";

const membership = {
  WC: "WEHAGO Club",
  WH: "WEHAGO Hybrid",
  WT: "WEHAGO TAX Accountant",
};

export const CompanyDetailDialog = () => {
  const [dialogCompany, isOpen, setIsDialogOpen] = jinhankim988Store(
    (state) => [state.dialogCompany, state.isDialogOpen, state.setIsDialogOpen],
    shallow
  );

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <LUXDialog
      onRequestClose={true}
      handleOnReqeustClose={handleClose}
      handleOnEscClose={handleClose}
      dialogOpen={isOpen}
      dialogButton={[
        <LUXButton
          label="확인"
          onClick={handleClose}
          style={{
            width: "60px",
            height: "30px",
            marginLeft: "5px",
            background: "#03A9F4",
            border: "none",
            color: "#fff",
          }}
        />,
      ]}
    >
      <div
        className="dialog_content roundstyle dz_font cs_dialog50"
        style={{ width: "408px" }}
      >
        <div className="dialog_data" style={{ display: "block" }}>
          <div className="dialog_data_tit">
            <h1>회사 정보 상세 보기</h1>
            <button
              type="button"
              className="LUX_basic_btn btn_clr"
              onClick={handleClose}
            >
              <span className="sp_lux">닫기</span>
            </button>
          </div>
          <div className="dialog_data_area nopadding">
            <div className="dialog_data_section">
              <div className="common_tbl_round th_gray">
                <table>
                  <caption>
                    <span className="blind">입력</span>
                  </caption>
                  <colgroup>
                    <col style={{ width: "120px" }} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" className="txtlft">
                        회사번호
                      </th>
                      <td>
                        <div className="inbx">
                          <div className="serviceLicense">
                            <span className="serviceLicense__name">
                              {dialogCompany.company_no}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        사업자번호
                      </th>
                      <td>
                        <div className="inbx">
                          <div className="serviceLicense ellipsis">
                            {dialogCompany.company_reg_no}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        회사명
                      </th>
                      <td>
                        <div className="inbx">
                          <p className="ellipsis">
                            {dialogCompany.company_name_kr}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        회사상태
                      </th>
                      <td>
                        <div className="inbx">
                          {dialogCompany.company_state === 0
                            ? "사용"
                            : "미사용"}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        업태
                      </th>
                      <td>
                        <div className="inbx">
                          {dialogCompany.business_format}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        업종
                      </th>
                      <td>
                        <div className="inbx">
                          {dialogCompany.business_type}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        대표자명
                      </th>
                      <td>
                        <div className="inbx">{dialogCompany.ceo_name_kr}</div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="txtlft">
                        맴버십
                      </th>
                      <td>
                        <div className="inbx">
                          {membership[dialogCompany.membership_code]}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </LUXDialog>
  );
};
