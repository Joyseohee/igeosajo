import React, {Component} from "react";
import {Form, Table} from "react-bootstrap";
import ReqListTbodyUser from "./ReqListTbodyUser";
class ReqListUser extends Component {
    constructor(props) {
        super(props);
    }

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

    handleCheckAll = (checked) => {
        this.props.handleCheckAll(checked);
    };

    render() {
        const {checkedRequest, filter, requestList, checkedAll} = this.props;

        return (
            <div className="wrapper">
                <div>요청 수 : {requestList.length}</div>
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th> {(filter==='대기') ||(filter==='전체') ?<Form.Check type={"checkbox"} name="checkedRequest" value={requestList}
                                        checked={checkedAll}
                                        onChange={(e) => this.handleCheckAll(e.target.checked)}
                                        /> : null}</th>
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
                            <ReqListTbodyUser request={request} key={request.reqnum} i={i}
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

export default ReqListUser;
