import React, {Component} from "react";
import "../styled/Request.css";
import Api from "../api/Api";
import Goal from "../components/Goal";
import SelectReqterm from "../components/request/SelectReqterm";
import reqtermList from "../components/reqterm/ReqtermList";
import ReqFilter from "../components/request/ReqFilter";
import RequestButtons from "../components/request/RequestButtons";
import ReqList from "../components/request/ReqList";
import Paging from "../components/layout/Paging";
import ConfirmModal from "../components/request/ConfirmModal";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
        this.state = {
            requestList: ['requestList'],
            requestFilteredList: ['requestFilteredList'],
            reqtermList: ['reqtermList'],
            selectedReqterm: null,
            checkedRequest: [],
            allChecked: false,
            requestFilter: '전체',
            showRejectModal: false,
            showApproveConfirmModal: false,
            showRejectConfirmModal: false,
            showFinalModal: false,
            reqRejectReason: null,
            available: 0,
            pageNum: 1,
            pageCount: 1
        }
    }


    componentDidMount() {
        let reqtermList = [];
        let available = null;
        new Api().read("reqterm", {usernum: this.props.user.usernum}, null)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                reqtermList = response;
                available = response.filter(term => term.termyearmonth === response[0].termyearmonth)[0].termavailable;
                return new Api().read("request", {termyearmonth: response[0].termyearmonth}, null);
            })
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    requestList: response.map((request) => ({
                        ...request,
                        checked: false,
                    })),
                    reqtermList: reqtermList,
                    requestFilteredList: response.map((request) => ({
                        ...request,
                        checked: false,
                    })),
                    selectedReqterm: reqtermList[0].termyearmonth,
                    available: available,
                    pageCount: response.length
                })
            })
            .catch(error => console.error(error));
    }

    updateState = (newValues) => {
        this.setState(newValues);
    };

    setPageNum = (e) => {
        this.setState({pageNum: e})
        new Api().read("request", {
            termyearmonth: this.state.selectedReqterm,
            reqstate: this.state.requestFilter !== '전체' ? this.state.requestFilter : null,
        }, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState(() => ({
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                allChecked: false,
                checkedRequest: [],
            }));
        })
    }

    render() {
        const {
            requestList,
            reqtermList,
            requestFilteredList,
            selectedReqterm,
            requestFilter,
            checkedRequest,
            showRejectModal,
            showApproveConfirmModal,
            showRejectConfirmModal,
            showFinalModal,
            reqRejectReason,
            available,
            pageNum,
            pageCount,
            allChecked
        } = this.state;

        let showConfirmModal;
        let modalType;
        let modalMessage;
        let confirmText;
        if (checkedRequest.length < 1 && (showRejectModal || showApproveConfirmModal)) {
            showConfirmModal = true;
            modalType = "신청없음";
            modalMessage = "선택한 신청 내역이 없습니다.";
            confirmText = "확인";
        } else if (showRejectModal) {
            showConfirmModal = true;
            modalType = "반려확인";
            modalMessage = "반려 사유를 입력해주세요.";
            confirmText = "반려";
        } else if (showApproveConfirmModal) {
            showConfirmModal = true;
            modalType = "승인";
            modalMessage = "신청을 승인하시겠습니까?";
            confirmText = "승인";
        } else if (showRejectConfirmModal) {
            showConfirmModal = true;
            modalType = "반려";
            modalMessage = "신청을 반려하시겠습니까?";
            confirmText = "반려";
        } else if (showFinalModal) {
            showConfirmModal = true;
            confirmText = "확인";
        } else {
            showConfirmModal = null;
            modalType = null;
            modalMessage = null;
            confirmText = null;
        }

        return (
            <div className="page-top request-wrapper">
                <Goal comment={"신청 관리"}/>
                <div className="request">
                    <div className="request-select-button-filter-wrapper">
                        <div className="request-select-button-wrapper">
                            {reqtermList[0] !== 'reqtermList' &&
                                <SelectReqterm
                                    reqtermList={reqtermList}
                                    updateState={this.updateState}
                                    pageNum={pageNum}
                                    pageCount={pageCount}
                                />
                            }
                            {available === 1 && (requestFilter === '대기' || requestFilter === '전체') &&
                                <RequestButtons updateState={this.updateState} checkedRequest={checkedRequest}/>
                            }
                            {available === 0 && reqtermList[0] !== 'reqtermList' &&
                                <div className="request-alert-wrapper">
                                    <div className="request-alert-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem"
                                             fill="rgb(248, 103, 106)" className="bi bi-exclamation-diamond-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                    </div>
                                    <div className="request-alert-text">
                                        <p>현재 마감된 신청기간입니다.</p>
                                        <p>신청 승인/반려가 불가능합니다.</p>
                                    </div>
                                </div>
                            }
                        </div>
                        {requestList[0] !== 'requestList' &&
                            <ReqFilter
                                selectedFilter={requestFilter}
                                requestList={requestList}
                                selectedReqterm={selectedReqterm}
                                updateState={this.updateState}
                                pageNum={pageNum}
                                pageCount={pageCount}
                            />
                        }
                    </div>
                    {(requestFilteredList[0] !== 'requestFilteredList') &&
                        <>
                            <ReqList
                                selectedFilter={requestFilter}
                                allChecked={allChecked}
                                available={available}
                                requestList={requestFilteredList}
                                requestFilter={requestFilter}
                                checkedRequest={checkedRequest}
                                updateState={this.updateState}
                                pageNum={this.state.pageNum}
                                pageCount={this.state.pageCount}
                            />
                            <Paging
                                showNum={10}
                                pageNum={this.state.pageNum}
                                setPageNum={this.setPageNum}
                                pageCount={this.state.pageCount}
                            />
                        </>
                    }
                    {showConfirmModal &&
                        <ConfirmModal
                            requestFilter={requestFilter}
                            show={showConfirmModal}
                            text={modalMessage}
                            confirm={confirmText}
                            modalType={modalType}
                            reqRejectReason={reqRejectReason}
                            selectedReqterm={selectedReqterm}
                            checkedRequest={checkedRequest}
                            updateState={this.updateState}
                        />
                    }
                </div>
            </div>);
    }
}

export default Request;