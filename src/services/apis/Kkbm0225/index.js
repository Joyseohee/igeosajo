import { ajax } from 'common';
const globals = require('global/' + process.env.REACT_APP_DEPLOY_TYPE);
const base = `${globals.wehago_backend}/wehago-task1/kkbm0225`; // deploy

const callApi = {
  getCompList: (param) => {
  console.log("param index");
  console.log(param);
    const url = `${globals.wehago_task1}/wehago-task1/kkbm0225/list`;
    return ajax.post(url, param).then((response) => {
      response = JSON.parse(response);
      return response;
    });
  },


  getCompDetail: (param) => {
    console.log("param index");
    console.log(param);
      const url = `${globals.wehago_task1}/wehago-task1/kkbm0225/detail`;
      return ajax.post(url, param).then((response) => {
        response = JSON.parse(response);
        return response;
      });
    },
};



export default callApi;
