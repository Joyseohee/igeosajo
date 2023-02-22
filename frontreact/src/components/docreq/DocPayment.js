import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";
import CommonUtil from "../../util/CommonUtil";

class DocPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            outcomeState: null,
            docNum: 0
        };
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});
    }

    outcomeState = async (e) => {

        let docnum;

        await this.setState({outcomeState: e})

        if (e === 2) {
            // 확인 버튼 눌렀을 시
            await fetch('http://127.0.0.1:8000/api/document?docNum=' + this.props.reqnum[0].toString())
                .then(response => response.json())
                .then(response => {
                        docnum = response[0].docnum
                    }
                )

            await this.props.openModal(false)
            await this.reqSendClick(null)

            await this.props.history.push({
                pathname: '/docpaydetail',
                document: {detailDocNum: docnum},
                listState: {listKind: "대기"}
            })

        } else if (e === 1) {
            // 취소 버튼 누른 후 확인 눌렀을 시
            await fetch("http://127.0.0.1:8000/api/document", {
                method: "DELETE",
            })

            await this.setState({detailDocNum: 0})
            await this.props.openModal(false)
            await this.reqSendClick(null)

            await this.props.history.push({
                pathname: "/docrequest"
            })

        } else if (e === 0) {
            await this.props.openModal(false)
            await this.reqSendClick(null)
        }

    }

    render() {

        let checkState = this.props.checkState
        let modalOpen = this.props.modalOpen
        let items = this.props.items
        let reqnum = this.props.reqnum
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
                        <td>기안자</td>
                        <td>진도준</td>
                    </tr>
                    <tr>
                        <td>결재자</td>
                        <td>진양철</td>
                    </tr>
                    <tr>
                        <td>작성일자</td>
                        <td>{items["wdate"]}</td>
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
                                                }원</td>
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
                        <td>{items["sum"] &&
                            new CommonUtil().numberComma(items["sum"])
                        }원
                        </td>
                    </tr>
                    </tbody>
                </Table>

                {
                    checkState
                        ? <Modal1 open={modalOpen} ment={"결재신청이 완료 되었습니다."}
                                  outcomeState={this.outcomeState}
                                  modalKind={false}></Modal1>
                        : <Modal1 open={modalOpen} ment={"취소 하시겠습니까?"}
                                  outcomeState={this.outcomeState}
                                  modalKind={true}></Modal1>
                }
            </div>
        );
    }
}

export default withRouter(DocPayment);