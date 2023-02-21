import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import CommonUtil from "../../util/CommonUtil";
import Paging from "../layout/Paging";

let ordernum

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum: this.props.ordernum,
            reqdata: [],
            pageNum: 1,
            pageCount: 1,
            arr:[]
        }

    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?ordernum=' + this.state.ordernum + '&func=reqdataget')
                .then(res => res.json())
                .then(data => {
                    let arr = [];
                    const startnum = 0
                    let endnum = 9

                    if(endnum>(data.length-1)){
                        endnum = data.length-1
                    }
                    for(let i =startnum;i<=endnum;i++)
                    {
                         arr.push(data[i])
                    }
                    this.setState({reqdata: data,arr:arr})
                })

    }

    setPageNum = (e) => {
        let arr = [];
        const startnum = (e*10)-10
        let endnum = ((e*10) -1)

        if(endnum>(this.state.reqdata.length-1)){
            endnum = this.state.reqdata.length-1
        }

        for(let i =startnum;i<=endnum;i++)
        {
             arr.push(this.state.reqdata[i])
        }
        this.setState({pageNum: e, arr:arr})

    }


    tableView=()=>{
        return(
            <tbody>
                    {this.state.arr && this.state.arr.map((num, i) => (
                    <tr key={num+i}>
                        <td style={{fontSize:"15px"}}> {i+1} </td>
                        <td style={{fontSize:"15px"}}>{num.prodname}</td>
                        <td style={{fontSize:"15px"}}>{num.reqcount+"개"}</td>
                        <td style={{fontSize:"15px"}}>{num.reqprice && new CommonUtil().numberComma(num.reqprice)+"원"}</td>
                        <td style={{fontSize:"15px"}}>{num.username}</td>
                    </tr>
                ))}
                </tbody>
        )
    }

    render() {
        const {reqdata} = this.state
        return (
            <div>
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
                {this.tableView()}
            </Table>
                 <Paging
                     pageNum={this.state.pageNum}
                     setPageNum={this.setPageNum}
                     pageCount={this.state.reqdata.length}
                     showNum={10}/>
            </div>


        )
    }
}


export default OrderTable;
