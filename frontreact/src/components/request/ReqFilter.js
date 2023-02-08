import React, {Component} from "react";
import ReqFilterBox from "./ReqFilterBox";

class ReqFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <ReqFilterBox filter='전체' setReqState={this.props.setReqState} clickedFilter={this.props.filter} />
                <ReqFilterBox filter='승인' setReqState={this.props.setReqState} clickedFilter={this.props.filter} />
                <ReqFilterBox filter='반려' setReqState={this.props.setReqState} clickedFilter={this.props.filter} />
                <ReqFilterBox filter='대기' setReqState={this.props.setReqState} clickedFilter={this.props.filter} />
            </div>
        );
    }
}

export default ReqFilter;

