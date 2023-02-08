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
        this.state = {
            requestList: [],
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
                    pickedReqterm: reqtermList[0].termyearmonth,
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
        // this.state.checkedRequest.map((request) => {
        //     new Api().update("request", {
        //         "reqstate": reqstate,
        //         "reqstaging": "처리전",
        //         "reqrejectreason": reqstate === '반려' ? this.state.reqRejectReason : null
        //     }, request)
        // })
        // new Api().read("request", {termyearmonth: this.state.pickedReqterm, reqstate: reqstate}, null)
        //     .then((response) => {
        //         return response.json();
        //     }).then((response)=>{
        //         this.setState({
        //             requestList: response,
        //             filter: reqstate,
        //         });
        // })
        // this.setState({
        //     checkedRequest: [],
        // })
        this.state.checkedRequest.map((request) => {
            return new Api().update("request", {
                "reqstate": reqstate,
                "reqstaging": "처리전",
                "reqrejectreason": reqstate === '반려' ? this.state.reqRejectReason : null
            }, request)
        });
        setTimeout(() => {
            new Api().read("request", {termyearmonth: this.state.pickedReqterm, reqstate: reqstate}, null)
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        requestList: response,
                        filter: reqstate,
                        checkedRequest: [],
                    });
                })
                .catch((error) => console.error(error));
        }, 500);
    };

    setReqRejectReason = (e) => {
        this.setState({reqRejectReason: e.target.value});
    };

    storeChecked = (reqnum) => {
        console.log(reqnum);
        this.setState({checkedRequest: reqnum});
    };

    handleSelect = (e) => {
        const termyearmonth = e.target.value;
        new Api().read("request", {termyearmonth: termyearmonth}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState({
                requestList: response,
                pickedReqterm: termyearmonth,
                filter: '전체',
            });
        })
    };

    setReqState = (param) => {
        let filter = param === '전체' ? null : param;
        console.log(this.state.pickedReqterm);
        new Api().read("request", {termyearmonth: this.state.pickedReqterm, reqstate: filter}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState({
                requestList: response,
                filter: filter,
            });
        })
    };

    render() {
        const {
            requestList,
            reqtermList,
            filter,
            pickedReqterm,
            checkedRequest,
            showRejectModal,
            showApproveConfirmModal,
            showRejectConfirmModal
        } = this.state;

        return (
            <div className="page-top request-wrapper">
                <Goal comment={"신청 관리"}/>
                <div className="request">
                    <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>
                    <ReqFilter setReqState={this.setReqState} filter={filter}/>
                    {filter === '대기' &&
                        <>
                            <Button onClick={this.approve}>승인</Button>
                            <Button onClick={this.reject}>반려</Button>
                        </>}
                    <ReqList storeChecked={this.storeChecked}
                             requestList={requestList}
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