import React, {Component} from "react";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import {Button, FormSelect} from "react-bootstrap";
import Api from "../api/Api";
import SelectReqterm from "../components/request/SelectReqterm";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
        this.state = {
            reqtermList: [],
            pickedReqterm: null,
            checkedRequest: [],
            reqtermlist: [],
            pickedReqterm: null,
        }
        this.storeChecked = this.storeChecked.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.approve = this.approve.bind(this);
    }

    async componentDidMount() {
        try {
            const [requestRes, reqtermRes] = await Promise.all([
                new Api().read("request", null, null),
                new Api().read("reqterm", {usernum: this.props.usernum}, null)
            ]);
            const [requestData, reqtermData] = await Promise.all([requestRes.json(), reqtermRes.json()]);
            this.setState({
                requestlist: requestData,
                reqtermlist: reqtermData,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.pickedReqterm !== this.state.pickedReqterm) {
            try {
                const params = {termyearmonth: this.state.pickedReqterm, usernum: this.props.usernum};
                const response = await new Api().read("request", params, null);
                const data = await response.json();
                this.setState({
                    requestlist: data,
                });
            } catch (e) {
                console.error(e);
            }
        }
        if (prevState.checkedRequest !== this.state.checkedRequest) {
            this.setState((state) => ({
                checkedRequest: state.checkedRequest,
            }));
        }
    }

    updateList = (reqstate, reqstaging, reqrejectreason) => {
        const requestparam = {"reqstate": reqstate, "reqstaging": reqstaging, "reqrejectreason": reqrejectreason};
        new Api().update("request", requestparam, 1);
    }

    approve = () => {
        this.updateList("승인", "처리중", null);
    }

    reject = () => {
        this.updateList("반려", "처리전", "구매 예산 초과");
    }

    storeChecked = (reqnum) => {
        console.log(reqnum);
        this.setState({
            checkedRequest: reqnum,
        })
        console.log(this.state.checkedRequest);
    }

    handleSelect(e) {
        let termyearmonth = e.target.value;
        if (termyearmonth != null) {
            this.setState({
                pickedReqterm: termyearmonth,
            })
        }
    }

    render() {
        const requestlist = this.state.requestlist;
        return (
            <div className="page-top request-wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    {/*<SelectReqterm handleSelect={this.handleSelect} requestlist={requestlist}></SelectReqterm>*/}
                </div>
                <ReqFilter/>
                {pickedReqterm !== null && <ReqList storeChecked={this.storeChecked} termyearmonth={pickedReqterm}
                                                    usernum={usernum} checkedRequest={checkedRequest}/>}
            </div>
        );
    }
}

export default Request;
