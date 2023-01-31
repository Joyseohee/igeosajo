import React, {Component} from 'react';
import OrderTable from "./OrderTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import TotalPrice from "./TotalPrice";

let orderstate = ""
let sdate
let edate
let checklist = []
class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum: [],
            reqnum:[],
            orderstate : this.props.orderstate,
            startdate: this.props.startdate,
            enddate: this.props.enddate,

        }
       orderstate=this.props.orderstate
        sdate = this.props.startdate
         edate = this.props.enddate

        this.checkindividal = this.checkindividal.bind(this);
        this.checkall = this.checkall.bind(this);
        this.checkclear = this.checkclear.bind(this);
        this.checkenable = this.checkenable.bind(this);
        this.changeorderstate = this.changeorderstate.bind(this);
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=' + orderstate +'&startdate='+sdate+'&enddate='+edate)
            .then(res => res.json())
            .then(data => {this.setState({
                ordernum: data
            })
            });
    }
    componentDidUpdate(prevProps) {
        if (this.props.orderstate !== prevProps.orderstate) {this.setState({orderstate : this.props.orderstate});}
        if (this.props.startdate !== prevProps.startdate) {this.setState({startdate : this.props.startdate});}
        if (this.props.enddate !== prevProps.enddate) {this.setState({enddate : this.props.enddate});}
        if (this.props.orderstate !== prevProps.orderstate | this.props.startdate !== prevProps.startdate |this.props.enddate !== prevProps.enddate) {
            fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=' + this.props.orderstate +'&startdate='+this.props.startdate+'&enddate='+this.props.enddate)
            .then(res => res.json())
            .then(data => {this.setState({ordernum: data})});
        }
        this.checkclear()
    }
    changeorderstate(state){
        console.log(JSON.stringify(checklist))
        if(checklist.length ===0){
            console.log("선택된 항목이 없습니다.")
        }
        else{
            if(state==='deliver')
            {
                fetch("http://127.0.0.1:8000/api/order" , {
              method: "PUT",
              headers: {
                "Content-Type": "application/jso    n",
              },
              body: JSON.stringify({
                orderstate: state,
                ordernum: checklist,
              }),
            })
              .then((response) => response.json())
              .then((data) => data);
            }
            if(state==='finish')
            {
                fetch("http://127.0.0.1:8000/api/order" , {
              method: "PUT",
              headers: {
                "Content-Type": "application/jso    n",
              },
              body: JSON.stringify({
                orderstate: state,
                ordernum: checklist,
              }),
            })
              .then((response) => response.json())
              .then((data) => data);
            }
        }
        checklist = []
        this.forceUpdate()
    }
    checkenable(state,ordernum){
        if(state=="불출 완료") {
            return (
                <Col><Form.Check className="ordercardtext" inline label={"문서번호 : " + ordernum} name="check"
                                 id={ordernum} onChange={(e) => {
                    this.checkindividal(e.target.checked, e.target.id)
                }} disabled/></Col>
            )
        }
        else {
            return(
            <Col>
                <Form.Check className="ordercardtext" inline label={"문서번호 : " + ordernum} name="check" id={ordernum}
                             onChange={(e) => {
                                 this.checkindividal(e.target.checked, e.target.id)
                             }} />
            </Col>)
        }
    }

    checkclear(state){
        checklist = []
        const check = document.getElementsByName('check');
        const checkall = document.getElementsByName('checkall');
        check.forEach((state) => {state.checked = false})
        checkall.forEach((state)=>{state.checked = false})
    }
    checkall(){
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


    render() {
        const { ordernum, orderstate } = this.state

        return (
            <div>
                <Row>
                    <div className="btndivmargin">
                        <Form.Check className="orderallselect" inline label="전체선택" name="checkall" id={`1`} onClick={this.checkall}/>
                        <button type="button" className="btn btn-success submitbutton" id={'finish'} onClick={(e) => {this.changeorderstate(e.target.id)}}>불출완료</button>
                        <button type="button" className="btn btn-primary deliverbutton" id={'deliver'} onClick={(e) => {this.changeorderstate(e.target.id)}}>배송완료</button>
                    </div>
                </Row>
                <div className="orderviewmargin">
                    {ordernum && ordernum.map((num,i) => (
                        <Row style={{width: '100%'}}>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body>
                                    <Container className="containermargin">
                                        <Row>
                                            {this.checkenable(num.orderstate,num.ordernum)}
                                            <Col xs lg="2"><span className="ordercardtext">{num.orderdate}</span></Col>
                                            <Col xs lg="2"><span className="ordercardtext">{num.orderstate}</span></Col>
                                        </Row>
                                    </Container>
                                    <OrderTable ordernum={num.ordernum} key="{num.ordernum}"/>
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