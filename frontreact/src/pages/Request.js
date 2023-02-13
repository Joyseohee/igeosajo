import React, {Component} from "react";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import ConfirmModal from "../components/request/ConfirmModal";
import "../styled/Request.css";
import Goal from "../components/Goal";
import reqtermList from "../components/reqterm/ReqtermList";
import RequestButtons from "../components/request/RequestButtons";
import Paging from "../components/layout/Paging";

class Request extends Component {
    constructor(props) {
        super(props);
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
        this.props.setpagename("사무용품 신청 관리");
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
            reqstate: this.state.requestFilter!=='전체'?this.state.requestFilter:null,
        }, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState(() =>({
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

        if (showRejectModal) {
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
                    {reqtermList[0] !== 'reqtermList' &&
                        <SelectReqterm
                            reqtermList={reqtermList}
                            updateState={this.updateState}
                            pageNum={pageNum}
                            pageCount={pageCount}
                        />
                    }
                    {requestList[0] !== 'requestList'&&
                        <ReqFilter
                            selectedFilter={requestFilter}
                            requestList={requestList}
                            selectedReqterm={selectedReqterm}
                            updateState={this.updateState}
                            pageNum={pageNum}
                            pageCount={pageCount}
                        />
                    }
                    {available === 1 &&
                        <RequestButtons updateState={this.updateState}/>
                    }
                    {requestFilteredList[0] !== 'requestFilteredList'  && requestFilteredList.length > 0  &&
                        <>
                            <ReqList
                                allChecked={allChecked}
                                requestList={requestFilteredList}
                                requestFilter={requestFilter}
                                checkedRequest={checkedRequest}
                                updateState={this.updateState}
                                pageNum={this.state.pageNum}
                                pageCount={this.state.pageCount}
                            />
                            <Paging
                                pageNum={this.state.pageNum}
                                setPageNum={this.setPageNum}
                                pageCount={this.state.pageCount}
                            />
                        </>
                    }
                    {showConfirmModal &&
                        <ConfirmModal
                            show={showConfirmModal}
                            text={modalMessage}
                            confirm={confirmText}
                            modalType={modalType}
                            reqRejectReason={reqRejectReason}
                            selectedReqterm={selectedReqterm}
                            checkedRequest={checkedRequest}
                            updateState={this.updateState}
                        />}
                </div>
            </div>);
    }
}

export default Request;