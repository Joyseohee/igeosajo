import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import all from "../../img/allicon.png";
import DaumPostcode from 'react-daum-postcode';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import OrderReqDate from "./OrderReqDate";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
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
        this.modalshow = this.modalshow.bind(this)
        this.onChangeNum = this.onChangeNum.bind(this)
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.zoneCode !== prevProps.zoneCode) {
            this.setState({zoneCode : this.props.zoneCode});
            console.log(this.props.zoneCode)
        }
        if (this.props.fullAddress !== prevProps.fullAddress) {
            this.setState({fullAddress : this.props.fullAddress});
        }
    }
    onChangeNum = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
    modalshow= () =>{
        this.props.handleShow(true)
    }
    onChangeNum = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
    render() {
        const{isPopupOpen,show,zoneCode,fullAddress}= this.state
        return (
            <div className="orderdelivercard">
                <Card className="orderdelivercardborder" >
                    <Card.Body>
                        <Card.Text>
                            <Container >
                                <Table striped>
                                    {/*<tr className="orderdelivercardsideline" >*/}
                                    {/*    <th className="orderdelivercardside" style={{width: '25%'}}>수신자명</th>*/}
                                    {/*    <td  style={{width: '75%',padding: '10px'}} colSpan={3}>*/}
                                    {/*        <input type="text"  id="receivename" className="form-control " placeholder="ex) 이기찬"  />*/}
                                    {/*    </td>*/}
                                    {/*</tr>*/}
                                    {/*<tr className="orderdelivercardsideline">*/}
                                    {/*    <th className="orderdelivercardside" style={{width: '25%'}}>배송지명</th>*/}
                                    {/*    <td  style={{width: '75%',padding: '10px'}} colSpan={3}>*/}
                                    {/*        <input type="text"  id="placename" className="form-control " placeholder="ex) 더존비즈온 사무실"  />*/}
                                    {/*    </td>*/}
                                    {/*</tr>*/}
                                    <tr >
                                        <th className="orderdelivercardside orderdelivercardsideline" style={{width: '25%'}} rowSpan={3}>주소</th>
                                        <tr >
                                            <td style={{width: '55%',padding: '10px'}} >
                                                <input type="text"  id="postcode" className="form-control " placeholder="ex)우편번호" value={zoneCode} maxLength='5' style={{width: '40%',padding: '10px',backgroundColor:'white'}}  disabled/>
                                            </td>
                                            <td  style ={{width: '20%',padding: '10px'}}>
                                                <Button  onClick={this.modalshow} style={{width: '100%',padding: '10px'}}>우편번호 검색</Button>
                                            </td>
                                        </tr>
                                    </tr>
                                     <tr >
                                        <td style={{width: '75%',padding: '10px'}}>
                                            <input type="text"  id="address" className="form-control " placeholder="ex) 검색주소" value={fullAddress} style={{backgroundColor:'white'}}  disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width: '75%',padding: '10px'}}>
                                            <input type="text"  id="detailaddress" className="form-control " placeholder="ex) 상세주소 입력"  />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="orderdelivercardside orderdelivercardsideline" style={{width: '25%'}}>휴대폰번호</th>
                                        <tr>
                                        <td style={{width: '30%',padding: '10px'}}>
                                            <input type="text"  id="firstphonenum" className="form-control " placeholder="ex) 010" maxLength='3'  onChange={(e) => {this.onChangeNum(e)}} />
                                        </td>
                                        <td style={{width: '5%',padding: '10px'}}>
                                            <span>-</span>
                                        </td>
                                        <td style={{width: '30%',padding: '10px'}}>
                                           <input type="text"  id="midphonenum" className="form-control " placeholder="ex) 1234"  maxLength='4' onChange={(e) => {this.onChangeNum(e)}} />
                                        </td>
                                        <td style={{width: '5%',padding: '10px'}}>
                                             <span>-</span>
                                        </td>
                                        <td style={{width: '30%',padding: '10px'}}>
                                            <input type="text"  id="lastphonenum" className="form-control " placeholder="ex) 5678"  maxLength='4' onChange={(e) => {this.onChangeNum(e)}} />
                                        </td></tr>
                                    </tr>
                                    <tr>
                                        <th className="orderdelivercardside orderdelivercardsideline" style={{width: '25%'}}>배송요청사항</th>
                                        <td style={{width: '75%',padding: '10px'}}>
                                             <input type="text"  id="delivermemo" className="form-control " placeholder="ex) 조심히 배달해주세요!" />
                                        </td>
                                    </tr>
                                </Table>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default OrderDataInput;
