import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Table} from "react-bootstrap";

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

    handleCheck(e) {
        let arr = this.state.checkedItems;
        console.log(arr);
        let check = arr.findIndex(item => item === e.target.value);
        if (check === -1) {
            arr.push(e.target.value);
            this.setState((state) => ({
                checkedItems: state.checkedItems,
            }))
        } else {
            if (check > -1) arr.splice(check, 1);
            this.setState((state) => ({
                checkedItems: state.checkedItems,
            }))
        }
        console.log(arr);
        this.props.storeChecked(arr);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.requestlist !== this.props.requestlist) {
            this.setState((props) => ({
                requestlist: props.requestlist,
            }));
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th><input type="checkbox" name="check" value={this.props.requestlist}
                                   onChange={(e) => this.handleCheckAll(e)}/></th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.requestlist.map((item, i) => {
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
                </Table>
            </div>
        );
    }
}

export default ReqList;
