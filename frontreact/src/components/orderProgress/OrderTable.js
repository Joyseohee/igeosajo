import React, {Component} from 'react';
import Table from "react-bootstrap/Table";

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
                     console.log(data)})
    }
    componentDidUpdate(prevProps) {
         if (this.props.ordernum !== prevProps.ordernum) {
            this.setState({ordernum : this.props.ordernum});
        }
    }

    render() {
        const {reqdata} = this.state
        console.log(reqdata)
        return (

            <Table striped>
                <thead>
                <tr>
                    <th>No</th>
                    <th>상품코드</th>
                    <th>사무용품</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>요청자</th>
                </tr>
                </thead>
                <tbody>
                {reqdata && reqdata.map((num, i) => (
                    <tr>
                        <td> {i+1} </td>
                        <td>{num.prodnum}</td>
                        <td>{num.prodname}</td>
                        <td>{num.reqcount}</td>
                        <td>{num.reqprice}</td>
                        <td>{num.username}</td>
                    </tr>
                ))}
                </tbody>
            </Table>


        )
    }
}


export default OrderTable;
