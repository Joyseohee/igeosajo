import React, {Component} from "react";
import Layouts from "../components/layout/Layouts";
import Requestmain from "../components/reqterm/Requestmain";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernum: "2",
            pagename: "신청 기간 페이지",
        };
    }

    render() {
        const {pagename, usernum} = this.state;
        return (
            <div className="page-top">
                <Layouts pagename={pagename} usernum={usernum}><Requestmain /></Layouts>
            </div>
        );
    }
}

export default Reqterm;
