import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";
import CommonUtil from "../../util/CommonUtil";
import Modal2 from "../layout/Modal2";

let reqnum;
let arr;

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

    outcomeState = async (e) => {
        if (e === 2) {
            // 승인 처리
            await fetch("http://127.0.0.1:8000/api/document/" + this.props.docnum.toString(), {
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

            await this.props.history.push({
                pathname: "/main"
            })
        }

        await this.reqSendClick(false, false)
        await this.props.openModal(false, false)
    }

    inputReject = async (e) => {
        // 반려 처리
        if (e !== "취소") {
            // 여기에 하면 됨
            await fetch("http://127.0.0.1:8000/api/document/" + this.props.docnum.toString(), {
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

            await this.reqSendClick(false, false)
            await this.props.openModal(false, false)

            await this.props.history.push({
                pathname: "/main"
            })
        }

        await this.reqSendClick(false, false)
        await this.props.openModal(false, false)
    }

    render() {
        let modalOpen = this.props.modalOpen
        let items = this.props.items
        let reject = this.props.reject
        let prodnamearr = this.props.prodnamearr
        let countarr = this.props.countarr

        reqnum = this.props.items.reqnum

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
                        <td>
                            <Table bordered>
                                <tbody className={"prodnameTable"}>
                                <tr>
                                    <td>상품명</td>
                                    <td>수량</td>
                                </tr>
                                {
                                    prodnamearr.map((prodname, idx) => {
                                        return (
                                            <tr key={prodname}>
                                                <td>{prodname}</td>
                                                <td>{countarr[idx]}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </td>
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