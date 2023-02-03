import React, {Component} from "react";
import "../styled/Layouts.css"
import OrderProgress from "./OrderProgress";
import Container from "react-bootstrap/Container";
import Headertitle from "../components/orderProgress/HeaderTitle";
import DateSetting from "../components/orderProgress/DateSetting";
import OrderSearch from "../components/orderProgress/OrderSearch";
import OrderView from "../components/orderProgress/OrderView";
import OrderDataInput from "../components/orderRequestList/OrderDataInput";

class OrderParchase extends Component {
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
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Headertitle title="배송지 입력"></Headertitle>
                    <OrderDataInput></OrderDataInput>
                    {/*<DateSetting date={date} datesetting={this.datesetting}></DateSetting>*/}
                    {/*<OrderSearch orderstate={this.ordersearchstate} startdate={startdate} enddate={enddate}></OrderSearch>*/}
                    {/*<OrderView ordernum={ordernum} ></OrderView>*/}
                </Container>
            </div>
        );
    }
}

export default OrderParchase;
