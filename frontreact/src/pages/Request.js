import React, {Component} from "react";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import {Button, FormSelect} from "react-bootstrap";
import Api from "../api/Api";
import SelectReqterm from "../components/request/SelectReqterm";
import ReqReject from "../components/request/ReqReject";
import "../styled/Request.css";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
        this.state = {
            reqtermList: [],
            pickedReqterm: null,
            checkedRequest: [],
            showRejectModal: false,
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
    }

    async componentDidMount() {
        try {
            this.getlist("reqterm", {usernum: this.props.usernum}, null, "reqtermList");
        } catch (e) {
            console.error(e);
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
        this.updateList("승인", "처리중", null).then(() => {
            this.setState({
                checkedRequest: [],
            })
        })
    }

    reject = () => {
        // 모달 띄우기
        this.setState({
            showRejectModal: true,
        })
    }

    setReqRejectReason(e) {
        // 모달로부터 반려이유 받아오기
        console.log(e.target.value);
        this.setState({
            reqRejectReason: e.target.value,
        })
    }


    storeChecked = (reqnum) => {
        this.setState({
            checkedRequest: reqnum,
        })
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
        this.setState({
            showRejectModal: false,
        })
    }

    confirmReject() {
        this.handleClose();
        this.updateList("반려", "처리전", this.state.reqRejectReason);
        this.setState({
            checkedRequest: [],
        })
    }

    setReqState(param) {
        console.log(param);
        let filter = "";
        if (param === 'all') filter = null;
        if (param === 'approved') filter = '승인';
        if (param === 'rejected') filter = '반려';
        if (param === 'waiting') filter = '대기';

        this.setState({
            filter: filter,
        })
    }

    render() {
        const reqtermList = this.state.reqtermList;
        const pickedReqterm = this.state.pickedReqterm;
        const checkedRequest = this.state.checkedRequest;
        const usernum = this.props.usernum;
        console.log(this.state.filter);
        return (
            <div className="page-top request-wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    {reqtermList.length > 0 &&
                        <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>}
                </div>
                <ReqFilter setReqState={this.setReqState}/>
                <Button onClick={this.approve}>승인</Button>
                <Button onClick={this.reject}>반려</Button>
                {pickedReqterm !== null && <ReqList storeChecked={this.storeChecked}
                                                    termyearmonth={pickedReqterm}
                                                    usernum={usernum}
                                                    filter={this.state.filter}
                                                    checkedRequest={checkedRequest}/>}
                <ReqReject show={this.state.showRejectModal}
                           handleClose={this.handleClose}
                           setReqRejectReason={this.setReqRejectReason}
                           confirmReject={this.confirmReject}/>
            </div>
        );
    }
}

export default Request;