import {ajax} from 'common';
const globals = require('global/' + process.env.REACT_APP_DEPLOY_TYPE);

const testAPI = {
    getTestName: () => {
        const url = `${globals.wehago_backend}/common/alivecheck`;
        return ajax.get(url).then((response) => {
           response = JSON.parse(response);
           return response;
        });
    },
}

export default testAPI;