import React, {Component} from "react";
import {Form} from "react-bootstrap";

class ReqListTbodyUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {request, checkedRequest, checkedAll} = this.props;
         const reqstate = this.props.request.reqstate ;
        console.log(checkedAll);
        return (
            <>
                <tr>
                    <td>{this.props.i + 1}</td>
                    <td>{request.reqnum}</td>
                    <td>{reqstate==='대기' ? <Form.Check type={"checkbox"} name="check" value={request.reqnum} onChange={(e) => this.props.handleCheck(e)}
                                    checked={checkedRequest.includes(request.reqnum.toString())||checkedAll}/>: null}</td>
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

export default ReqListTbodyUser;

