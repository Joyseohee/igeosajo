import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import ConfirmModal from "../components/request/ConfirmModal";
import "../styled/Request.css";
import Goal from "../components/Goal";
import reqtermList from "../components/reqterm/ReqtermList";
import RequestButtons from "../components/request/RequestButtons";

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: ['requestList'],
            requestFilteredList: ['requestFilteredList'],
            reqtermList: ['reqtermList'],
            selectedReqterm: null,
            checkedRequest: [],
            filter: '전체',
            showRejectModal: false,
            showApproveConfirmModal: false,
            showRejectConfirmModal: false,
            reqRejectReason: null,
            available: 0,
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
                })
                console.log(available);
            })
            .catch(error => console.error(error));
    }


    updateState = (newValues) => {
        this.setState(newValues);
    };

    rejectConfirm = () => {
        this.setState({showRejectConfirmModal: true, showRejectModal: false});
    };

    handleConfirm = (reqstate) => {
        reqstate === '반려확인' ? this.rejectConfirm() : this.confirmUpdate(reqstate);
        this.handleClose();
    };

    handleClose = () => {
        const {showRejectModal, showApproveConfirmModal, showRejectConfirmModal} = this.state;
        if (showRejectModal) {
            this.setState({showRejectModal: false});
        } else if (showApproveConfirmModal) {
            this.setState({showApproveConfirmModal: false});
        } else if (showRejectConfirmModal) {
            this.setState({showRejectConfirmModal: false});
        }
    };

    confirmUpdate = (reqstate) => {
        this.state.checkedRequest.map((request) => {
            return new Api().update("request", {
                "reqstate": reqstate,
                "reqstaging": "처리전",
                "reqrejectreason": reqstate === '반려' ? this.state.reqRejectReason : null
            }, request.reqnum)
        });
        setTimeout(() => {
            new Api().read("request", {termyearmonth: this.state.selectedReqterm}, null)
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        requestList: response.map((request) => ({
                            ...request,
                            checked: false,
                        })),
                        requestFilteredList: response.map((request) => ({
                            ...request,
                            checked: false,
                        })),
                        filter: '전체',
                        checkedRequest: [],
                    });
                })
                .catch((error) => console.error(error));
        }, 500);
        alert(reqstate + "되었습니다.");
    };

    setReqRejectReason = (e) => {
        this.setState({reqRejectReason: e.target.value});
    };

    storeChecked = (checkedRequest, requestList) => {
        this.setState({
            requestFilteredList: requestList,
            checkedRequest: checkedRequest,
        });
    };

    handleSelect = (e) => {
        let available = this.state.reqtermList.filter(term => term.termyearmonth === this.state.selectedReqterm)
        available = available.length > 0 ? available[0].termavailable : 0;
        const termyearmonth = e.target.value;
        new Api().read("request", {termyearmonth: termyearmonth}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState({
                requestList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                selectedReqterm: termyearmonth,
                filter: '전체',
                reqRejectReason: null,
                available: available,
            });
        })
    };

    setReqState = (param) => {
        let filter = param === '전체' ? null : param;
        new Api().read("request", {termyearmonth: this.state.selectedReqterm, reqstate: filter}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState({
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                filter: param,
            });
        })
    };

    render() {
        const {
            requestList,
            reqtermList,
            requestFilteredList,
            selectedReqterm,
            filter,
            checkedRequest,
            showRejectModal,
            showApproveConfirmModal,
            showRejectConfirmModal,
            available
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
                        <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>
                    }
                    {requestList[0] !== 'requestList' &&
                        <ReqFilter
                            selectedFilter={filter}
                            requestList={requestList}
                            setReqState={this.setReqState}
                            selectedReqterm={selectedReqterm}
                        />
                    }
                    {available === 1 &&
                        <RequestButtons updateState={this.updateState}/>
                        // <Button onClick={this.approve}>승인</Button>
                        // <Button onClick={this.reject}>반려</Button>
                    }
                    {requestFilteredList[0] !== 'requestFilteredList' &&
                        <ReqList
                            storeChecked={this.storeChecked}
                            requestList={requestFilteredList}
                            checkedRequest={checkedRequest}
                        />
                    }
                    {showConfirmModal &&
                        <ConfirmModal
                            show={showConfirmModal}
                            text={modalMessage}
                            confirm={confirmText}
                            modalType={modalType}
                            setReqRejectReason={this.setReqRejectReason}
                            handleClose={this.handleClose}
                            handleConfirm={this.handleConfirm}
                            // updateState={this.updateState}
                        />}
                </div>
            </div>);
    }
}

export default Request;