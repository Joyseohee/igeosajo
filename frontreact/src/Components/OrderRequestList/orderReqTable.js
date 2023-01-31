import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

let ordernum

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqdata: [],
            docstate:this.props.orderdocstate,
            startdate: this.props.startdate,
            enddate: this.props.enddate,
        }
    }
    componentDidMount() {
            fetch('http://127.0.0.1:8000/api/document?func=reqnumget&startdate='+this.props.startdate+'&enddate='+this.props.enddate+'&docstate='+this.props.orderdocstate)
            .then(res => res.json())
            .then(data => {
                {
                     // console.log({data})
                    data && data.map((num, i) => (
                        fetch('http://127.0.0.1:8000/api/request/' + num.reqnum)
                            .then(res => res.json())
                            .then(data => {
                                    this.setState({reqdata: this.state.reqdata.concat(...data)})
                                }
                            )))
                }
                })
    }
    render() {

        const {reqdata} = this.state

        return (

            <Table striped>
                <thead>
                <tr>
                    <th><Form.Check className="ordercardtext" name="checkall" id={ordernum} /></th>
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
                    <tr>
                        <td><Form.Check className="ordercardtext"  name="check" id={num.reqnum} /></td>
                        <td>{i+1}</td>
                        <td>{num.prodname}</td>
                        <td>{num.reqcount}</td>
                        <td>{num.reqprice}</td>
                        <td>{num.reqdate}</td>
                        <td>{num.username}</td>
                        <td>처리전</td>
                    </tr>
                ))}
                </tbody>
            </Table>


        )
    }
}


export default OrderTable;
