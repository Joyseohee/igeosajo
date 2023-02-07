import React, {Component} from "react";
import ReqFilterOne from "./ReqFilterOne";

class ReqFilterBox extends Component {
    render() {
        let filter = this.props.filter;

        return (
            <div className="reqfilter-box-wrapper">
                <div>
                    <div>{filter}</div>
                    <ReqFilterOne filter={filter} setReqState={this.props.setReqState} requestList={this.props.requestList}/>
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

