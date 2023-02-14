import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import CommonUtil from "../../util/CommonUtil";

let ordernum

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum: this.props.ordernum,
            reqdata: [],
        }

    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?ordernum=' + this.state.ordernum + '&func=reqdataget')
                .then(res => res.json())
                .then(data => {
                    this.setState({reqdata: data})
                })
    }

    render() {
        const {reqdata} = this.state
        return (

            <Table bordered hover>
                <thead>
                <tr className={"listTh"}>
                    <th style={{width:"6%"}}>No</th>
                    <th style={{width:"40%"}}>사무용품</th>
                    <th style={{width:"13%"}}>수량</th>
                    <th style={{width:"21%"}}>가격</th>
                    <th style={{width:"10%"}}>요청자</th>
                </tr>
                </thead>
                <tbody>
                {reqdata && reqdata.map((num, i) => (
                    <tr key={num+i}>
                        <td style={{fontSize:"15px"}}> {i+1} </td>
                        <td style={{fontSize:"15px"}}>{num.prodname}</td>
                        <td style={{fontSize:"15px"}}>{num.reqcount+"개"}</td>
                        <td style={{fontSize:"15px"}}>{num.reqprice && new CommonUtil().numberComma(num.reqprice)+"원"}</td>
                        <td style={{fontSize:"15px"}}>{num.username}</td>
                    </tr>
                ))}
                </tbody>
            </Table>


        )
    }
}


export default OrderTable;
