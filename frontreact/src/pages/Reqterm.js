import React, {Component} from "react";
import Reqbox from "../components/reqterm/Reqbox";
import Api from "../api/Api";
import Goal from "../components/Goal";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termlist: [],
        }
        this.setBasicReqterm = this.setBasicReqterm.bind(this);
    }

    async componentDidMount() {
        this.props.setpagename("사무용품 신청 관리");
        this.setBasicReqterm();
    }

    async setBasicReqterm() {
        let date = new Date()
        const response = await new Api().read("reqterm", null, null);
        const data = await response.json();
        await this.setState({
            termlist: data,
        })
    }

    render() {
        const termlist = this.state.termlist;
        return (
            <div className="page-top reqterm-wrapper">
                <Goal comment={"신청기간 설정"} />
                <Reqbox type="reqterm-fix" usernum={this.props.usernum} termlist={termlist}/>
                <Reqbox type="reqterm-set" usernum={this.props.usernum} termlist={termlist}/>
                <Reqbox type="reqterm-list" usernum={this.props.usernum} termlist={termlist}/>
            </div>
        );
    }
}

export default Reqterm;
