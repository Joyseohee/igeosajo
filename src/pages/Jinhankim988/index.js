import { Subheader } from "./Subheader";
import { Title } from "./Title";
import { Content } from "./Content";
import { CompanyDetailDialog } from "./CompanyDetailDialog";
import "./cs_renewal.css";

const Jinhankim988 = () => {
  return (
    <>
      <div className="container">
        <div className="containerin">
          <div className="content">
            <div className="cs_renewal">
              <Subheader title="회사 정보 조회" />
              <div className="cs_container">
                <div className="cs_content">
                  <div className="pageLayout">
                    <Title main="회사조회" sub="회사 정보를 조회합니다." />
                    <Content />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompanyDetailDialog />
    </>
  );
};

export default Jinhankim988;
