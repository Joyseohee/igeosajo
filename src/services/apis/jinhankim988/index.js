import { ajax } from "common";
const globals = require("global/" + process.env.REACT_APP_DEPLOY_TYPE);

const jinhankim988Api = {
  echo: (param) => {
    const url = `${globals.wehagoTask}/jinhankim988/echo`;
    return ajax
      .post(url, param)
      .then((response) => (response = JSON.parse(response)));
  },
  getCompanyList: (param) => {
    const requestParam = {
      ...param,
      dateFrom: dateFormat(param.dateFrom),
      dateTo: dateFormat(param.dateTo),
      company_state: param.company_state
        .filter((cs) => cs.checked)
        .map((cs) => cs.value),
    };
    const queryString = Object.entries(requestParam)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `${globals.wehagoTask}/jinhankim988/company/list`;
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
