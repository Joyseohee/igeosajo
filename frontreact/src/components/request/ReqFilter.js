import React, {Component} from "react";

class ReqFilter extends Component {
    render() {
        return (
            <div className="wrapper" style={{color:"red"} }>
                <div className="all" onClick={() => this.approve()}>전체</div>
                <div className="app">승인</div>
                <div className="reject">반려</div>
                <div className="wait">대기</div>
            </div>
        );
    }
}

export default ReqFilter;

