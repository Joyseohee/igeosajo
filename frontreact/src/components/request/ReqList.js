import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Form, Table} from "react-bootstrap";
import Api from "../../api/Api";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: [],
            checkedAll: false,
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.termyearmonth !== this.props.termyearmonth) {
            console.log("기간 변경");
            try {
                this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestList");
            } catch (e) {
                console.error(e);
            }
        }

        if (prevProps.filter !== this.props.filter) {
            console.log("필터 변경");
            try {
                this.getlist("request", {
                    termyearmonth: this.props.termyearmonth,
                    reqstate: this.props.filter
                }, null, "requestList");
                this.setState({
                    checkedAll: false,
                });
            } catch (e) {
                console.error(e);
            }
        }
        if (prevProps.checkedRequest !== this.props.checkedRequest &&
            this.props.checkedRequest.length === 0) {
            console.log("체크 바뀔 때");
            setTimeout(() => {
                this.getlist("request", {
                    termyearmonth: this.props.termyearmonth,
                    reqstate: this.props.filter
                }, null, "requestList");
            }, 500);
        }
    }

    getlist = (table, params, pk, stateName) => {
        new Api().read(table, params, pk).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                [stateName]: response,
            })
        })
    }

    handleCheckAll = (checked) => {
        const requestList = this.state.requestList;
        const arr = requestList.map((request) => request.reqnum);

        this.setState({
            checkedAll: !this.state.checkedAll,
        });

        this.props.storeChecked(checked ? arr : []);
    };

    handleCheck = (e) => {
        const arr = this.props.checkedRequest;
        const value = e.target.value;
        const checkIndex = arr.findIndex((item) => item === value);
        if (checkIndex === -1) {
            arr.push(value);
        } else {
            arr.splice(checkIndex, 1);
        }

        this.props.storeChecked(arr);
    };

    render() {
        const {checkedRequest, filter} = this.props;
        const {checkedAll, requestList} = this.state;
        const disabled = this.props.filter === '대기' ? false : true;

        return (
            <div className="wrapper">
                <div>요청 수 : {requestList.length}</div>
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th><Form.Check type={"checkbox"} name="checkedRequest" value={requestList}
                                        onChange={(e) => this.handleCheckAll(e.target.checked)}
                                        checked={checkedAll} disabled={disabled}/></th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requestList.map((request, i) => {
                        return (
                            <ReqListTbody request={request} key={request.reqnum} i={i}
                                          handleCheck={this.handleCheck}
                                          checkedAll={checkedAll}
                                          checkedRequest={checkedRequest}
                                          filter={filter}
                            />
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ReqList;
