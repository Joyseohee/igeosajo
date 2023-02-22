import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";
import CommonUtil from "../../util/CommonUtil";

class DocPaymentTable extends Component {

    constructor(props) {
        super(props);

    }


    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    outcomeState = async (e) => {
        if (e === 1) {

            await fetch("http://127.0.0.1:8000/api/document?docDetail=" + this.props.location.document.detailDocNum.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reqnum: this.props.items.reqnum
                }),
            })

            await this.props.openModal(false)
            await this.reqSendClick(false)

            await this.props.history.push({
                pathname: "/docpaylist"
            })
        } else {
            await this.props.openModal(false)
            await this.reqSendClick(false)
        }
    }

    render() {
        let modalOpen = this.props.modalOpen
        let items = this.props.items
        let prodnamearr = this.props.prodnamearr
        let countarr = this.props.countarr

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
                        <td>진도준</td>
                    </tr>
                    <tr>
                        <td>결재자</td>
                        <td>진양철</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>
                            <Table bordered>
                                <tbody className={"prodnameTable"}>
                                <tr>
                                    <td>상품명</td>
                                    <td>수량</td>
                                    <td>금액</td>
                                </tr>
                                {
                                    prodnamearr.map((prodname, idx) => {
                                        return (
                                            <tr key={prodname}>
                                                <td>{prodname}</td>
                                                <td>{countarr[idx]}</td>
                                                <td>{
                                                    items["prodMoney"] &&
                                                    new CommonUtil().numberComma(items["prodMoney"][idx])
                                                }원
                                                </td>
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

                <Modal1 open={modalOpen} ment={"상신을 취소하면 되돌릴 수 없습니다. 취소 하시겠습니까?"}

                        outcomeState={this.outcomeState}
                        modalKind={true}></Modal1>

            </div>
        );
    }
}

export default withRouter(DocPaymentTable);