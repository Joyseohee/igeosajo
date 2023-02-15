import React, {Component} from 'react';
import '../css/header.css'
import Container from 'react-bootstrap/Container';
import Headertitle from '../components/orderProgress/HeaderTitle'
import OrderReqSearch from '../components/orderRequestList/OrderReqSearch'
import OrderReqTable from "../components/orderRequestList/OrderReqTable";
import OrderReqDate from "../components/orderRequestList/OrderReqDate";
import Goal from "../components/Goal";
import { withRouter } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class OrderRequestList extends Component {
    constructor(props) {
        super(props);

        let  defaultstate = "prevparchase"
        try {
            if(this.props.location.state.orderstate != null)
            {
                defaultstate = this.props.location.state.orderstate
            }
        } catch (e) {

        }
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
            show:false,
            content:"",
        }
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +this.state.orderreqstate)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data})
            })
    }
    // componentWillUnmount() {
    //     this.handleClose()
    // }

    orderdocsearchstate = (state) => {
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +state)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data,orderreqstate:state})
            })
    }
    handleClose = () => {
        this.setState({show:false})
        this.closePostCode()
    }
    handleShow = (state,content) => {
        this.setState({show:state})
        this.setState({content:content})
        this.openPostCode()
    }


    render() {
        const {
            orderreqstate,
            reqdata,
            reqterm,
            show,
            content,
        } = this.state;

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={"구매 신청"}/>
                    <OrderReqDate></OrderReqDate>
                    <OrderReqSearch orderdocsearchstate={this.orderdocsearchstate} reqterm={reqterm} orderreqstate={orderreqstate} ></OrderReqSearch>
                    <OrderReqTable reqdata={reqdata} handleShow = {this.handleShow} orderreqstate={orderreqstate}></OrderReqTable>
                </Container>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                  >

                    <Modal.Body>
                        {content}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>확인</Button>
                    </Modal.Footer>
                 </Modal>
            </div>

        );
    }
}


export default withRouter(OrderRequestList);