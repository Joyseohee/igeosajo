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
            modalopen: false,
            modalKind: false,
            outcomeState: false
        }
        this.choiceAll = this.choiceAll.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);
        this.openState = this.openState.bind(this);
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/request?reqstaging=처리전&reqstate=승인')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
    };

    async componentDidUpdate(prevProps) {
        if (this.props.reqSend && !prevProps.reqSend) {
            if (this.state.reqList.length === 0) {
                this.setState({modalKind: false});
            } else {
                this.setState({modalKind: true});
            }
            this.openState(); // 모달 창 연다
        }
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    async componentWillUnmount(){
        this.reqSendClick(false)
    }

    choiceAll() {
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

    choiceUnit(check, val) {
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

    openState() {
        this.setState({modalopen: true});
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
            // this.props.history.push("/docreqdetail");
            window.location.assign("http://localhost:3000/docreqdetail");
        } else {
            window.location.reload();
        }
    }

    render() {

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
                    this.state.modalKind
                        ? <Modal1 open={this.state.modalopen} ment={"선택한 목록으로 작성 하시겠습니까?"}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState} modalKind={this.state.modalKind}></Modal1>
                        : <Modal1 open={this.state.modalopen} ment={"선택한 목록이 없습니다."}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState}
                                  modalKind={this.state.modalKind}></Modal1>
                }

            </div>
        );
    }
}

export default withRouter(requestTable);