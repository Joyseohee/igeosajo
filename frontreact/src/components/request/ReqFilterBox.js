import React, {Component} from "react";
import ReqFilterOne from "./ReqFilterOne";

class ReqFilterBox extends Component {
    render() {
        let reqstate = "";
        let filter = this.props.filter;
        if (filter === "all") reqstate = "전체";
        if (filter === "approved") reqstate = "승인";
        if (filter === "rejected") reqstate = "반려";
        if (filter === "waiting") reqstate = "대기";

        return (
            <div className="reqfilter-box-wrapper">
                <div>
                    <div>{reqstate}</div>
                    {filter === "all" && <ReqFilterOne filter={filter} setReqState={this.props.setReqState}/>}
                    {filter === "approved" && <ReqFilterOne filter={filter} setReqState={this.props.setReqState}/>}
                    {filter === "rejected" && <ReqFilterOne filter={filter} setReqState={this.props.setReqState}/>}
                    {filter === "waiting" && <ReqFilterOne filter={filter} setReqState={this.props.setReqState}/>}
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

