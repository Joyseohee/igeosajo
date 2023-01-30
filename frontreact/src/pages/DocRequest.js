import React, {Component} from 'react';

import Layouts from "../components/layout/Layouts";

import Goal from "../components/Goal";
import RequestSendButton from "../components/requestSendButton";
import RequestTable from "../components/requestTable";

import "../styled/DocRequestCss.css"
// import Modal1 from "../components/layout/modal1";

class DocRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reqSend: false,
            pagename: "전재 결재",
            usernum: "2"
        };
    }

    reqSendClick = (fromChild) => {
        console.log(fromChild, "parent");

        this.setState({reqSend: fromChild});
    }

    render() {

        const {pagename, usernum} = this.state;

        return (
            <div>
                <Layouts pagename={pagename} usernum={usernum}>

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
                </Layouts>
            </div>
        );
    }
}

export default DocRequest;