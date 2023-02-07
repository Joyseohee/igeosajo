import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Form, Table} from "react-bootstrap";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
        }
    }

    handleCheckAll = (checked) => {
        const requestList = this.props.requestList;
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

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.setState({
                checkedAll: false,
            });
        }
        if (prevProps.checkedRequest !== this.props.checkedRequest &&
            this.props.checkedRequest.length === 0) {
            this.setState({
                checkedAll: false,
            });
        }
    }

    render() {
        const {requestList, checkedRequest, filter} = this.props;
        const {checkedAll} = this.state;
        const disabled = this.props.filter==='대기'?false:true;

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
