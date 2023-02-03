import React, {Component} from 'react';
import '../css/header.css'
import Container from 'react-bootstrap/Container';
import Headertitle from '../components/orderProgress/HeaderTitle'
import OrderReqSearch from '../components/orderRequestList/OrderReqSearch'
import OrderReqTable from "../components/orderRequestList/OrderReqTable";
import OrderReqDate from "../components/orderRequestList/OrderReqDate";

class OrderRequestList extends Component {
    constructor(props) {
        super(props);

        let  defaultstate = "구매전"
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
        fetch('http://127.0.0.1:8000/api/request?reqstaging=처리중&reqorder='+this.state.orderreqstate+'&termyearmonth='+this.state.reqterm)
            .then(res => res.json())
            .then(data => {this.setState({reqdata:data})})
    }

    orderdocsearchstate = (state) => {
        if(state == "all") {
            fetch('http://127.0.0.1:8000/api/request?reqstaging=처리중&&termyearmonth='+this.state.reqterm)
            .then(res => res.json())
            .then(data => {this.setState({reqdata:data})})
        }else if(state=="prevparchase"){
            fetch('http://127.0.0.1:8000/api/request?reqstaging=처리중&reqorder=구매전&termyearmonth='+this.state.reqterm)
            .then(res => res.json())
            .then(data => {this.setState({reqdata:data})})
        }else if(state=="parchase"){
            fetch('http://127.0.0.1:8000/api/request?reqstaging=처리중&reqorder=구매완료&termyearmonth='+this.state.reqterm)
            .then(res => res.json())
            .then(data => {this.setState({reqdata:data})})
        }
    };

    render() {
        const {
            orderreqstate,
            reqdata,
            reqterm,
        } = this.state;
        // const date = [startyear, startmonth, endyear, endmonth]

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Headertitle title="구매 신청"></Headertitle>
                    <OrderReqDate></OrderReqDate>
                    <OrderReqSearch orderdocsearchstate={this.orderdocsearchstate} reqterm={reqterm} ></OrderReqSearch>
                    <OrderReqTable reqdata={reqdata} ></OrderReqTable>
                </Container>
            </div>
        );
    }
}


export default OrderRequestList;