import React, {Component} from "react";
import {Form} from "react-bootstrap";

class ReqListTbody extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {request, checkedRequest, checkedAll} = this.props;
        const disabled = this.props.filter==='대기'?false:true;
        console.log(checkedAll);
        return (
            <>
                <tr>
                    <td>{this.props.i + 1}</td>
                    <td>{request.reqnum}</td>
                    <td><Form.Check type={"checkbox"} name="check" value={request.reqnum} onChange={(e) => this.props.handleCheck(e)} disabled={disabled}
                                    checked={checkedRequest.includes(request.reqnum.toString())||checkedAll}/></td>
                    <td>{request.prodname}</td>
                    <td>{request.reqcount}</td>
                    <td>{request.reqdate}</td>
                    <td>{request.username}</td>
                    <td>{request.reqstate}</td>
                </tr>
            </>
        );
    }
}

export default ReqListTbody;

