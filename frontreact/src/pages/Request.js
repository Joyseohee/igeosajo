import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import ReqReject from "../components/request/ReqReject";
import ConfirmModal from "../components/request/ConfirmModal";
import "../styled/Request.css";
import Goal from "../components/Goal";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("사무용품 신청 관리");
        this.state = {
            reqtermList: [],
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
        this.getlist("reqterm", {usernum: this.props.usernum}, null, "reqtermList")
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.reqtermList !== this.state.reqtermList) {
            this.setState((state) => ({
                pickedReqterm: state.reqtermList[0].termyearmonth
            }))
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

    updateList = (reqstate, reqstaging, reqrejectreason) => {
        let requestparam = {"reqstate": reqstate, "reqstaging": reqstaging, "reqrejectreason": reqrejectreason};
        this.state.checkedRequest.map((request) => {
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
        return (
            <div className="page-top request-wrapper">
                <Goal comment={"신청 관리"}/>
                <div className="request">
                    <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>
                    <ReqFilter setReqState={this.setReqState} />
                    {filter === '대기' &&
                        <>
                            <Button onClick={this.approve}>승인</Button>
                            <Button onClick={this.reject}>반려</Button>
                        </>}
                    <ReqList storeChecked={this.storeChecked}
                             termyearmonth={pickedReqterm}
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
            </div>
        );
    }
}

export default Request;