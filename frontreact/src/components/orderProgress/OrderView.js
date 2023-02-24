import React, {Component} from 'react';
import OrderTable from "./OrderTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import TotalPrice from "./TotalPrice";
import Paging from "../layout/Paging";

let checklist = []

class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    changeorderstate=(state)=>{

        if(checklist.length ===0){
            this.props.handleshow(true,"선택된 항목이 없습니다.")
        }
        else{
            if(state==='deliver')
            {
                fetch("http://127.0.0.1:8000/api/order" , {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderstate: state,
                ordernum: checklist,
              }),
            })

            }
            else if(state==='finish')
            {
                fetch("http://127.0.0.1:8000/api/order" , {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderstate: state,
                ordernum: checklist,
              }),
            })

            }
            this.checkclear()
        this.props.ordersearchstate(state)
        this.props.ordernumdata(state,this.props.startdate,this.props.enddate)
        this.props.ordercntdata(this.props.startdate,this.props.enddate)
        }
        
    }
    checkenable=(state,ordernum)=>{
        if(state=="불출완료") {
            return (
                <Col xs lg="8"><Form.Check className="ordercardtext" inline label={"구매번호 : " + ordernum} name="check"
                                 id={ordernum} onChange={(e) => {
                    this.checkindividal(e.target.checked, e.target.id)
                }} disabled/></Col>
            )
        }
        else {
            return(
            <Col xs lg="8">
                <Form.Check className="ordercardtext" inline label={"구매번호 : " + ordernum} name="check" id={ordernum}
                             onChange={(e) => {
                                 this.checkindividal(e.target.checked, e.target.id)
                             }} />
            </Col>)
        }
    }

    checkclear=()=>{
        checklist = []
        const check = document.getElementsByName('check');
        const checkall = document.getElementsByName('checkall');
        check.forEach((state) => {state.checked = false})
        checkall.forEach((state)=>{state.checked = false})
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
    }
    checkindividal(check, num) {
        if (check){
            checklist.push(num);
        }else{
            checklist = checklist.filter((element)=>element !== num)
        }
    }
    
    statebtn=(state)=>{
        if(state=="allselect") {
            return (
                <div className="btndivmargin">

                </div>
            )
        }
        else if(state=="parchase") {
            return (
               <div className="btndivmargin">
                    <Form.Check className="orderallselect" inline label="전체선택" name="checkall" id={`1`} onClick={this.checkall}/>
                    <button type="button" className="btn btn-primary submitbutton" style={{width:"15%"}} id={'deliver'} onClick={(e) => {this.changeorderstate(e.target.id)}}>배송완료</button>
                </div>
            )
            
        }else if(state=="deliver") {
            return (
                <div className="btndivmargin">
                    <Form.Check className="orderallselect" inline label="전체선택" name="checkall" id={`1`} onClick={this.checkall}/>
                    <button type="button" className="btn btn-success submitbutton" style={{width:"15%"}} id={'finish'} onClick={(e) => {this.changeorderstate(e.target.id)}}>불출완료</button>
                </div>
            )
        } else if(state=="finish") {
            return (
                 <div className="btndivmargin">

                </div>
            )
        }
    }
    dataempty =(data)=>{
        const text = "데이터가 존재하지 않습니다.";
        if(data.length == 0)
        {
            return(
                <Row style={{width: '101.5%'}}>
                    <div style={{textAlign:"center",fontWeight:"bold",fontSize:"18px"}}>{text}</div>
                </Row>
            )
        }
    }

    render() {
        const  ordernum  = this.props.ordernum

        return (
            <div>
                <Row>
                    {this.statebtn(this.props.orderstate)}
                </Row>
                <div className="orderviewmargin">
                    {this.dataempty(ordernum)}
                    {ordernum && ordernum.map((num,i) => (
                        <Row style={{width: '100%', margin:'0'}} key={num.ordernum}>
                        <div className="cardcontainprogress" >
                            <Card style={{width: '100%'}}>
                                <Card.Body>
                                    <Container className="containermargin" >
                                        <Row>
                                            {this.checkenable(num.orderstate,num.ordernum)}
                                            <Col xs lg="2" style={{width:"20%"}}><span className="ordercardtext">{num.orderdate}</span></Col>
                                            <Col xs lg="2" style={{width:"10%"}}><span className="ordercardtext">{num.orderstate}</span></Col>
                                        </Row>
                                    </Container>
                                    <OrderTable ordernum={num.ordernum} />
                                    <TotalPrice ordernum={num.ordernum} key="{num.ordernum}"/>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                    ))}

                </div>
            </div>
        )
    }
}

export default OrderView;