import React, {Component} from 'react';

import Goal from "../components/Goal";
import RequestSendButton from "../components/docreq/RequestSendButton";
import RequestTable from "../components/docreq/RequestTable";

import "../styled/DocRequestCss.css"

class DocRequest extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            reqSend: false,
            modalOpen: false,
            items: []
        };
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/request?reqstaging=처리전&reqstate=승인')
            .then(response => response.json())
            .then(response => this.setState({items: response}))
    };

    reqSendClick = (fromChild) => {

        this.setState({reqSend: fromChild});

        this.openModal(fromChild);
    }

    openModal = (fromChild) =>{
        if(fromChild){
            this.setState({modalOpen: true});
        }else{
            this.setState({modalOpen: false});
        }
    }

    render() {

        return (
            <div>
                <div className={"sidebarDisplay"}>
                    <div className={"writeRequest"}>
                        <div className={"commentDiv"}>
                            <Goal comment={"전자 결재 작성"}/>

                            <span><RequestSendButton reqSend={this.state.reqSend}
                                                     reqSendClick={this.reqSendClick}
                                                     btnMent={"전자 결재 작성"}/></span>
                        </div>
                        <RequestTable
                            reqSend={this.state.reqSend}
                            reqSendClick={this.reqSendClick}
                            modalOpen={this.state.modalOpen}
                            openModal={this.openModal}
                            items = {this.state.items}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocRequest;