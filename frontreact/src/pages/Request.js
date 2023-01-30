import React, {Component} from "react";
// import ReqFilter from "../components/request/ReqFilter";

class Request extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 관리");
    }
    render() {
        return (
            <div className="reqterm-wrapper">
                <div className="title">타이틀</div>
                {/*<div className="filter"><ReqFilter /></div>*/}
                <div className="approve">승인</div>
                <div className="deny">반려</div>
                <div className="list">목록</div>
            </div>
        );
    }
}

export default Request;
