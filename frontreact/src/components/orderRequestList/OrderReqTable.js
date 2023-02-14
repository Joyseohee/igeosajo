import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import CommonUtil from "../../util/CommonUtil";
let ordernum
let checklist = []
class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    checkenable =(state,reqnum)=>{
        if(state=="구매완료") {
            return (
                <td><Form.Check className="ordercardtext"  name="check" id={reqnum} onChange={(e) => {this.checkindividal(e.target.checked, e.target.id)}}disabled/></td>
            )
        }
        else {
            return(
           <td><Form.Check className="ordercardtext"  name="check" id={reqnum} onChange={(e) => {this.checkindividal(e.target.checked, e.target.id)}}/></td>
            )
        }
    }

    checkclear=(state)=>{
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
    checkindividal=(check, num)=> {
        if (check){
            checklist.push(num);
        }else{
            checklist = checklist.filter((element)=>element !== num)
        }
        console.log(checklist)
    }
    orderparchasepath = () => {
        if(checklist.length ==0){
            this.props.handleShow(true,"선택된 항목이 없습니다.")
        }
        else {
            this.props.history.push({
                pathname: "/OrderParchase",
                state: {
                    data: checklist
                },
            })
        }
        checklist = []
    }
    render() {
        const {reqdata} = this.props;
        return (
            <div>
              <div className="subtitle">
                  <div className="dotmargin"></div>
                  <div style={{width:'64%',fontWeight:"bold",fontSize:"21px",paddingTop:"4px",paddingLeft:"10px"}}>목록</div>
                  <div className="subtitle" style={{width:'25%'}}>
                      <Button style={{width:"100%"}} onClick={this.orderparchasepath}>
                          구매하기
                      </Button>
                  </div>
              </div>
           <div className="searchdatemargin">
            <Table bordered hover>
                <thead>
                <tr className={"listTh"}>
                    <th><Form.Check className="ordercardtext" name="checkall" id={ordernum} onClick={this.checkall} /></th>
                    <th>No</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>요청일자</th>
                    <th>요청자</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>

                {reqdata && reqdata.map((num, i) => (
                    <tr key = {num+i}>
                        {this.checkenable(num.reqorder,num.reqnum)}
                        <td>{i+1}</td>
                        <td>{num.prodname}</td>
                        <td>{num.reqcount}</td>
                        <td>{num.reqprice && new CommonUtil().numberComma(num.reqprice)}</td>
                        <td>{num.reqdate}</td>
                        <td>{num.username}</td>
                        <td>{num.reqorder}</td>

                    </tr>
                ))}
                </tbody>
            </Table>

        </div>
        </div>

        )
    }
}

export default withRouter(OrderTable);