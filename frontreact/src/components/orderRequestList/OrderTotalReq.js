import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
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
        }
    }

    render() {
        const {reqdata} = this.state
        const totalprice = this.props.totalprice

        return (
            <div className="orderdelivercard">
                <Card style={{width: '95%'}} className="orderdelivercardborder">
                    <Card.Body>
                        <Container>
                            <Table bordered hover>
                                <thead >
                                <tr className={"listTh"}>
                                    <th style={{width:"8%"}}>No</th>
                                    <th style={{width:"42%"}}>상품명</th>
                                    <th style={{width:"25%"}}>상품수량</th>
                                    <th style={{width:"25%"}}>상품가격</th>
                                </tr>
                                </thead>
                                <tbody >
                                {reqdata && reqdata.map((data, i) => (
                                    <tr key={data+i}>
                                        <td style={{fontSize:"15px"}}>{i + 1}</td>
                                        <td style={{fontSize:"15px"}}>{data[1]}</td>
                                        <td style={{fontSize:"15px"}}>{data[2] + "개"}</td>
                                        <td style={{fontSize:"15px"}}>{data[3] && new CommonUtil().numberComma(data[3])+"원"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className={"totalprice"}>
                                <span>총 결제금액 : </span>
                                <span>{totalprice && new CommonUtil().numberComma(totalprice) + "원"}</span>
                            </div>
                        </Container>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default OrderTotalReq;
