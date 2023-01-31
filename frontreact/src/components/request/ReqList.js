import React, {Component} from "react";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: [],
        }
    }

    handleCheck = (e) => {
        let check = this.state.checkedItems.findIndex(item => item === e.target.value);
        if (check === -1) {
            this.state.checkedItems.push(e.target.value);
            this.setState({
                checkedItems: this.state.checkedItems,
            })
        } else {
            // const a = this.state.checkedItems.findIndex(item => item === e.target.value);
            if (check > -1) this.state.checkedItems.splice(check, 1);
            this.setState({
                checkedItems: this.state.checkedItems,
            })
        }
        this.props.storeChecked(this.state.checkedItems);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.setState({
                items: this.props.items,
            });
        }
    }

    render() {

        return (
            <div className="wrapper">
                <table>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th>체크</th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    {this.props.items.map((item, i) => {
                        return (
                            <>
                                <tr>
                                    <td>
                                        {i+1}
                                    </td>
                                    <td>
                                        {item.reqnum}
                                    </td>
                                    <td>
                                        <input type="checkbox" name="check" value={item.reqnum}
                                               onChange={(e) => this.handleCheck(e)}/>
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
                    })}

                </table>
            </div>
        );
    }
}

export default ReqList;
