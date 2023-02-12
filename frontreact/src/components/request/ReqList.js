import React, {Component} from "react";
import {Form, Table} from "react-bootstrap";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: null,
            allChecked: false,
            checkedRequests: null,
        };
    }

    handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        this.setState((prevState, prevProps) => {
            console.log(prevProps);
            let newState;
            if (name === "allChecked") {
                newState = {
                    ...prevState,
                    requestList: prevProps.requestList.map((request) => ({
                        ...request,
                        checked: checked,
                    })),
                    allChecked: checked,
                    checkedRequests: checked
                        ? prevProps.requestList.filter((request) => request.reqstate === "대기")
                        : [],
                };
            } else {
                let index = name.charAt(name.length - 1) - 1;
                let newRequestList = [...prevProps.requestList];
                newRequestList[index].checked = checked;

                newState = {
                    ...prevState,
                    requestList: newRequestList,
                };

                let allChecked = newRequestList.every((request) => request.checked);

                newState = {
                    ...newState,
                    allChecked: allChecked,
                };

                let checkedRequests = prevProps.checkedRequest.filter(
                    (request) => request.reqnum !== newRequestList[index].reqnum
                );

                if (checked) {
                    checkedRequests = [...checkedRequests, newRequestList[index]];
                }

                newState = {
                    ...newState,
                    checkedRequests: checkedRequests,
                };
            }
            this.props.updateState({
                requestFilteredList: newState.requestList,
                checkedRequest: newState.checkedRequests,
            })
            return newState
        });
    };

    render() {
        const {requestList, checkedRequest} = this.props;
        const {allChecked} = this.state;
        console.log(requestList);
        console.log(checkedRequest);

        return (
            <div className="wrapper">
                <div>요청 수: {requestList.length}</div>
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th>
                            <Form.Check
                                name="allChecked"
                                checked={allChecked}
                                onChange={this.handleCheckboxChange}
                            />
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
                            <tr key={request.reqnum}>
                                <td>{i + 1}</td>
                                <td>{request.reqnum}</td>
                                <td><Form.Check name={`request${i + 1}`}
                                                checked={request.checked}
                                                hidden={request.reqstate !== '대기'}
                                                onChange={(e) => this.handleCheckboxChange(e)}
                                /></td>
                                <td>{request.prodname}</td>
                                <td>{request.reqcount}</td>
                                <td>{request.reqdate}</td>
                                <td>{request.username}</td>
                                <td>{request.reqstate}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ReqList;
