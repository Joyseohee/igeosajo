import React, {Component} from "react";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import {Button} from "react-bootstrap";
import Api from "../api/Api";
import SelectReqterm from "../components/request/SelectReqterm";
import ReqReject from "../components/request/ReqReject";
import "../styled/Request.css";
import Modal1 from "../components/layout/Modal1";
import ConfirmModal from "../components/request/ConfirmModal";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
        this.state = {
            reqtermList: [],
            requestList: [],
            requestFileteredList: [],
            pickedReqterm: null,
            checkedRequest: [],
            showRejectModal: false,
            showApproveConfirmModal: false,
            showRejectConfirmModal: false,
            reqRejectReason: null,
            filter: null,
        }
        this.storeChecked = this.storeChecked.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getlist = this.getlist.bind(this);
        this.approve = this.approve.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setReqRejectReason = this.setReqRejectReason.bind(this);
        this.confirmReject = this.confirmReject.bind(this);
        this.setReqState = this.setReqState.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.confirmApprove = this.confirmApprove.bind(this);
        this.rejectCheck = this.rejectCheck.bind(this);
    }

    async componentDidMount() {
        try {
            this.getlist("reqterm", {usernum: this.props.usernum}, null, "reqtermList")
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.reqtermList !== this.state.reqtermList) {
            this.setState((state) => ({
                pickedReqterm: state.reqtermList[0].termyearmonth
            }))
            try {
                this.getlist("request", {termyearmonth: this.state.reqtermList[0].termyearmonth}, null, "requestList");
            } catch (e) {
                console.error(e);
            }
        }

        if (prevState.pickedReqterm !== this.state.pickedReqterm || prevState.filter !== this.state.filter) {
            try {
                this.getlist("request", {termyearmonth: this.state.pickedReqterm, reqstate:this.state.filter}, null, "requestFileteredList");
            } catch (e) {
                console.error(e);
            }
        }

        if (this.state.checkedRequest.length === 0 && prevState.checkedRequest !== this.state.checkedRequest) {
            setTimeout(() => {
                this.getlist("request", {termyearmonth: this.state.pickedReqterm}, null, "requestList");
                this.getlist("request", {termyearmonth: this.state.pickedReqterm, reqstate:this.state.filter}, null, "requestFileteredList");
            }, 500);
        }
    }


    getlist = (table, params, pk, stateName) => {
        new Api().read(table, params, pk).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                [stateName]: response,
            })
        })
    }

    async updateList(reqstate, reqstaging, reqrejectreason) {
        const requestparam = {"reqstate": reqstate, "reqstaging": reqstaging, "reqrejectreason": reqrejectreason};
        await this.state.checkedRequest.map((request) => {
            new Api().update("request", requestparam, request)
        })
    }

    approve = () => {
        this.setState({
            showApproveConfirmModal: true,
        })
    }

    reject = () => {
        this.setState({
            showRejectModal: true,
        })
    }

     rejectCheck = () => {
        this.setState({
            showRejectConfirmModal: true,
        })
    }

    setReqRejectReason(e) {
        console.log(e.target.value);
        this.setState({
            reqRejectReason: e.target.value,
        })
    }


    storeChecked = (reqnum) => {
        this.setState({
            checkedRequest: reqnum,
        })
        console.log(reqnum);
    }

    handleSelect(e) {
        let termyearmonth = e.target.value;
        if (termyearmonth != null) {
            this.setState({
                pickedReqterm: termyearmonth,
            })
        }
    }

    handleClose() {
        console.log(this.state);
        this.state.showRejectModal && this.setState({
            showRejectModal: false,
        });
        this.state.showApproveConfirmModal && this.setState({
            showApproveConfirmModal: false,
        });
        this.state.showRejectConfirmModal && this.setState({
            showRejectConfirmModal: false,
        })
    }

    handleConfirm(reqstate) {
        if (reqstate === '반려확인') {
            console.log(reqstate);
            this.rejectCheck();
            this.handleClose();
        }
        if (reqstate === '반려') {
            console.log(reqstate);
            this.confirmReject();
            this.handleClose();
        }
        if (reqstate === '승인') {
            this.confirmApprove();
            this.handleClose();
        }
    }

    confirmReject() {
        this.updateList("반려", "처리전", this.state.reqRejectReason)
            .then(() => {
                this.setState({
                    checkedRequest: [],
                })
            })
    }

    confirmApprove() {
        this.updateList("승인", "처리중", null)
            .then(() => {
                this.setState({
                    checkedRequest: [],
                })
            })
    }

    setReqState(param) {
        let filter = param;
        if (param === '전체') filter = null;
        this.setState({
            filter: filter,
        })
    }

    render() {
        const reqtermList = this.state.reqtermList;
        const filter = this.state.filter;
        const usernum = this.props.usernum;
        const requestList = this.state.filter !== null? this.state.requestFileteredList:this.state.requestList;
        const pickedReqterm = this.state.pickedReqterm;
        const checkedRequest = this.state.checkedRequest;
        const showRejectModal = this.state.showRejectModal;
        const showApproveConfirmModal = this.state.showApproveConfirmModal;
        const showRejectConfirmModal = this.state.showRejectConfirmModal;

        return (
            <div className="page-top request-wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    {reqtermList.length > 0 &&
                        <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>}
                </div>
                <ReqFilter setReqState={this.setReqState} requestList={this.state.requestList}/>
                <Button onClick={this.approve}>승인</Button>
                <Button onClick={this.reject}>반려</Button>
                <ReqList storeChecked={this.storeChecked}
                         termyearmonth={pickedReqterm}
                         requestList={requestList}
                         usernum={usernum}
                         filter={filter}
                         checkedRequest={checkedRequest}/>
                <ReqReject show={showRejectModal}
                           handleClose={this.handleClose}
                           setReqRejectReason={this.setReqRejectReason}
                           handleConfirm={this.handleConfirm}/>
                {showApproveConfirmModal && <ConfirmModal show={true} text={"신청을 승인하시겠습니까?"}
                                                          confirm={"승인"} handleClose={this.handleClose}
                                                          handleConfirm={this.handleConfirm}/>}
                {showRejectConfirmModal && <ConfirmModal show={true} text={"신청을 반려하시겠습니까?"}
                                                         confirm={"반려"} handleClose={this.handleClose}
                                                         handleConfirm={this.handleConfirm}/>}
            </div>
        );
    }
}

export default Request;