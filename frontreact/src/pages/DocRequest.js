import React, {Component} from 'react';

import Goal from "../components/Goal";
import RequestSendButton from "../components/docreq/requestSendButton";
import RequestTable from "../components/docreq/requestTable";

import "../styled/DocRequestCss.css"

class DocRequest extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            reqSend: false
        };
    }

    reqSendClick = (fromChild) => {
        console.log(fromChild, "DocRequest");

        this.setState({reqSend: fromChild});
    }

    async componentDidUpdate() {

        // window.location.reload();

        // 아싸리 새로고침을 할까?
    }

    render() {

        return (
            <div>
                    <div className={"sidebarDisplay"}>
                        <div className={"writeRequest"}>
                            <div className={"commentDiv"}>
                                <Goal comment={"전자 결재 작성"}/>

                                <span><RequestSendButton reqSend={this.state.reqSend}
                                                         reqSendClick={this.reqSendClick}/></span>
                            </div>
                            <RequestTable reqSend={this.state.reqSend} reqSendClick={this.reqSendClick}/>
                        </div>
                    </div>
            </div>
        );
    }
}

export default DocRequest;