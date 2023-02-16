import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
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
    
    statebtn=(state)=>{
        if(state=="all") {
            return (
               <div className="subtitle" style={{height:'37.5px'}}>
                  <div className="dotmargin" ></div>
                  <div style={{width:'64%',fontWeight:"bold",fontSize:"18px",paddingTop:"4px",paddingLeft:"10px"}}>목록</div>
                  <div className="subtitle" style={{width:'36%',paddingLeft:"10%"}}>
                      <Button style={{width:"90.5%"}} onClick={this.orderparchasepath} hidden>
                          구매하기
                      </Button>
                  </div>
              </div>
            )
        }
        else if(state=="prevparchase") {
            return (
               <div className="subtitle">
                  <div className="dotmargin" ></div>
                  <div style={{width:'64%',fontWeight:"bold",fontSize:"18px",paddingTop:"4px",paddingLeft:"10px"}}>목록</div>
                  <div className="subtitle" style={{width:'36%',paddingLeft:"10%"}}>
                      <Button style={{width:"90.5%"}} onClick={this.orderparchasepath}>
                          구매하기
                      </Button>
                  </div>
              </div>
            )
            
        }else if(state=="parchase") {
            return (
                <div className="subtitle" style={{height:'37.5px'}}>
                  <div className="dotmargin" ></div>
                  <div style={{width:'64%',fontWeight:"bold",fontSize:"18px",paddingTop:"4px",paddingLeft:"10px"}}>목록</div>
                  <div className="subtitle" style={{width:'36%',paddingLeft:"10%"}}>
                        <Button style={{width:"90.5%"}} onClick={this.orderparchasepath} hidden>
                          구매하기
                      </Button>
                  </div>
              </div>
            )
        } 
    }
    dataempty =(data)=>{
        const text = "데이터가 존재하지 않습니다.";
        if(data.length == 0)
        {
            return(
                <tr>
                    <td colSpan={8} style={{textAlign:"center",fontWeight:"bold",fontSize:"18px"}}>{text}</td>
                </tr>
            )
        }
    }

    render() {
        const {reqdata} = this.props;
        return (
            <div>
                {this.statebtn(this.props.orderreqstate)}
           <div className="subtablemargin">
            <Table bordered hover>
                <thead>
                <tr className={"listTh"}>
                    <th style={{width:"3%"}}><Form.Check className="ordercardtext" name="checkall" id={ordernum} onClick={this.checkall} /></th>
                    <th style={{width:"5%"}}>No</th>
                    <th style={{width:"23%"}}>상품명</th>
                    <th style={{width:"10%"}}>수량</th>
                    <th style={{width:"13%"}}>가격</th>
                    <th style={{width:"11%"}}>요청일자</th>
                    <th style={{width:"7%"}}>요청자</th>
                    <th style={{width:"7%"}}>상태</th>
                </tr>
                </thead>
                <tbody style={{fontSize:"10px"}}>
                {this.dataempty(reqdata)}
                {reqdata && reqdata.map((num, i) => (
                    <tr key = {num+i} >
                        {this.checkenable(num.reqorder,num.reqnum)}
                        <td style={{fontSize:"15px"}}>{i+1}</td>
                        <td style={{fontSize:"15px"}}>{num.prodname}</td>
                        <td style={{fontSize:"15px"}}>{num.reqcount+"개"}</td>
                        <td style={{fontSize:"15px"}}>{num.reqprice && new CommonUtil().numberComma(num.reqprice)+"원"}</td>
                        <td style={{fontSize:"15px"}}>{num.reqdate}</td>
                        <td style={{fontSize:"15px"}}>{num.username}</td>
                        <td style={{fontSize:"15px"}}>{num.reqorder}</td>

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