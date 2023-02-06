import React, {Component} from "react";
import Api from "../../api/Api";

class ReqFilterOne extends Component {
    constructor(props) {
        super(props);
        this.filteredState = this.filteredState.bind(this);
    }

    filteredState() {
        this.props.setReqState(this.props.filter);
    }

    render() {

        return (
            <div className="reqfilter-box" onClick={this.filteredState} >
                필터
            </div>
        );
    }
}

export default ReqFilterOne;

