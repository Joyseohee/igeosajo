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
        }
        this.storeChecked = this.storeChecked.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getlist = this.getlist.bind(this);
        this.approve = this.approve.bind(this);
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

    render() {
        const reqtermList = this.state.reqtermList;
        const pickedReqterm = this.state.pickedReqterm;
        const checkedRequest = this.state.checkedRequest;
        const usernum = this.props.usernum;
        return (
            <div className="page-top request-wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    {reqtermList.length > 0 &&
                        <SelectReqterm handleSelect={this.handleSelect} reqtermList={reqtermList}/>}
                </div>
                <ReqFilter/>
                <Button onClick={this.approve}>승인</Button>
                {pickedReqterm !== null && <ReqList storeChecked={this.storeChecked} termyearmonth={pickedReqterm}
                                                    usernum={usernum} checkedRequest={checkedRequest}/>}
            </div>
        );
    }
}

export default Request;

