import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import ConfirmModal from "../components/request/ConfirmModal";
import "../styled/Request.css";
import Goal from "../components/Goal";

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: ['requestList'],
            requestFilteredList: ['requestFilteredList'],
            reqtermList: ['reqtermList'],
            selectedReqterm: null,
            checkedRequest: [],
            filter: null,
            checkedAll: false,
            showRejectModal: false,
            showApproveConfirmModal: false,
            showRejectConfirmModal: false,
            reqRejectReason: null,
        }
    }

    componentDidMount() {
        this.props.setpagename("사무용품 신청 관리");
        let reqtermList = [];
        new Api().read("reqterm", {usernum: this.props.usernum}, null)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                reqtermList = response;
                return new Api().read("request", {termyearmonth: response[0].termyearmonth}, null);
            })
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    requestList: response,
                    reqtermList: reqtermList,
                    requestFilteredList: response,
                    selectedReqterm: reqtermList[0].termyearmonth,
                })
            })
            .catch(error => console.error(error));
    }

    approve = () => {
        this.setState({showApproveConfirmModal: true});
    };

    reject = () => {
        this.setState({showRejectModal: true});
    };

    rejectConfirm = () => {
        this.setState({showRejectConfirmModal: true});
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

    handleConfirm = (reqstate) => {
        reqstate === '반려확인' ? this.rejectConfirm() : this.confirmUpdate(reqstate);
        this.handleClose();
    };

    confirmUpdate = (reqstate) => {
        this.state.checkedRequest.map((request) => {
            return new Api().update("request", {
                "reqstate": reqstate,
                "reqstaging": "처리전",
                "reqrejectreason": reqstate === '반려' ? this.state.reqRejectReason : null
            }, request)
        });
        setTimeout(() => {
            new Api().read("request", {termyearmonth: this.state.selectedReqterm}, null)
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        requestList: response,
                        requestFilteredList: response,
                        filter: '전체',
                        checkedRequest: [],
                        checkedAll: false,
                    });
                })
                .catch((error) => console.error(error));
        }, 500);
        alert(reqstate + "되었습니다.");
    };

    setReqRejectReason = (e) => {
        this.setState({reqRejectReason: e.target.value});
    };

    storeChecked = (reqnum) => {
        this.setState({
            checkedRequest: reqnum,
        });
    };

    handleSelect = (e) => {
        const termyearmonth = e.target.value;
        new Api().read("request", {termyearmonth: termyearmonth}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState({
                requestList: response,
                requestFilteredList: response,
                selectedReqterm: termyearmonth,
                filter: '전체',
                reqRejectReason: null,
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
                requestFilteredList: response, filter: param,
            });
        })
    };

    handleCheckAll = (checked) => {
        const requestList = this.state.requestFilteredList;
        const arr = requestList.map((request) => request.reqnum);
        this.setState((state) => ({
            checkedAll: !state.checkedAll,
        }));
        this.storeChecked(checked ? arr : []);
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
            checkedAll
        } = this.state;

        const showConfirmModal = showRejectModal ? showRejectModal : showApproveConfirmModal ? showApproveConfirmModal : showRejectConfirmModal ? showRejectConfirmModal : false;
        const modalType = showRejectModal ? "반려확인" : showApproveConfirmModal ? "신청" : showRejectConfirmModal ? "반려" : null;
        const modalMessage = showRejectModal ? "반려 사유를 입력해주세요." : showApproveConfirmModal ? "신청을 승인하시겠습니까?" : showRejectConfirmModal ? "신청을 반려하시겠습니까?" : null;
        const confirmText = showApproveConfirmModal ? "승인" : showRejectConfirmModal || showRejectModal ? "반려" : null;

        console.log(requestList[0] === 'requestList');

        return (<div className="page-top request-wrapper">
            <Goal comment={"신청 관리"}/>
            <div className="request">
                {reqtermList[0] !== 'reqtermList' &&
                    <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>}
                {requestList[0] !== 'requestList' &&
                    <ReqFilter selectedFilter={filter} requestList={requestList} setReqState={this.setReqState}
                               selectedReqterm={selectedReqterm}/>}
                {filter === '대기' && <>
                    <Button onClick={this.approve}>승인</Button>
                    <Button onClick={this.reject}>반려</Button>
                </>}
                {requestList[0] !== 'requestList' &&
                    <ReqList storeChecked={this.storeChecked}
                             requestList={requestFilteredList}
                             filter={filter}
                             checkedAll={checkedAll}
                             handleCheckAll={this.handleCheckAll}
                             checkedRequest={checkedRequest}/>}
                    <ConfirmModal show={showConfirmModal}
                              text={modalMessage}
                              confirm={confirmText}
                              modalType={modalType}
                              setReqRejectReason={this.setReqRejectReason}
                              handleClose={this.handleClose}
                              handleConfirm={this.handleConfirm}/>
            </div>
        </div>);
    }
}

export default Request;