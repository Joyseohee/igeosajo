import React, {Component} from "react";
import {Form} from "react-bootstrap";

class ReqListTbody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.request;
        return (
            <>
                <tr>
                    <td>
                        {this.props.i + 1}
                    </td>
                    <td>
                        {item.reqnum}
                    </td>
                    <td>
                        <Form.Check type={"checkbox"} name="check" value={item.reqnum}
                                    onChange={(e) => this.props.handleCheck(e)}
                                    checked={this.props.checkedRequest.includes(item.reqnum.toString())||this.props.checkedAll}/>
                    </td>
                    <td>
                        {item.prodname}
                    </td>
                    <td>
                        {item.reqcount}
                    </td>
                    <td>
                        {item.reqdate}
                    </td>
                    <td>
                        {item.username}
                    </td>
                    <td>
                        {item.reqstate}
                    </td>
                </tr>
            </>
        );
    }
}

export default ReqListTbody;

