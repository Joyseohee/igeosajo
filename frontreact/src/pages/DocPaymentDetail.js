import React, {Component} from 'react';
import Goal from "../components/Goal";
import DocPaymentTable from "../components/docreq/DocPaymentTable";
import DocPaymentDetailBtn from "../components/docreq/DocPaymentDetailBtn";
import {withRouter} from "react-router-dom";

class DocPaymentDetail extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재 목록");
        this.state = {
            items: [],
            reqSend: false,
            modalOpen: false,
            prodnamearr: [],
            countarr: []
        };
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세&docDetail=' + this.props.location.document.detailDocNum)
            .then(response => response.json())
            .then(response => this.setState({items: response}))
            .then(response => this.printArr())
    };

    printArr = () => {
        let prodnamearr = [];
        let countarr = [];

        for (let i = 0; i < this.state.items["prodname"].length; i++) {
            prodnamearr.push(this.state.items["prodname"][i]);
            countarr.push(this.state.items["prodcount"][i]);
        }
        this.setState({prodnamearr: prodnamearr, countarr: countarr})
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});

        this.openModal(e);
    }

    openModal = (e) => {
        if (e) {
            this.setState({modalOpen: true});
        } else {
            this.setState({modalOpen: false});
        }
    }

    showBtn = () => {
        try {
            let listState = this.props.location.listState.listKind;

            if (listState === "allselect") {
                listState = this.state.items["docstate"]

            }
            return (
                <DocPaymentDetailBtn
                    reqSend={this.state.reqSend}
                    reqSendClick={this.reqSendClick}
                    listState={listState}
                />
            )
        } catch (e) {
            return (
                <DocPaymentDetailBtn
                    reqSend={this.state.reqSend}
                    reqSendClick={this.reqSendClick}
                />
            )
        }

    }


    render() {

        return (
                <div className={"commentDiv"}>
                    <Goal comment={"결재 문서"}/>
                    <DocPaymentTable
                        items={this.state.items}
                        reqSend={this.state.reqSend}
                        reqSendClick={this.reqSendClick}
                        modalOpen={this.state.modalOpen}
                        openModal={this.openModal}
                        prodnamearr={this.state.prodnamearr}
                        countarr={this.state.countarr}/>

                    {this.showBtn()}
                </div>
        );
    }
}

export default withRouter(DocPaymentDetail);