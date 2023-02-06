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
                <ReqFilterBox filter='all' setReqState={this.props.setReqState}/>
                <ReqFilterBox filter='approved' setReqState={this.props.setReqState}/>
                <ReqFilterBox filter='rejected' setReqState={this.props.setReqState}/>
                <ReqFilterBox filter='waiting' setReqState={this.props.setReqState}/>
            </div>
        );
    }
}

export default ReqFilter;

