import React, {Component} from 'react';

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import Goal from "../components/Goal";
import RequestSendButton from "../components/requestSendButton";
import RequestTable from "../components/requestTable";

import "../styled/DocRequestCss.css"

class DocRequest extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={"sidebarDisplay"}>
                    <Sidebar/>
                    <div className={"writeRequest"}>
                        <div className={"commentDiv"}>
                            <Goal comment={"전자 결재 작성"}/>
                            <span><RequestSendButton/></span>
                        </div>
                        <RequestTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocRequest;