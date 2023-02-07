import React, {Component} from "react";
import ReqFilterBox from "./ReqFilterBox";

class ReqFilter extends Component {
    constructor(props) {
        super(props);
        this.filteredState = this.filteredState.bind(this);
    }

    filteredState() {
        this.props.setReqState(this.props.filter);
    }
    render() {
        return (
            <div className="wrapper">
                <ReqFilterBox filter='전체' setReqState={this.props.setReqState} requestList={this.props.requestList}/>
                <ReqFilterBox filter='승인' setReqState={this.props.setReqState} requestList={this.props.requestList}/>
                <ReqFilterBox filter='반려' setReqState={this.props.setReqState} requestList={this.props.requestList}/>
                <ReqFilterBox filter='대기' setReqState={this.props.setReqState} requestList={this.props.requestList}/>
            </div>
        );
    }
}

export default ReqFilter;

