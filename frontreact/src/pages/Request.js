import React, {Component} from "react";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.changePagename("신청 관리");
        this.state = {
            items: [],
            checkedRequest: [],
            reqtermlist: [],
            pickedReqterm: null,
        }
    }

    componentDidMount() {
        this.getlist("202310");
        this.getReqtermList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.pickedReqterm !== this.state.pickedReqterm){
            this.getlist(this.state.pickedReqterm);
        }

    }

    getlist = (termyearmonth) => {
        console.log(termyearmonth);
        fetch("http://127.0.0.1:8000/api/request?reqstate=대기&termyearmonth=" + termyearmonth, {
            method: "GET",
        }).then(res => {
            return res.json();
        }).then(res => {
            this.setState({
                items: res,
            })
        })
    }
    getReqtermList = () => {
        fetch("http://127.0.0.1:8000/api/reqterm?usernum=" + this.props.usernum, {
            method: "GET",
        }).then(res => {
            return res.json();
        }).then(res => {
            this.setState({
                reqtermlist: res,
            })
        })
    }
    updateList = (reqstate, reqstaging, reqrejectreason) => {
        this.state.checkedRequest.map((pk) => {
            fetch("http://127.0.0.1:8000/api/request?reqstate=대기" + pk, {
                method: "PUT",
                headers: {               //데이터 타입 지정
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    "reqstate": reqstate,
                    "reqstaging": reqstaging,
                    "reqrejectreason": reqrejectreason,
                    "usernum": this.props.usernum,
                })
            }).then(() => {
                    this.getlist()
                }
            );
        })
    }

    approve = () => {
        this.updateList("승인", "처리중", null);
    }

    reject = () => {
        this.updateList("반려", "처리전", "구매 예산 초과");
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
        return (
            <div className="wrapper">
                <div className="title">타이틀</div>
                <div className="reqterms">
                    <div className="reqterm">신청기간</div>
                    <select onChange={(e) => {
                        this.handleSelect(e)
                    }}>
                        {this.state.reqtermlist.map((reqterm) => {
                            return (
                                <option key={reqterm.termyearmonth}
                                    value={reqterm.termyearmonth}>{reqterm.termyearmonth.toString().slice(0, 4)}년 {reqterm.termyearmonth.toString().slice(4, 7)}월</option>)
                        })}
                    </select></div>
                <div className="filter"><ReqFilter/></div>
                <div className="approve"><Button onClick={() => this.approve()}>승인</Button></div>
                <div className="deny"><Button onClick={() => this.reject()}>반려</Button></div>
                <div className="list"><ReqList storeChecked={this.storeChecked} items={this.state.items}/></div>
            </div>
        );
    }
}

export default Request;
