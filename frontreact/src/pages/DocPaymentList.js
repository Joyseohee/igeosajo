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
            listState: "",
            doclist: []
        };
    }

    statechange = (e) => {
        console.log(e)

        this.setState({listState: e})

        if (e === "allselect") {
            fetch('http://127.0.0.1:8000/api/document?checkDetail=1')
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })

        } else {
            fetch('http://127.0.0.1:8000/api/document?state=' + e + '&checkDetail=1')
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })
        }

    }


    render() {
        return (
            <>
                <Goal comment={"전자 결재 목록"}/>
                <DocListKind listState={this.state.listState} statechange={this.statechange}/>
                <DocList doclist={this.state.doclist} statechange={this.statechange}/>
            </>
        );
    }
}

export default DocPaymentList;