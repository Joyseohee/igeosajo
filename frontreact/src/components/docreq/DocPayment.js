import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";
import {withRouter} from "react-router-dom";

class DocPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            reqnum: [],
            words: "",
            reqSend: false,
            checkState: null,
            outcomeState: null,
            modalopen: false,
            docNum: 0
        };

        this.printArr = this.printArr.bind(this);
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
            .then(response => this.setState({reqnum: this.state.items["reqnum"]}))
            .then(response => this.printArr())
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

    async componentDidUpdate(prevProps) {
        if (this.props.reqSend) {
            this.changeCheckState(true)
            this.reqSendClick(null)
            this.openState();
            // this.props.reqSend 여거 상태 다시 변경 해줘야 해
        } else if (this.props.reqSend === false) {
            this.changeCheckState(false)
            this.reqSendClick(null)
            this.openState();
        }
    }

    changeCheckState = (e) => {
        this.setState({checkState: e})
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});
    }

    openState = () => {
        this.setState({modalopen: true});
    }

    changeModalState = (e) => {
        this.setState({modalopen: false})
    }

    outcomeState = (e) => {

        this.setState({outcomeState: e})
        this.changeCheckState(null)

        if (e === 2) {
            // 확인 버튼 눌렀을 시

            fetch('http://127.0.0.1:8000/api/document?docNum=' + this.state.reqnum[0].toString())
                .then(response => response.json())
                .then(response => {
                    this.props.history.push({
                        pathname: '/docpaydetail',
                        document: {detailDocNum: response[0].docnum},
                    })
                }
            )

        } else if (e === 1) {
            // 취소 버튼 누른 후 확인 눌렀을 시
            fetch("http://127.0.0.1:8000/api/document", {
                method: "DELETE",
            })

            this.props.history.push({
                pathname: '/docrequest'
            })
        } else {
            // 취소 버튼 누르고 다시 취소 버튼 눌렀을 시
            // this.props.history.push({
            //     pathname: '/docreqdetail'
            // })

            window.location.reload();
        }

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
                        ? <Modal1 open={this.state.modalopen} ment={"결재신청이 완료 되었습니다."}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState}
                                  modalKind={false}></Modal1>
                        : <Modal1 open={this.state.modalopen} ment={"취소 하시겠습니까?"}
                                  changeModalState={this.changeModalState}
                                  outcomeState={this.outcomeState}
                                  modalKind={true}></Modal1>
                }
            </div>
        );
    }
}

export default withRouter(DocPayment);