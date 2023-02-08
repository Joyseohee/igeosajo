import React, {Component} from "react";

class ReqFilterBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked:true,
            on: "rgb(224, 224, 224)",
        }
        this.filteredState = this.filteredState.bind(this);
    }

    filteredState() {
        this.props.setReqState(this.props.filter);
        this.setState({
            on: "beige",
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.clickedFilter !== this.props.clickedFilter) {
    //         this.setState({
    //             on: "rgb(224, 224, 224)",
    //         })
    //     }
    // }

    render() {
        let filter = this.props.filter;
        let on = this.state.on;
        return (
            <div className="reqfilter-box-wrapper" onClick={this.filteredState} style={{backgroundColor: `${on}`}}>
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

