import React, {Component} from "react";
import {Form, Table} from "react-bootstrap";
import request from "../../pages/Request";

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
        const {requestList} = this.props.requestList
        this.setState((prevState, prevProps) => {
            let newState;
            if (name === "allChecked") {

                // newState = {
                //     ...prevState,
                //     requestList: prevProps.requestList.map((request) => ({
                //         ...request,
                //         checked: checked,
                //     })),
                //     allChecked: checked,
                //     checkedRequests: checked
                //         ? prevProps.requestList.filter((request) => request.reqstate === "대기")
                //         : [],
                // };

                let prevRequestList = prevProps.requestList;
                let pageCount = Math.ceil(prevRequestList.length / 10);
                let pages = [];
                for (let i = 0; i < pageCount; i++) {
                    pages.push(prevRequestList.slice(i * 10, (i + 1) * 10));
                }

                let arr = prevProps.requestList
                            .filter((request) => request.reqstate === "대기")
                    arr = arr.filter((request) => {
                        console.log(request)
                        pages.some((page) => page.includes(request))
                    });


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
                    checkedRequests: checked
                        ? prevProps.requestList
                            .filter((request) => request.reqstate === "대기")
                            .filter((request) => pages.some((page) => page.includes(request)))
                        : [],
                };


            } else {
                let index = parseInt(name.slice(7), 10) - 1;
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
        const {requestList, checkedRequest, requestFilter} = this.props;
        let {allChecked} = this.state;
        let pageCount = requestList && Math.ceil(requestList.length / 10);
        let pages = [];
        for (let i = 0; i < pageCount; i++) {
            pages.push(requestList.slice(i * 10, (i + 1) * 10));
        }
        let long = requestList.length;

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
                        console.log(request)
                        return (
                            <tr key={request.reqnum}>
                                <td>{i + 1 + (this.props.pageNum - 1) * 10}</td>
                                <td>{request.reqnum}</td>
                                <td>
                                    <Form.Check
                                        name={`request${i + 1}`}
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