import React, {Component} from 'react';
import RequestTable from "../components/requestTable";
import RequestSendButton from "../components/requestSendButton";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import DocRequestCss from "../styled/DocRequestCss.css"

class DocRequest extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={"sidebarDisplay"}>
                    <Sidebar/>
                    <div>
                        <RequestSendButton/>
                        <RequestTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocRequest;