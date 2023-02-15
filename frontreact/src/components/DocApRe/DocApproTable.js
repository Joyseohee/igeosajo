import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";
import CommonUtil from "../../util/CommonUtil";
import Modal2 from "../layout/Modal2";

let reqnum;

class DocPaymentTable extends Component {

    constructor(props) {
        super(props);
    }


    openModal = (modalOpen, reject) => {
        if (modalOpen && reject) {
            // 반려 버튼 누를때 모달
            return (<Modal2 open={modalOpen}
                            inputReject={this.inputReject}></Modal2>)
        } else if (modalOpen && !reject) {
            // 승인 버튼 누를 때
            return (<Modal1 open={modalOpen} ment={"승인 처리 되었습니다."}
                            outcomeState={this.outcomeState}
                            modalKind={false}></Modal1>)
        }
    }

    reqSendClick = (reqSend, reject) => {
        this.props.reqSendClick(reqSend, reject);
    }

    outcomeState = (e) => {
        if (e === 2) {
            // 승인 처리
            fetch("http://127.0.0.1:8000/api/document/" + this.props.docnum.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([
                    {
                        "state": "승인",
                        "reject": ""
                    }
                ]),
            })

            this.props.history.push({
                pathname: "/main"
            })
        }

        this.reqSendClick(false, false)
        this.props.openModal(false, false)
    }

    inputReject = (e) => {
        // 반려 처리
        if (e !== "취소"){
            // 여기에 하면 됨
            fetch("http://127.0.0.1:8000/api/document/" + this.props.docnum.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([
                    {
                        "state": "반려",
                        "reject": e
                    }
                ]),
            })

            this.props.history.push({
                pathname: "/main"
            })
        }

        this.reqSendClick(false, false)
        this.props.openModal(false, false)
    }

    render() {
        let modalOpen = this.props.modalOpen
        let items = this.props.items
        let words = this.props.words
        let reject = this.props.reject

        reqnum = this.props.items.reqnum

        console.log(items)

        return (
            <div className={"docPaymentTable"}>
                <Table striped="columns">
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td>비품 구매 결재 요청</td>
                    </tr>
                    <tr>
                        <td>작성일자</td>
                        <td>{items["wdate"]}</td>
                    </tr>
                    <tr>
                        <td>결재일자</td>
                        {
                            items["rdate"] === "None"
                                ? <td></td>
                                : <td>{items["rdate"]}</td>
                        }
                    </tr>
                    <tr>
                        <td>기안자</td>
                        <td>성은 기 이름은 안자 이름하여 기안자</td>
                    </tr>
                    <tr>
                        <td>결재자</td>
                        <td>김해 결씨 재자 돌림으로 재자 이름하여 결재자</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{words}</td>
                    </tr>
                    <tr>
                        <td>금액 총합</td>
                        <td>{
                            items["sum"] &&
                            new CommonUtil().numberComma(items["sum"])

                        }원
                        </td>
                    </tr>
                    <tr>
                        <td>진행 현황</td>
                        <td>{items["docstate"]}</td>
                    </tr>
                    <tr>
                        <td>반려이유</td>
                        {
                            items["rejectreason"] === "None"
                                ? (<td></td>)
                                : (<td>{items["rejectreason"]}</td>)
                        }

                    </tr>

                    </tbody>
                </Table>

                {this.openModal(modalOpen, reject)}

            </div>
        );
    }
}

export default withRouter(DocPaymentTable);