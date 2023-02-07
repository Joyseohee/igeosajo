import React, {Component} from "react";
import {Form} from "react-bootstrap";

class ReqListTbody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const request = this.props.request;
        const checkedRequest = this.props.checkedRequest;
        const checkedAll = this.props.checkedAll;
        return (
            <>
                <tr>
                    <td>
                        {this.props.i + 1}
                    </td>
                    <td>
                        {request.reqnum}
                    </td>
                    <td>
                        <Form.Check type={"checkbox"} name="check" value={request.reqnum}
                                    onChange={(e) => this.props.handleCheck(e)}
                                    checked={checkedRequest.includes(request.reqnum.toString())||checkedAll}/>
                    </td>
                    <td>
                        {request.prodname}
                    </td>
                    <td>
                        {request.reqcount}
                    </td>
                    <td>
                        {request.reqdate}
                    </td>
                    <td>
                        {request.username}
                    </td>
                    <td>
                        {request.reqstate}
                    </td>
                </tr>
            </>
        );
    }
}

export default ReqListTbody;

