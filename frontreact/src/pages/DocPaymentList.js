import React, {Component} from 'react';
import DocListKind from "../components/docreq/DocListKind";

import "../styled/DocRequestCss.css"
import DocList from "../components/docreq/DocList";
import Goal from "../components/Goal";

class DocPaymentList extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            listState: "allselect"
        };
    }

    statechange = (e) => {
        console.log(e)
        this.setState({listState: e})
    }

    render() {
        return (
            <>
                <Goal comment={"전자 결재 목록"}/>
                <DocListKind listState={this.state.listState} statechange={this.statechange}/>
                <DocList listState={this.state.listState} statechange={this.statechange}/>
            </>
        );
    }
}

export default DocPaymentList;