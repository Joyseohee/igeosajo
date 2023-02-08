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
            checkState: false
        };
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
                                checkState={this.state.checkState}/>
                            <DocPaymentBtn reqSend={this.state.reqSend} reqSendClick={this.reqSendClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocReqDetail;