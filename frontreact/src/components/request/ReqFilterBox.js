import React, {Component} from "react";
import Api from "../../api/Api";

class ReqFilterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            on: "rgb(224, 224, 224)",
        }
    }

    filteredState = () => {
        this.props.setReqState(this.props.filter.reqstate);
    }

    render() {
        let filter = this.props.filter.reqstate;
        let on = this.state.on;
        return (
            <div className="reqfilter-box-wrapper" onClick={this.filteredState} style={{backgroundColor: `${this.props.color}`}}>
                <div>
                    <div>{filter}</div>
                    <div className="reqfilter-box">
                        요청수:{this.props.filter.length}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

