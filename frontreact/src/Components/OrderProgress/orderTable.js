import React, {Component} from 'react';
import Table from "react-bootstrap/Table";

let ordernum

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqnum: [],
        }

        ordernum = this.props.ordernum
        fetch('http://127.0.0.1:8000/api/order?func=reqnumget&ordernum=' + ordernum)
            .then(res => res.json())
            .then(data => {
                {
                     // console.log({data})

                    data && data.map((num, i) => (
                        fetch('http://127.0.0.1:8000/api/request/' + num.reqnum)
                            .then(res => res.json())
                            .then(data => {
                                    // console.log(totalprice)
                                    // console.log(data)
                                    // console.log(i)
                                    let totalprice = 0
                                    this.setState({reqnum: this.state.reqnum.concat(...data)})
                                    {data && data.map((num, i) => (
                                        totalprice = totalprice + num.reqprice
                                    ))}

                                }
                            )))
                }

                })

    }
    componentDidMount() {

    }
    render() {

        const {reqnum} = this.state

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
                {reqnum && reqnum.map((num, i) => (
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
