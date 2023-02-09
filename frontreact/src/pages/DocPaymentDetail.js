import React, {Component} from 'react';
import Goal from "../components/Goal";
import DocPaymentTable from "../components/docreq/DocPaymentTable";
import DocPaymentDetailBtn from "../components/docreq/DocPaymentDetailBtn";

class DocPaymentDetail extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            reqSend: false,
            modalOpen: false
        };
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});

        this.openModal(e);
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
                            <Goal comment={"결재 문서"}/>
                            <DocPaymentTable
                                reqSend={this.state.reqSend}
                                reqSendClick={this.reqSendClick}
                                modalOpen={this.state.modalOpen}
                                openModal={this.openModal}/>
                            <DocPaymentDetailBtn reqSend={this.state.reqSend} reqSendClick={this.reqSendClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocPaymentDetail;