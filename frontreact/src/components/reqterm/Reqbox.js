import React, {Component} from "react";
import "../../styled/Reqterm.css"
import {Form, Button} from "react-bootstrap";
import ReqtermFix from "./ReqtermFix";
import ReqtermSet from "./ReqtermSet";

class Reqbox extends Component {

    render() {
        let menuname = "";
        if (this.props.type === "reqterm-fix") menuname = "신청 기간 설정";
        if (this.props.type === "reqterm-set") menuname = "신청 시작/마감";

        return (
            <div className="reqterm-box-wrapper">
                <div>
                    <div>{menuname}</div>
                    {this.props.type === "reqterm-fix" && <ReqtermFix usernum = {this.props.usernum}/>}
                    {this.props.type === "reqterm-set" && <ReqtermSet usernum = {this.props.usernum}/>}
                </div>
            </div>
        );
    }
}

export default Reqbox;
