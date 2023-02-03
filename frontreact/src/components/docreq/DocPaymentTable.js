import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";

class DocPaymentTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            preAddr: "",
            reqnum: [],
            words: "",
            reqSend: false
        };

        this.printArr = this.printArr.bind(this);
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
            .then(response => this.setState({reqnum: this.state.items["reqnum"]}))
            .then(response => this.printArr())

        this.setState({preAddr: document.referrer})
    };

    printArr() {
        let word = "";

        for (let i = 0; i < this.state.items["prodname"].length; i++) {
            word += i + 1 + ". "
            word += this.state.items["prodname"][i];
            word += " -> " + this.state.items["prodcount"][i] + "개 \n";
        }

        this.setState({words: word})
    }

    render() {

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
                        <td>기안자</td>
                        <td>성은 기 이름은 안자 이름하여 기안자</td>
                    </tr>
                    <tr>
                        <td>결재자</td>
                        <td>김해 결씨 재자 돌림으로 재자 이름하여 결재자</td>
                    </tr>
                    <tr>
                        <td>작성일자</td>
                        <td>{this.state.items["wdate"]}</td>
                    </tr>

                    <tr>
                        <td>상품명</td>
                        <td>{this.state.words}</td>
                    </tr>
                    <tr>
                        <td>금액 총합</td>
                        <td>{this.state.items["sum"]}원</td>
                    </tr>
                    </tbody>
                </Table>

                {
                    this.state.checkState
                        ? <Modal1 open={this.state.modalopen} ment={"취소 하시겠습니까?"}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState}
                                  modalKind={false}></Modal1>
                        : <span></span>
                }
            </div>
        );
    }
}

export default DocPaymentTable;