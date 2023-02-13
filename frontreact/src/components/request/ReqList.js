import React, {Component} from "react";
import {Form, Table} from "react-bootstrap";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: null,
            allChecked: false,
            checkedRequest: null,
        };
    }

    handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        this.setState((prevState, prevProps) => {
            let newState;
            if (name === "allChecked") {
                let prevRequestList = prevProps.requestList;
                let pageCount = Math.ceil(prevRequestList.length / 10);
                let pages = [];
                for (let i = 0; i < pageCount; i++) {
                    pages.push(prevRequestList.slice(i * 10, (i + 1) * 10));
                }

                let checkInPage = pages[this.props.pageNum - 1].filter((page) => (page.reqstate === "대기"));

                newState = {
                    ...prevState,
                    requestList: prevProps.requestList.map((request) => {
                        let checked = false;
                        pages.forEach((page) => {
                            if (page.includes(request)) {
                                checked = true;
                            }
                        });
                        return {
                            ...request,
                            checked: checked,
                        };
                    }),
                    allChecked: checked,
                    checkedRequest: checked
                        ? checkInPage
                        : [],
                };
            } else {
                let index = parseInt(name.slice(7), 10);
                let newRequestList = [...prevProps.requestList];
                const indexOfRequest = newRequestList.findIndex((request) => request.reqnum === index);
                newRequestList[indexOfRequest].checked = checked;

                newState = {
                    ...prevState,
                    requestList: newRequestList,
                };

                let allChecked = newRequestList.every((request) => request.checked);

                newState = {
                    ...newState,
                    allChecked: allChecked,
                };

                let checkedRequest = prevProps.checkedRequest.filter(
                    (request) => request.reqnum !== newRequestList[indexOfRequest].reqnum
                );

                if (checked) {
                    checkedRequest = [...checkedRequest, newRequestList[indexOfRequest]];
                }

                newState = {
                    ...newState,
                    checkedRequest: checkedRequest,
                };
            }
            this.props.updateState({
                requestFilteredList: newState.requestList,
                allChecked: newState.allChecked,
                checkedRequest: newState.checkedRequest,
            })
            return newState
        });
    };

    render() {
        const {requestList, allChecked} = this.props;
        let pageCount = requestList && Math.ceil(requestList.length / 10);
        let pages = [];
        for (let i = 0; i < pageCount; i++) {
            pages.push(requestList.slice(i * 10, (i + 1) * 10));
        }

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
                    {pages[this.props.pageNum - 1].map((request, i) => {
                        return (
                            <tr key={request.reqnum}>
                                <td>{i + 1 + (this.props.pageNum - 1) * 10}</td>
                                <td>{request.reqnum}</td>
                                <td>
                                    <Form.Check
                                        name={`request${request.reqnum}`}
                                        checked={request.checked}
                                        hidden={request.reqstate !== '대기'}
                                        onChange={e => this.handleCheckboxChange(e)}
                                    />
                                </td>
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
{/*{requestList.map((request, i) => {*/
}
{/*    return (*/
}
{/*        <tr key={request.reqnum}>*/
}
{/*            <td>{i + 1}</td>*/
}
{/*            <td>{request.reqnum}</td>*/
}
{/*            <td><Form.Check name={`request${i + 1}`}*/
}
{/*                            checked={request.checked}*/
}
{/*                            hidden={request.reqstate !== '대기'}*/
}
{/*                            onChange={(e) => this.handleCheckboxChange(e)}*/
}
{/*            /></td>*/
}
{/*            <td>{request.prodname}</td>*/
}
{/*            <td>{request.reqcount}</td>*/
}
{/*            <td>{request.reqdate}</td>*/
}
{/*            <td>{request.username}</td>*/
}
{/*            <td>{request.reqstate}</td>*/
}
{/*        </tr>*/
}
{/*    );*/
}
{/*})}*/
}