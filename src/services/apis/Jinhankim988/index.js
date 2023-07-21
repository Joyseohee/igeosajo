import { ajax } from "common";
const globals = require("global/" + process.env.REACT_APP_DEPLOY_TYPE);
// const base = `http://localhost:8080/wehago-task1/jinhankim988`; // local test
const base = `${globals.wehago_backend}/wehago-task1/jinhankim988`; // deploy

const jinhankim988Api = {
  getCompanyList: (param) => {
    const requestParam = {
      ...param,
      dateFrom: dateFormat(param.dateFrom),
      dateTo: dateFormat(param.dateTo),
      company_state:
        param.company_state.filter((cs) => cs.checked).map((cs) => cs.value) ??
        [],
    };
    const url = `${base}/company/list`;
    return ajax
      .post(url, requestParam)
      .then((response) => (response = JSON.parse(response)));
  },
  getCompanyDetails: (dialogCompanyNo) => {
    const url = `${base}/company/details/${dialogCompanyNo}`;
    console.log("getCompanyDetails", dialogCompanyNo, url);
    return ajax.get(url).then((response) => (response = JSON.parse(response)));
  },
};

export default jinhankim988Api;

const dateFormat = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m < 10 ? 0 : ""}${m}-${d < 10 ? 0 : ""}${d}`;
};
