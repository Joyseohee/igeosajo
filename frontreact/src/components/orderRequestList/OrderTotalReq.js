import React, {Component} from 'react';
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
import CommonUtil from "../../util/CommonUtil";

class OrderTotalReq extends Component {
    constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            reqdata: this.props.reqdata
        }

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reqdata !== prevProps.reqdata) {
            this.setState({reqdata: this.props.reqdata});
            console.log(this.props.reqdata)
        }
    }

    render() {
        const {reqdata} = this.state
        const totalprice = this.props.totalprice
        console.log(this.props.totalprice)
        return (
            <div className="orderdelivercard">
                <Card style={{width: '95%'}} className="orderdelivercardborder">
                    <Card.Body>
                        <Container>
                            <Table bordered hover>
                                <thead className="orderdelivertable orderdelivertablefont">
                                <tr className={"listTh"}>
                                    <th>No</th>
                                    <th>상품코드</th>
                                    <th>상품명</th>
                                    <th>상품수량</th>
                                    <th>상품가격</th>
                                </tr>
                                </thead>
                                <tbody className="orderdelivertablebe">
                                {reqdata && reqdata.map((data, i) => (
                                    <tr className="orderdelivertablebe">
                                        <td>{i + 1}</td>
                                        <td>{data[0]}</td>
                                        <td>{data[1]}</td>
                                        <td>{data[2]}</td>
                                        <td>{data[3] && new CommonUtil().numberComma(data[3])}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div>
                                <span>TotalPrice : </span>
                                <span>{totalprice && new CommonUtil().numberComma(totalprice)}</span>
                            </div>
                        </Container>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default OrderTotalReq;
