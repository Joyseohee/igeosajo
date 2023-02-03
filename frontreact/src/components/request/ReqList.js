import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: [],
        }
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheckAll(e) {
        let checks = e.target.value;
        console.log(checks[0]);
        checks.map((check) => {
            console.log(check.reqnum);
            this.setState({
                checkedItems: check.reqnum,
            })
        })
    }

    handleCheck(e)  {
        let check = this.state.checkedItems.findIndex(item => item === e.target.value);
        if (check === -1) {
            this.state.checkedItems.push(e.target.value);
            this.setState({
                checkedItems: this.state.checkedItems,
            })
        } else {
            if (check > -1) this.state.checkedItems.splice(check, 1);
            this.setState({
                checkedItems: this.state.checkedItems,
            })
        }
        this.props.storeChecked(this.state.checkedItems);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.setState((props)=>({
                items: props.items,
            }));
        }
    }

    render() {
        return (
            <div className="wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th><input type="checkbox" name="check" value={this.props.items}
                                   onChange={(e) => this.handleCheckAll(e)}/></th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map((item, i) => {
                        return (
                            <ReqListTbody item={item} key={item.reqnum} i={i} handleCheck={this.handleCheck}/>
                            // <tr>
                            //     <td>
                            //         {i + 1}
                            //     </td>
                            //     <td>
                            //         {item.reqnum}
                            //     </td>
                            //     <td>
                            //         <input type="checkbox" name="check" value={item.reqnum}
                            //                onChange={(e) => this.handleCheck(e)}/>
                            //     </td>
                            //     <td>
                            //         {item.prodname}
                            //     </td>
                            //     <td>
                            //         {item.reqcount}
                            //     </td>
                            //     <td>
                            //         {item.reqdate}
                            //     </td>
                            //     <td>
                            //         {item.username}
                            //     </td>
                            //     <td>
                            //         {item.reqstate}
                            //     </td>
                            // </tr>

                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ReqList;
