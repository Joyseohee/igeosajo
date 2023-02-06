import React, {Component} from "react";
import ReqListTbody from "./ReqListTbody";
import {Form, Table} from "react-bootstrap";
import Api from "../../api/Api";
import request from "../../pages/Request";

class ReqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: [],
        }
        this.handleCheck = this.handleCheck.bind(this);
    }

    async componentDidMount() {
        try {
            console.log(this.props.termyearmonth);
            this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.termyearmonth !== this.props.termyearmonth) {
            try {
                this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
            } catch (e) {
                console.error(e);
            }
        }
        if(prevProps.checkedRequest !== this.props.checkedRequest) {
            setTimeout(()=>{
                this.getlist("request", {termyearmonth: this.props.termyearmonth}, null, "requestlist");
            }, 500);
        }
    }

    getlist = (table, params, pk, stateName) => {
        new Api().read(table, params, pk).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                [stateName]: response,
            })
        })
    }

    handleCheckAll(checked) {
        this.setState({
            checkedAll: checked,
        })
        checked ? this.props.storeChecked(this.state.requestlist) : this.props.storeChecked([]);
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
        const requestlist = this.state.requestlist;
        return (
            <div className="wrapper">
                <Table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>reqnum</th>
                        <th>
                            <Form.Check type={"checkbox"} name="checkedRequest" value={requestlist}
                                        onChange={(e) => this.handleCheckAll(e.target.checked)}/>
                        </th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requestlist.map((request, i) => {
                        return (
                            <ReqListTbody request={request} key={request.reqnum} i={i}
                                          handleCheck={this.handleCheck}
                                          checkedAll={this.state.checkedAll}
                                          checkedRequest={this.props.checkedRequest}/>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ReqList;
