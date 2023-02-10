import React, {Component} from "react";
import {Form} from "react-bootstrap";

class ReqListTbody extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {request, checkedAll, i} = this.props;
        // const disabled = this.props.filter==='대기'?false: true;
        // const disabled = !(request.reqstate === '대기');
        console.log(checkedAll);
        return (
            <>
                <tr>
                    <td>{i + 1}</td>
                    <td>{request.reqnum}</td>
                    <td><Form.Check name={`request${i + 1}`}
                                    checked={request.checked}
                                    onChange={(e) => this.props.handleCheckboxChange(e)}
                    /></td>
                    {/*checked={checkedRequest.includes(request.reqnum.toString()) || (checkedAll && request.reqstate ==='대기')}/></td>*/}
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

