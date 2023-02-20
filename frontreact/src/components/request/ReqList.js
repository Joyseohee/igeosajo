import React, {Component} from "react";
import {Form, Table} from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";
import CommonUtil from "../../util/CommonUtil";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: null,
            allChecked: false,
            checkedRequest: null,
            showRejectReasonModal: 0,
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
                        let checked = !request.checked;
                        pages.forEach((page) => {
                            if (page.includes(request)) {
                                checked = !prevProps.allChecked;
                            }
                        });
                        return {
                            ...request,
                            checked: checked,
                        };
                    }),
                    allChecked: checked,
                    checkedRequest: checked
                        ? checkInPage : [],
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

    handleShowReajectReason = (reqrejectreason) => {
        if (reqrejectreason !== null) {
            this.setState({
                showRejectReasonModal: reqrejectreason
            })
        }
    }
    updateState = (newValues) => {
        this.setState(newValues);
    };

    render() {
        const {requestList, allChecked, available, selectedFilter, pageNum} = this.props;
        const {showRejectReasonModal} = this.state;
        let pageCount = requestList && Math.ceil(requestList.length / 10);
        let pages = [];
        for (let i = 0; i < pageCount; i++) {
            pages.push(requestList.slice(i * 10, (i + 1) * 10));
        }

        let showConfirmModal;
        let modalType;
        let modalMessage;
        let confirmText;

        if (showRejectReasonModal !== 0) {
            showConfirmModal = true;
            modalType = "반려이유확인";
            modalMessage = showRejectReasonModal;
            confirmText = "확인";
        } else {
            showConfirmModal = false;
        }

        let checkAllHidden = false;
        if (pages.length < 1) {
            checkAllHidden = true;
        } else {
            checkAllHidden = !pages.some((page) => page.some((request) => request.reqstate.includes('대기')));
        }

        return (
            <>
                <div className="request-list-wrapper">
                    <Table bordered hover>
                        <thead className="request-list-table-head">
                        <tr>
                            <th className="request-list-table-col check">
                                <Form.Check
                                    name="allChecked"
                                    checked={allChecked}
                                    hidden={available === 0 || selectedFilter === '승인' || selectedFilter === '반려' || checkAllHidden}
                                    onChange={this.handleCheckboxChange}
                                />
                            </th>
                            <th className="request-list-table-col num">번호</th>
                            <th className="request-list-table-col name">품목명</th>
                            <th className="request-list-table-col count">수량</th>
                            <th className="request-list-table-col price">가격</th>
                            <th className="request-list-table-col date">요청일자</th>
                            <th className="request-list-table-col date">승인일자</th>
                            <th className="request-list-table-col writer">요청자</th>
                            <th className="request-list-table-col state">상태</th>
                            <th className="request-list-table-col staging">처리상태</th>
                        </tr>
                        </thead>
                        {pages.length > 0 ?
                            <tbody>
                            {pages[pageNum - 1].map((request, i) => {
                                return (
                                    <tr key={request.reqnum}
                                        value={request.reqrejectreason}
                                        onClick={(e) => {
                                            this.handleShowReajectReason(request.reqrejectreason)
                                        }}
                                        className={request.reqstate === '반려' ? "request-list-click able" : "request-list-click disable"}>
                                        <td>
                                            <Form.Check
                                                name={`request${request.reqnum}`}
                                                checked={request.checked}
                                                hidden={request.reqstate !== '대기' || available === 0}
                                                onChange={e => this.handleCheckboxChange(e)}
                                            />
                                        </td>
                                        <td>{i + 1 + (this.props.pageNum - 1) * 10}</td>
                                        <td className="request-list-table-td name">{request.prodname}</td>
                                        <td>{request.reqcount}</td>
                                        <td>{new CommonUtil().numberComma(request.reqprice)}원</td>
                                        <td>{request.reqdate}</td>
                                        <td>{request.reqapvdate ? request.reqapvdate : "신청 처리 전"}</td>
                                        <td>{request.username}</td>
                                        <td>{request.reqstate}</td>
                                        <td>{request.reqstaging}</td>
                                    </tr>
                                );
                            })}
                            </tbody> :
                            <tbody>
                            <tr>
                                <td colSpan={10}>신청 내역이 없습니다.</td>
                            </tr>
                            </tbody>
                        }
                    </Table>
                </div>
                <ConfirmModal
                    show={showConfirmModal}
                    text={modalMessage}
                    confirm={confirmText}
                    modalType={modalType}
                    updateState={this.updateState}/>
            </>
        );
    }
}

export default ReqList;