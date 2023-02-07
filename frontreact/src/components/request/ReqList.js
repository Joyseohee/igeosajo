import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Form, Table} from "react-bootstrap";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
    }

    handleCheckAll(checked) {
        const requestList = this.props.requestList;
        let arr = [];
        requestList.map((request) => {
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

    componentDidUpdate(prevProps) {
        if (prevProps.checkedRequest !== this.props.checkedRequest && this.props.checkedRequest.length === 0 ) {
            console.log(prevProps.checkedRequest)
            console.log(this.props.checkedRequest)
            console.log(this.props.checkedRequest.length)
            this.setState({
                checkedAll: false,
            })
        }
    }

    render() {
        const requestList = this.props.requestList;
        return (
            <div className="wrapper">
                <div>요청 수 : {requestList.length}</div>
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th>
                            <Form.Check type={"checkbox"} name="checkedRequest" value={requestList}
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
                    {requestList.map((request, i) => {
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
