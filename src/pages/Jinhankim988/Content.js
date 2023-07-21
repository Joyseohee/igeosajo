import jinhankim988Store from "services/store/zustand/jinhankim988";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { SearchPanel } from "./SearchPanel";

const columns = [
  "회사번호",
  "사업자번호",
  "회사명",
  "대표 관리자 이름",
  "대표 관리자 연락처",
  "대표 관리자 이메일",
];

export const Content = () => {
  const companyList = jinhankim988Store((state) => state.companyList);

  return (
    <div className="pageLayout__content">
      <SearchPanel />
      <div className="section v100">
        <div className="basicGroup v100">
          <div className="basicGroup__content v100">
            <div className="common_boxtbl style_basic cs_tbl_08_02 vflex v100">
              <TableHeader columns={columns} />
              <TableBody data={companyList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
