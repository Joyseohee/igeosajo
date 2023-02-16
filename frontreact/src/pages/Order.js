import React, {Component} from "react";
import "../styled/Layouts.css"
import OrderProgress from "./OrderProgress";

class Order extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("구매 진행 현황");
    }

    render() {
        return (
            <div className="page-top">
                <OrderProgress/>
            </div>
        );
    }
}

export default Order;
