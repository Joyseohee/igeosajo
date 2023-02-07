import React, {Component} from 'react';
import DocListKind from "../components/docreq/DocListKind";
import DocListSearch from "../components/docreq/DocListSearch";

import "../styled/DocRequestCss.css"
import DocList from "../components/docreq/DocList";

class Pagination extends Component {

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
                <div className={"docPaymentDiv listSearchDiv"}>
                    <DocListSearch/>
                </div>
                <DocListKind listState={this.state.listState} statechange={this.statechange}/>
                <DocList listState={this.state.listState} statechange={this.statechange}/>
            </>
        );
    }
}

export default Pagination;