import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import ReqReject from "../components/request/ReqReject";
import ConfirmModal from "../components/request/ConfirmModal";
import "../styled/Request.css";

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

        if (prevState.pickedReqterm !== this.state.pickedReqterm) {
            try {
                this.getlist("request", {termyearmonth: this.state.pickedReqterm}, null, "requestList");
            } catch (e) {
                console.error(e);
            }
        }

        if (prevState.filter !== this.state.filter) {
            try {
                this.getlist("request", {
                    termyearmonth: this.state.pickedReqterm,
                    reqstate: this.state.filter
                }, null, "requestFileteredList");
            } catch (e) {
                console.error(e);
            }
        }

        if (this.state.checkedRequest.length === 0 && prevState.checkedRequest !== this.state.checkedRequest) {
            setTimeout(() => {
                this.getlist("request", {termyearmonth: this.state.pickedReqterm}, null, "requestList");
                this.getlist("request", {
                    termyearmonth: this.state.pickedReqterm,
                    reqstate: this.state.filter
                }, null, "requestFileteredList");
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
        this.setState({showApproveConfirmModal: true});
    };

    reject = () => {
        this.setState({showRejectModal: true});
    };

    rejectCheck = () => {
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
        reqstate === '반려확인' ? this.rejectCheck() : this.confirmUpdate(reqstate);
        this.handleClose();
    };

    confirmUpdate = (reqstate) => {
        this.updateList(reqstate, "처리전", reqstate === '반려' ? this.state.reqRejectReason : null)
            .then(() => {
                this.setState({
                    checkedRequest: [],
                });
            });
    };

    setReqRejectReason = (e) => {
        this.setState({reqRejectReason: e.target.value});
    };

    storeChecked = (reqnum) => {
        this.setState({checkedRequest: reqnum});
    };

    handleSelect = (e) => {
        const termyearmonth = e.target.value;
        if (termyearmonth) {
            this.setState({pickedReqterm: termyearmonth});
        }
    };

    setReqState = (param) => {
        let filter = param;
        if (param === '전체') filter = null;
        this.setState({filter});
    };


    render() {
        const {
            reqtermList,
            filter,
            pickedReqterm,
            checkedRequest,
            showRejectModal,
            showApproveConfirmModal,
            showRejectConfirmModal
        } = this.state;
        const usernum = this.props.usernum;
        const requestList = this.state.filter !== null ? this.state.requestFileteredList : this.state.requestList;

        return (
            <div className="page-top request-wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    {reqtermList.length > 0 &&
                        <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>}
                </div>
                <ReqFilter setReqState={this.setReqState} requestList={this.state.requestList}/>
                {filter === '대기' && <Button onClick={this.approve}>승인</Button>}
                {filter === '대기' && <Button onClick={this.reject}>반려</Button>}
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