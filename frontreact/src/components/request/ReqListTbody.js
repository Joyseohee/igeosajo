import React, {Component} from "react";

class ReqListTbody extends Component {
    constructor(props) {
        super(props);
        console.log();
    }

    render() {
        const item = this.props.item;

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
                        <input type="checkbox" name="check" value={item.reqnum}
                               onChange={(e) => this.props.handleCheck(e)}/>
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

