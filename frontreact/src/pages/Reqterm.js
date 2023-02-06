import React, {Component} from "react";
import Reqbox from "../components/reqterm/Reqbox";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("신청 기간 설정");
    }

    render() {
        return (
            <div className="page-top reqterm-wrapper">
                <div className="reqterm-title">타이틀</div>
                <Reqbox type="reqterm-fix" usernum={this.props.usernum}/>
                <Reqbox type="reqterm-set" usernum={this.props.usernum}/>
            </div>
        );
    }
}

export default Reqterm;
