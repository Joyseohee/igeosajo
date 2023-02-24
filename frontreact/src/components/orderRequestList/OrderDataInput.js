import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";

class OrderDataInput extends Component {
    constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            startyear: date.getFullYear(),
            startmonth: (date.getMonth() + 1),
            endyear: date.getFullYear(),
            endmonth: (date.getMonth() + 1),
            zoneCode: this.props.zoneCode,
            fullAddress:this.props.fullAddress,
        }
    }

    modalshow= () =>{
        this.props.handleShow(true,"deliver")
    }
    onChangeNum = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
    render() {
        const{zoneCode,fullAddress}= this.props
        return (
            <div className="orderdelivercard">
                <Card className="orderdelivercardborder" >
                    <Card.Body>

                            <Container >
                                <Table  >
                                    <tbody>
                                        <tr>
                                            <td className="orderdelivercardside orderdelivercardsideline" style={{width: '25%',backgroundColor:"rgb(52,152,219)"}} rowSpan={3}>주소</td>
                                            <td style={{width: '70%',padding: '10px',borderBottomWidth: "0px",borderTopWidth: "1px"}} colSpan={4}>
                                                <input type="text"  id="postcode" className="form-control " placeholder="ex)우편번호" value={zoneCode} maxLength='5' style={{width: '40%',padding: '10px',backgroundColor:'white'}}  disabled/>
                                            </td>
                                            <td  style ={{width: '12%',padding: '10px',borderTopWidth: "1px",borderBottomWidth: "0px",borderRightWidth: "1px"}}>
                                                <Button  onClick={this.modalshow} style={{width: '100%',padding: '10px'}}>우편번호 검색</Button>
                                            </td>
                                        </tr>
                                         <tr >
                                            <td style={{width: '75%',padding: '10px',borderBottomWidth: "0px",borderRightWidth: "1px"}} colSpan={5}>
                                                <input type="text"  id="address" className="form-control " placeholder="ex) 검색주소" value={fullAddress} style={{backgroundColor:'white'}}  disabled/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '75%',padding: '10px',borderBottomWidth: "0px",borderRightWidth: "1px"}} colSpan={5}>
                                                <input type="text"  id="detailaddress" className="form-control " placeholder="ex) 상세주소 입력"  />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="orderdelivercardside orderdelivercardsideline" style={{width: '25%',backgroundColor:"rgb(52,152,219)"}}>휴대폰번호</td>

                                            <td style={{width: '20%',padding: '10px',borderBottomWidth: "0px"}}>
                                                <input type="text"  id="firstphonenum" className="form-control " placeholder="ex) 010" maxLength='3'  onChange={(e) => {this.onChangeNum(e)}} />
                                            </td>
                                            <td style={{width: '7%',padding: '10px',borderBottomWidth: "0px"}}>
                                                <span>-</span>
                                            </td>
                                            <td style={{width: '20%',padding: '10px',borderBottomWidth: "0px"}}>
                                               <input type="text"  id="midphonenum" className="form-control " placeholder="ex) 1234"  maxLength='4' onChange={(e) => {this.onChangeNum(e)}} />
                                            </td>
                                            <td style={{width: '7%',padding: '10px',borderBottomWidth: "0px"}}>
                                                 <span>-</span>
                                            </td>
                                            <td style={{width: '20%',padding: '10px',borderBottomWidth: "0px",borderRightWidth: "1px"}}>
                                                <input type="text"  id="lastphonenum" className="form-control " placeholder="ex) 5678"  maxLength='4' onChange={(e) => {this.onChangeNum(e)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="orderdelivercardside orderdelivercardsideline" style={{width: '25%',backgroundColor:"rgb(52,152,219)"}}>배송요청사항</td>
                                            <td style={{width: '75%',padding: '10px' ,borderRightWidth: "1px"}} colSpan={5}>
                                                 <input type="text"  id="delivermemo" className="form-control " placeholder="ex) 조심히 배달해주세요!" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Container>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default OrderDataInput;
