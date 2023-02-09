import React, {Component} from 'react';
import '../css/header.css'
import Container from 'react-bootstrap/Container';
import Headertitle from '../components/orderProgress/HeaderTitle'
import OrderReqSearch from '../components/orderRequestList/OrderReqSearch'
import OrderReqTable from "../components/orderRequestList/OrderReqTable";
import OrderReqDate from "../components/orderRequestList/OrderReqDate";
import Goal from "../components/Goal";
class OrderRequestList extends Component {
    constructor(props) {
        super(props);

        let  defaultstate = "prevparchase"
        let now = new Date();
        let month = now.getMonth()+1
        if(month <10)
        {
            month = "0"+String(month)
        }
        let term = String(now.getFullYear()) + month
        this.state = {
            orderreqstate: defaultstate,
            reqterm:term,
            reqdata:[],
        }
    }
    componentDidMount() {
        let test =[]
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +this.state.orderreqstate)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data})
            })
    }

    orderdocsearchstate = (state) => {
        console.log(state)
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +state)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data})
            })
    }

    render() {
        const {
            orderreqstate,
            reqdata,
            reqterm,
        } = this.state;

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={"구매 신청"}/>
                    <OrderReqDate></OrderReqDate>
                    <OrderReqSearch orderdocsearchstate={this.orderdocsearchstate} reqterm={reqterm} ></OrderReqSearch>
                    <OrderReqTable reqdata={reqdata} ></OrderReqTable>
                </Container>
            </div>
        );
    }
}


export default OrderRequestList;