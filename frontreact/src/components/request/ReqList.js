import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Form, Table} from "react-bootstrap";
import Api from "../../api/Api";
import request from "../../pages/Request";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestlist: [],
            checkedAll: false,
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.getlist = this.getlist.bind(this);
    }

    async componentDidMount() {
        try {
            console.log(this.props.termyearmonth);
            if (this.props.filter !== null) this.getlist("request", {
                termyearmonth: this.props.termyearmonth,
                reqstate: this.props.filter
            }, null, "requestlist");
            else this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.termyearmonth !== this.props.termyearmonth || prevProps.filter !== this.props.filter) {
            try {
                if (this.props.filter !== null) this.getlist("request", {
                    termyearmonth: this.props.termyearmonth,
                    reqstate: this.props.filter
                }, null, "requestlist");
                else this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
            } catch (e) {
                console.error(e);
            }
        }

        if (this.props.checkedRequest.length === 0 && prevProps.checkedRequest !== this.props.checkedRequest) {
            console.log(this.props.checkedRequest);
            setTimeout(() => {
                this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
            }, 500);
        }
    }

    getlist = (table, params, pk, stateName) => {
        new Api().read(table, params, pk).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                [stateName]: response,
                checkedAll: false,
            })
        })
    }

    handleCheckAll(checked) {
        let arr = [];
        this.state.requestlist.map((request) => {
            arr.push(request.reqnum);
        })
        this.setState({
            checkedAll: !this.state.checkedAll,
        })
        if (checked) {
            this.props.storeChecked(arr);
        } else {
            this.props.storeChecked([]);
        }
    }

    handleCheck(e) {
        let arr = this.props.checkedRequest;
        let check = arr.findIndex(item => item === e.target.value);
        if (check === -1) arr.push(e.target.value);
        else arr.splice(check, 1);
        this.props.storeChecked(arr);
    }


    render() {
        const requestlist = this.state.requestlist;
        return (
            <div className="wrapper">
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th>
                            <Form.Check type={"checkbox"} name="checkedRequest" value={requestlist}
                                        onChange={(e) => this.handleCheckAll(e.target.checked)}
                                        checked={this.state.checkedAll}/>
                        </th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requestlist.map((request, i) => {
                        return (
                            <ReqListTbody request={request} key={request.reqnum} i={i}
                                          handleCheck={this.handleCheck}
                                          checkedAll={this.state.checkedAll}
                                          checkedRequest={this.props.checkedRequest}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ReqList;
