import React, {Component} from 'react';
import '../styled/Order.css'
import Container from 'react-bootstrap/Container';
import OrderReqSearch from '../components/orderRequestList/OrderReqSearch'
import OrderReqTable from "../components/orderRequestList/OrderReqTable";
import OrderReqDate from "../components/orderRequestList/OrderReqDate";
import Goal from "../components/Goal";
import { withRouter } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

let checklist = []
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
            checklist:[]
        }
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +this.state.orderreqstate)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data})
            })
    }

    checkenable =(orderstate,reqnum)=>{
        if(orderstate=="all") {
            return (
                <td><Form.Check className="ordercardtext"  name="check" id={reqnum} onChange={(e) => {this.checkindividal(e.target.checked, e.target.id)}} hidden/></td>
            )
        }
        else if(orderstate=="parchase") {
            return (
                <td><Form.Check className="ordercardtext"  name="check" id={reqnum} onChange={(e) => {this.checkindividal(e.target.checked, e.target.id)}} hidden/></td>
            )
        }
        else {
            return(
           <td><Form.Check className="ordercardtext"  name="check" id={reqnum} onChange={(e) => {this.checkindividal(e.target.checked, e.target.id)}} /></td>
            )
        }
    }

    checkclear=()=>{
        checklist = []
        const check = document.getElementsByName('check');
        const checkall = document.getElementsByName('checkall');
        check.forEach((state) => {state.checked = false})
        checkall.forEach((state)=>{state.checked = false})
        this.setState({checklist:checklist})
    }
    checkall=()=>{
        checklist = []
        const check = document.getElementsByName('check');
        let checkall = document.getElementsByName('checkall');
        check.forEach((state) => {
            if(state.disabled == false) {
                state.checked = checkall[0].checked
                 if(checkall[0].checked){
                checklist.push(state.id)
                 }
            }
        })
        this.setState({checklist:checklist})
    }
    checkindividal=(check, num)=> {
        if (check){
            checklist.push(num);
        }else{
            checklist = checklist.filter((element)=>element !== num)
        }
        this.setState({checklist:checklist})
    }


    orderdocsearchstate = (state) => {
        fetch('http://127.0.0.1:8000/api/order?func=orderreq&&termyearmonth=' + this.state.reqterm+'&&state=' +state)
            .then(res => res.json())
            .then(data => {
                    this.setState({reqdata: data,orderreqstate:state})
            })
        this.checkclear()

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
            checklist,
        } = this.state;

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={"구매 신청"}/>
                    <OrderReqDate></OrderReqDate>
                    <OrderReqSearch orderdocsearchstate={this.orderdocsearchstate} reqterm={reqterm} orderreqstate={orderreqstate} ></OrderReqSearch>
                    <OrderReqTable reqdata={reqdata} handleShow = {this.handleShow} orderreqstate={orderreqstate} checkclear={this.checkclear} checkall={this.checkall} checkindividal={this.checkindividal} checkenable={this.checkenable} checklist={checklist}></OrderReqTable>
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