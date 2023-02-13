import React, {Component} from "react";
import ReqFilterBox from "./ReqFilterBox";
import Api from "../../api/Api";

class ReqFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {selectedFilter, requestList, selectedReqterm} = this.props;
        const reqstates = [
            {
                reqstate: '전체',
                length: requestList.length
            },
            {
                reqstate: '승인',
                length: requestList.filter(request => request.reqstate === '승인').length
            },
            {
                reqstate: '반려',
                length: requestList.filter(request => request.reqstate === '반려').length
            }, {
                reqstate: '대기',
                length: requestList.filter(request => request.reqstate === '대기').length
            }];

        return (
            <div className="wrapper">
                {reqstates.map((reqstate) => {
                    return (
                        <ReqFilterBox key={reqstate.reqstate}
                                      filter={reqstate}
                                      selectedFilter={selectedFilter}
                                      requestList={requestList}
                                      selectedReqterm={selectedReqterm}
                                      updateState={this.props.updateState}
                                      color={selectedFilter !== reqstate.reqstate ? "rgb(224, 224, 224)" : "rgb(52, 152, 219)"}
                        />
                    )
                })}
            </div>
        );
    }
}

export default ReqFilter;

