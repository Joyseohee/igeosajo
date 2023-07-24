import { ajax } from 'common';
const globals = require('global/' + process.env.REACT_APP_DEPLOY_TYPE);

const callApi = {
  getCompList: (param) => {
    const url = `${globals.wehago_task1}/wehago-task1/kmc0541/getCompList`;
    return ajax.post(url, param).then((response) => {
      response = JSON.parse(response);
      return response;
    });
  },

  getCompDetail: (param) => {
    const url = `${globals.wehago_task1}/wehago-task1/kmc0541/getCompDetail`;
    return ajax.post(url, param).then((response) => {
      response = JSON.parse(response);
      return response;
    });
  },
};

export default callApi;
