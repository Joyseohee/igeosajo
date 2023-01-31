import React, {Component} from "react";
import "../styled/Layouts.css"
import OrderProgress from "./OrderProgress";

class Order extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("구매 페이지");
        // this.state = {
        //     usernum: "2",
        // };
    }

    render() {
        console.log("come")
        return (
            <div className="page-top">
                {/*전부 고정이고 바뀌는 건 <Requestmain />에 컴포넌트명 변경*/}
                <OrderProgress/>
            </div>
        );
    }
}

export default Order;
