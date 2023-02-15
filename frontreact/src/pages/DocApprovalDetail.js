import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Goal from "../components/Goal";
import DocApproTable from "../components/DocApRe/DocApproTable";
import DocApproBtn from "../components/DocApRe/DocApproBtn";

class DocApprovalDetail extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            items: [],
            reqSend: false,
            reject: false,
            modalOpen: false,
            prodnamearr: [],
            countarr:[]
        };
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세&docDetail=' + this.props.location.document.detailDocNum.toString())
            .then(response => response.json())
            .then(response =>
                this.setState({items: response})
            )
            .then(response => this.printArr())
    };

    printArr = () => {
        let word = "";
        let prodnamearr = [];
        let countarr = [];

        for (let i = 0; i < this.state.items["prodname"].length; i++) {
            prodnamearr.push(this.state.items["prodname"][i]);
            countarr.push(this.state.items["prodcount"][i]);
        }
        this.setState({prodnamearr: prodnamearr, countarr:countarr})
    }

    reqSendClick = (reqSend, reject) => {
        this.setState({reqSend: reqSend});
        this.setState({reject: reject})
        this.openModal(reqSend, reject);
    }

    openModal = (reqSend, reject) => {
        if (reject && reqSend) {
            this.setState({modalOpen: true});

        } else if (!reject && reqSend) {
            this.setState({modalOpen: true});

        } else this.setState({modalOpen: false});
    }

    showBtn = () => {

        let listState = this.props.location.listState.listKind;

        return (
            <DocApproBtn
                reqSend={this.state.reqSend}
                reqSendClick={this.reqSendClick}
                reject={this.state.reject}
                rejectChange={this.rejectChange}
                listState={listState}/>
        )
    }

    render() {

        return (
            <div>
                <div>
                    <div>
                        <div className={"commentDiv"}>
                            <Goal comment={"결재 문서"}/>
                            <DocApproTable
                                reqSend={this.state.reqSend}
                                reqSendClick={this.reqSendClick}

                                reject={this.state.reject}

                                modalOpen={this.state.modalOpen}
                                openModal={this.openModal}

                                items={this.state.items}
                                words={this.state.words}
                                docnum={this.props.location.document.detailDocNum}
                                prodnamearr={this.state.prodnamearr}
                                countarr={this.state.countarr}
                            />

                            {this.showBtn()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DocApprovalDetail);