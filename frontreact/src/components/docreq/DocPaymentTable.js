import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";

class DocPaymentTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            words: ""
        };
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세&docDetail=' + this.props.location.document.detailDocNum)
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
            .then(response => this.printArr())
    };

    printArr = () => {

        let word = "";

        for (let i = 0; i < this.state.items["prodname"].length; i++) {
            word += i + 1 + ". "
            word += this.state.items["prodname"][i];
            word += " -> " + this.state.items["prodcount"][i] + "개 \n";
        }

        this.setState({words: word})
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    outcomeState = (e) => {
        if (e === 1) {

            fetch("http://127.0.0.1:8000/api/document?docDetail=" + this.props.location.document.detailDocNum.toString(), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reqnum: this.state.items.reqnum
                }),
            }).then(
                // this.props.history.push({
                //     pathname: "/docpaylist"
                // })
                document.location.assign("http://localhost:3000/docpaylist")
            )
        }

        this.reqSendClick(false)
        this.props.openModal(false)
    }

    render() {
        let modalOpen = this.props.modalOpen


        let {isLoaded} = this.state;
        if (!isLoaded) {
            return (<div>Loading...</div>);
        }

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
                        <td>{this.state.items["wdate"]}</td>
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
                        <td>{this.state.words}</td>
                    </tr>
                    <tr>
                        <td>금액 총합</td>
                        <td>{this.state.items["sum"]}원</td>
                    </tr>
                    <tr>
                        <td>진행 현황</td>
                        <td>{this.state.items["docstate"]}</td>
                    </tr>
                    <tr>
                        <td>반려이유</td>
                        {
                            this.state.items["rejectreason"] === "None"
                                ? (<td></td>)
                                : (<td>{this.state.items["rejectreason"]}</td>)
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