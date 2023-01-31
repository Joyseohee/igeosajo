import React, {Component} from "react";
import Reqbox from "../components/reqterm/Reqbox";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("사무용품 신청 관리");
    }

    render() {
        return (
            <div className="page-top">
                <div className="reqterm-wrapper">
                    <div>타이틀</div>
                    <Reqbox type="reqterm-fix"/>
                    <Reqbox type="reqterm-set"/>
                </div>
                <div></div>
            </div>
        );
    }
}

export default Reqterm;
