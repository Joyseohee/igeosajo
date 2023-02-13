import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";

import "../../styled/DocList.css"

let requestList = [];
let check = true;

class requestTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reqList: []
        }
    }

    choiceAll = () => {
        requestList = []

        let checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll')[0];

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll.checked;

            if (selectAll.checked) {
                requestList.push(checkbox.value);
            }
        })
        this.setState({reqList: requestList});
    }

    choiceUnit = (check, val) => {
        if (check) {
            requestList.push(val);
        } else {
            for (let i = 0; i < requestList.length; i++) {
                if (requestList[i] == val) {
                    requestList.splice(i, 1);
                    break;
                }
            }
        }

        this.setState({reqList: requestList});
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    closeState = () => {
        this.props.openModal(false);
    }

    outcomeState = (e) => {
        if (e === 1) {
            fetch("http://127.0.0.1:8000/api/document", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: this.state.reqList
                }),
            })
            this.reqSendClick(false)
            this.closeState();

            window.location.assign("http://localhost:3000/docreqdetail");
        }

        this.reqSendClick(false)
        this.closeState();
    }

    render() {
        let modalOpen = this.props.modalOpen
        let items = this.props.items

        return (
            <div>
                <Table bordered hover>
                    <thead>
                    <tr className={"doclistTh"}>
                        <th>No</th>
                        <th><Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((list, idx) => {
                            return (
                                <tr key={list.reqnum}>
                                    <td>{idx + 1}</td>
                                    <td><Form.Check aria-label="option 1" name={"select"} value={list.reqnum}
                                                    onChange={(e) => {
                                                        this.choiceUnit(e.target.checked, e.target.value);
                                                    }}/></td>
                                    <td>{list.prodname}</td>
                                    <td>{list.reqcount}</td>
                                    <td>{list.reqapvdate}</td>
                                    <td>{list.username}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                {
                    modalOpen && this.state.reqList.length !== 0
                        ? <Modal1 open={modalOpen} ment={"선택한 목록으로 작성 하시겠습니까?"}
                                  outcomeState={this.outcomeState} modalKind={this.state.reqList.length !== 0}></Modal1>
                        : <Modal1 open={modalOpen} ment={"선택한 목록이 없습니다."}
                                  outcomeState={this.outcomeState}
                                  modalKind={this.state.reqList.length !== 0}></Modal1>
                }

            </div>
        );
    }
}

export default withRouter(requestTable);