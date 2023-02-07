import React, {Component} from "react";
import "../../styled/Reqterm.css"
import {Form, Button} from "react-bootstrap";
import ReqtermFix from "./ReqtermFix";
import ReqtermSet from "./ReqtermSet";
import ReqtermList from "./ReqtermList";

class Reqbox extends Component {

    render() {
        let menuname = "";
        if (this.props.type === "reqterm-fix") menuname = "신청 기간 설정";
        if (this.props.type === "reqterm-set") menuname = "신청 시작/마감";
        if (this.props.type === "reqterm-list") menuname = "신청 기간 목록";

        return (
            <div className="reqterm-box-wrapper">
                <div>
                    <div>{menuname}</div>
                    {this.props.type === "reqterm-fix" && <ReqtermFix usernum = {this.props.usernum}/>}
                    {this.props.type === "reqterm-set" && <ReqtermSet usernum = {this.props.usernum}/>}
                    {this.props.type === "reqterm-list" && <ReqtermList usernum = {this.props.usernum}/>}
                </div>
            </div>
        );
    }
}

export default Reqbox;
