import React, {Component} from "react";

class ReqFilterBox extends Component {

    constructor(props) {
        super(props);
        this.filteredState = this.filteredState.bind(this);
    }

    filteredState() {
        this.props.setReqState(this.props.filter);
    }
    render() {
        let filter = this.props.filter;
        return (
            <div className="reqfilter-box-wrapper" onClick={this.filteredState}>
                <div>
                    <div>{filter}</div>
                    <div className="reqfilter-box">
                        요청수
                    </div>
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

