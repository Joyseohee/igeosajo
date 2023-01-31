import React, {Component} from "react";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import {Button} from "react-bootstrap";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
        this.state = {
            items: [],
            checkedRequest: [],
        }
    }

    componentDidMount() {
        this.getlist();
    }

    getlist = () => {
        fetch("http://127.0.0.1:8000/api/request?usernum=" + 1 + "&&reqstate=대기", {
            method: "GET",
        }).then(res => {
            console.log(res);
            return res.json();
        }).then(res => {
            this.setState({
                items: res,
            })
        })
    }
    updateList = (reqstate, reqstaging, reqrejectreason) => {
        this.state.checkedRequest.map((pk) => {
            fetch("http://127.0.0.1:8000/api/request/" + pk, {
                method: "PUT",
                headers: {               //데이터 타입 지정
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    "reqstate": reqstate,
                    "reqstaging": reqstaging,
                    "reqrejectreason": reqrejectreason,
                    "usernum": 3
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

    render() {
        return (
            <div className="wrapper">
                <div className="title">타이틀</div>
                <div className="filter"><ReqFilter/></div>
                <div className="approve"><Button onClick={() => this.approve()}>승인</Button></div>
                <div className="deny"><Button onClick={() => this.reject()}>반려</Button></div>
                <div className="list"><ReqList storeChecked={this.storeChecked} items={this.state.items}/></div>
            </div>
        );
    }
}

export default Request;
