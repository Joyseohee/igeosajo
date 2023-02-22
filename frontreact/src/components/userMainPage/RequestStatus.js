import React, {Component} from "react";
import "../../styled/UserMain.css"
import {withRouter} from "react-router-dom";

class RequestStatus extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = (title, count, route) => {
        return (
            <div onClick={(e) => {
                this.props.history.push(route)
            }}>
                <div><li>{title}</li></div>
                {
                    count !== -1 ? <div>{count}건</div> : <div></div>
                }
            </div>
        );
    }

    render() {
        let reqCount = this.props.reqCount;
        let reqBasket = this.props.reqBasket;

        return (
            <div className={"requestStatusDiv"}>
                {this.renderItem("신청 내역", reqCount, "/requestuser")}

                <div className={"divHr"}></div>

                {this.renderItem("장바구니", reqBasket, "/cart")}
            </div>
        );
    }
}

export default withRouter(RequestStatus);
