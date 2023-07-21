import { useReducer, useEffect } from "react";
import {
  LUXButton,
  LUXComplexPeriodDatePicker,
  LUXInputField,
  LUXMSelectField,
} from "luna-rocket";
import jinhankim988Store from "services/store/zustand/jinhankim988";

const firstDateOfMonth = (date) => {
  date.setDate(1);
  return date;
};

const lastDateOfMonth = (date) => {
  date.setMonth(date.getMonth() + 1);
  date.setDate(1);
  date.setDate(date.getDate() - 1);
  return date;
};

const init = {
  dateFrom: firstDateOfMonth(new Date()),
  dateTo: lastDateOfMonth(new Date()),
  company_reg_no: "",
  company_state: [
    { name: "사용", value: 0, checked: false },
    { name: "중지", value: 1, checked: false },
  ],
  company_name_kr: "",
};

const reducer = function (state, action) {
  // console.log("Search Panel reducer", action);
  switch (action.type) {
    case "change/date": {
      return {
        ...state,
        dateFrom: action.payload.from,
        dateTo: action.payload.to,
      };
    }
    case "change/company_reg_no": {
      return { ...state, company_reg_no: action.payload };
    }
    case "change/company_state": {
      return { ...state, company_state: action.payload };
    }
    case "change/company_name_kr": {
      return { ...state, company_name_kr: action.payload };
    }
    case "initialize": {
      return init;
    }
    default: {
      console.error("Unsupported Operation Exception", action.type);
      return state;
    }
  }
};

export const SearchPanel = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const getCompanyList = jinhankim988Store((state) => state.getCompanyList);

  useEffect(() => {
    getCompanyList(init);
  }, [getCompanyList]);

  const handleChangeDatePicker = (dateFrom, dateTo) => {
    dispatch({ type: "change/date", payload: { dateFrom, dateTo } });
  };
  const handleChangeRegNo = (e) => {
    dispatch({ type: "change/company_reg_no", payload: e.target.value });
  };
  const handleChangeState = (value) => {
    dispatch({ type: "change/company_state", payload: value });
  };
  const handleChangeName = (e) => {
    dispatch({ type: "change/company_name_kr", payload: e.target.value });
  };
  const handleClickInitialize = (e) => {
    dispatch({ type: "initialize" });
  };
  const handleClickSearch = (e) => {
    getCompanyList(state).then(() => dispatch({ type: "initialize" }));
  };

  return (
    <div className="section">
      <div className="searchBox">
        <dl className="searchBox__item">
          <div className="division">
            <dt>가입일</dt>
            <dd>
              <LUXComplexPeriodDatePicker
                valueFrom={state.dateFrom}
                valueTo={state.dateTo}
                onChange={handleChangeDatePicker}
              />
            </dd>
          </div>
          <div className="division">
            <dt>사업자 등록번호</dt>
            <dd>
              <LUXInputField
                value={state.company_reg_no}
                hintText="사업자번호를 입력하세요."
                onChange={handleChangeRegNo}
              />
            </dd>
          </div>
          <div className="division">
            <dt>회사 상태</dt>
            <dd>
              <LUXMSelectField
                data={state.company_state}
                onChange={handleChangeState}
              />
            </dd>
          </div>
          <div className="division">
            <dt>회사명</dt>
            <dd className="division division--justify">
              <LUXInputField
                value={state.company_name_kr}
                onChange={handleChangeName}
              />
            </dd>
          </div>
        </dl>
      </div>
      <LUXButton
        onClick={handleClickInitialize}
        type="confirm"
        label="초기화"
      />
      <LUXButton
        onClick={handleClickSearch}
        type="confirm"
        blue={true}
        label="조회"
      />
    </div>
  );
};
