import React, {Component} from "react";

export default class Api extends Component {
    create = (table, params, pk) => {
        return this.fetchData(table, params, pk, 'POST');
    };

    read = (table, params, pk) => {
        return this.fetchData(table, params, pk, 'GET');
    };

    update = (table, params, pk) => {
        return this.fetchData(table, params, pk, 'PUT');
    };

    request = (params, pk) => {
        let api = 'http://127.0.0.1:8000/api/request';
        if (pk !== null) api += `/${pk}`;
        if (params !== null) {
            const arrayParamKeys = Object.keys(params);
            if (arrayParamKeys.length > 0) {
                api += '?';
                api += arrayParamKeys
                    .map((param) => {
                        if (param === 'usernum' && params.usernum !== null) {
                            return `usernum=${params.usernum}`;
                        } else if (param === 'reqstate' && params.reqstate !== null) {
                            return `reqstate=${params.reqstate}`;
                        } else if (param === 'termyearmonth' && params.termyearmonth !== null) {
                            return `termyearmonth=${params.termyearmonth}`;
                        } else if (param==='pagenum') {
                            return `pagenum=${params.pagenum}`;
                        }
                        return '';
                    })
                    .filter((str) => str !== '')
                    .join('&');
            }
        }

        return api;
    };

    fetchData = (table, params, pk, method) => {
        let api = '';
        if (table === 'request') {
            api = this.request(params, pk);
        } else if (table === 'reqterm') {
            api = this.reqterm(params, pk);
        } else if (table === 'user') {
            api = this.user(params, pk);
        }

        const options = {method};
        if (method === 'POST' || method === 'PUT') {
            options.headers = {
                'Content-Type': 'application/json; charset=utf-8',
            };
            options.body = JSON.stringify(params);
        }
        return fetch(api, options);
    };

    reqterm = (params, pk) => {
        let api = 'http://127.0.0.1:8000/api/reqterm';
        if (pk !== null) api += `/${pk}`;

        if (params !== null) {
            const arrayParamKeys = Object.keys(params);
            if (arrayParamKeys.length > 0) {
                api += '?';
                api += arrayParamKeys
                    .map((param) => {
                        if (param === 'usernum') {
                            return `usernum=${params.usernum}`;
                        }
                        return '';
                    })
                    .filter((str) => str !== '')
                    .join('&');
            }
        }

        return api;
    };

    user = (params) => {
        let api = "http://127.0.0.1:8000/api/user?usernum=" + params.usernum;
        return api;
    }
}
