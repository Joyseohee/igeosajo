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
        let param = this.props.filter.reqstate;
        let filter = param === '전체' ? null : param;
        new Api().read("request", {termyearmonth: this.props.selectedReqterm, reqstate: filter}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.props.updateState({
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                allChecked: false,
                pageCount: response.length,
                pageNum:1,
                requestFilter: param,
            });
        })
    }

    render() {
        let filter = this.props.filter.reqstate;
        let on = this.state.on;
        return (
            <div className="reqfilter-box-wrapper" onClick={this.filteredState}
                 style={{backgroundColor: `${this.props.color}`}}>
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

