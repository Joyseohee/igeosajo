import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";

let requestList = [];
let check = true;

class requestTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            reqList: [],
            outcomeState: false
        }
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/request?reqstaging=처리전&reqstate=승인')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
    };

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    choiceAll = () => {
        requestList = []

        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;

            if (selectAll[0].checked) {
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

    closeState = () => {
        this.props.openModal(false);
    }

    changeModalState = (e) => {
        this.setState({modalopen: e})
    }

    outcomeState = (e) => {

        this.setState({outcomeState: e})

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
            check = true;

            if (check) {
                fetch('http://127.0.0.1:8000/api/request?reqstaging=처리전&reqstate=승인')
                    .then(response => response.json())
                    .then(response => this.setState({items: response, isLoaded: true}))
                check = false;
            }
            this.reqSendClick(false)
            this.closeState();

            window.location.assign("http://localhost:3000/docreqdetail");
        } else {
            this.reqSendClick(false)
            this.closeState();
        }
    }

    render() {
        let modalOpen = this.props.modalOpen

        let {isLoaded} = this.state;
        if (!isLoaded) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
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
                        this.state.items.map((list, idx) => {
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
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState} modalKind={this.state.reqList.length !== 0}></Modal1>
                        : <Modal1 open={modalOpen} ment={"선택한 목록이 없습니다."}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState}
                                  modalKind={this.state.reqList.length !== 0}></Modal1>
                }

            </div>
        );
    }
}

export default withRouter(requestTable);