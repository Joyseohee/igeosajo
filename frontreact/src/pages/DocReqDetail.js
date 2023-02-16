import React, {Component} from 'react';
import Goal from "../components/Goal";
import DocPayment from "../components/docreq/DocPayment";
import DocPaymentBtn from "../components/docreq/DocPaymentBtn";

class DocReqDetail extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            reqSend: null,
            modalOpen: false,
            checkState: false,
            items: [],
            reqnum: [],
            prodnamearr: [],
            countarr:[]
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?state=요청상세')
            .then(response => response.json())
            .then(response => this.setState({items: response}))
            .then(response => this.setState({reqnum: this.state.items["reqnum"]}))
            .then(response => this.printArr())
    };

    printArr = () => {
        let prodnamearr = [];
        let countarr = [];

        for (let i = 0; i < this.state.items["prodname"].length; i++) {
            prodnamearr.push(this.state.items["prodname"][i]);
            countarr.push(this.state.items["prodcount"][i]);
        }
        this.setState({prodnamearr: prodnamearr, countarr:countarr})
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});
        this.setState({checkState: e});

        this.openModal(true);
    }

    openModal = (e) =>{
        if(e){
            this.setState({modalOpen: true});
        }else{
            this.setState({modalOpen: false});
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div className={"commentDiv"}>
                            <Goal comment={"전자 결재 신청"}/>
                            <DocPayment
                                reqSend={this.state.reqSend}
                                reqSendClick={this.reqSendClick}
                                modalOpen={this.state.modalOpen}
                                openModal={this.openModal}
                                checkState={this.state.checkState}
                                items = {this.state.items}
                                reqnum = {this.state.reqnum}
                                prodnamearr={this.state.prodnamearr}
                                countarr={this.state.countarr}
                            />
                            <DocPaymentBtn reqSend={this.state.reqSend} reqSendClick={this.reqSendClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocReqDetail;