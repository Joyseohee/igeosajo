import React, {Component} from "react";

class ReqFilterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ReqLength: 0,
        }
        this.filteredState = this.filteredState.bind(this);
    }

    componentDidMount() {
        let find = "";
        if (this.props.filter === '전체') {
            find = this.props.requestList;
        } else {
            find = this.props.requestList.filter(e => e.reqstate === this.props.filter);
        }

        this.setState({
            ReqLength: find.length,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.requestList !== this.props.requestList) {
            let find = "";
            if (this.props.filter === '전체') {
                find = this.props.requestList;
            } else {
                find = this.props.requestList.filter(e => e.reqstate === this.props.filter);
            }

            this.setState({
                ReqLength: find.length,
            })
        }

    }
    filteredState() {
        this.props.setReqState(this.props.filter);
    }
    render() {
        let filter = this.props.filter;
        return (
            <div className="reqfilter-box-wrapper">
                <div>
                    <div>{filter}</div>
                    <div className="reqfilter-box" onClick={this.filteredState}>
                        요청 수 : {this.state.ReqLength}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReqFilterBox;

