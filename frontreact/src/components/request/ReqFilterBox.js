import React, {Component} from "react";
import Api from "../../api/Api";
import DocumentIcon from "../../storage/Icon";

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
        new Api().read("request", {termyearmonth: this.props.selectedReqterm, reqstate: filter, usernum: this.props.usernum!==undefined?this.props.usernum:null}, null)
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
                pageNum: 1,
                requestFilter: param,
            });
        })
    }

    render() {
        let filter = this.props.filter.reqstate;
        let on = this.state.on;
        let stateColor = "#BDACFC";
        if (filter === '전체') {
            stateColor = "#BDACFC";
        } else if (filter === '승인') {
            stateColor = "#75A2FF";
        } else if (filter === '반려') {
            stateColor = "#6CC2CD";
        } else {
            stateColor = "#F8676A";
        }

        return (
            <div className="reqfilter-box-wrapper" onClick={this.filteredState}
                 style={{backgroundColor: `${this.props.color}`, border: "0.5px solid rgba(222, 222, 222, 0.8)"}}
            >
                <div>
                    <div className="reqfilter-box-name">{filter}</div>
                    <div className={"reqfilter-align-row"}>
                        <div className="reqfilter-box" style={{color: stateColor}}>
                            {this.props.filter.length}건
                        </div>
                        <div className="reqfilter-box-icon">
                            <DocumentIcon reqstate={filter}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

