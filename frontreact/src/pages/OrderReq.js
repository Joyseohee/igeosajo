import React, {Component} from "react";
import "../styled/Layouts.css"
import OrderRequestList from "./OrderRequestList";

class Order extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("구매 신청 목록");
        // this.state = {
        //     usernum: "2",
        // };
    }

    render() {
        return (
            <div className="page-top">
                <OrderRequestList/>
            </div>
        );
    }
}

export default Order;
