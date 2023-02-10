import React, {Component} from "react";
import Reqbox from "../components/reqterm/Reqbox";
import Api from "../api/Api";
import Goal from "../components/Goal";
import CommonUtil from "../util/CommonUtil";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentTerm: null,
            createAvailable: false,
            today: null,
        }
    }

    componentDidMount() {
        this.props.setpagename("사무용품 신청 관리");
        let date = new Date();
        let presentTermyearmonth = new CommonUtil().convertDateToReqtermPk(date);
        new Api().read("reqterm", null, presentTermyearmonth)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    presentTerm: response[0],
                    createAvailable: response.length < 1,
                    today: date,
                })
            })
        console.log("mount");
    }

    getReqtermList = () => {
        new Api().read("reqterm", null, this.state.presentTerm.termyearmonth)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    presentTerm: response,
                    createAvailable: false,
                })
            })
    }

    render() {
        const {presentTerm, createAvailable, today} = this.state;
        const {usernum} = this.props.user;
        console.log(presentTerm.termyearmonth);
        // const year = presentTerm !== null && new CommonUtil().convertReqtermPkToYear(presentTerm.termyearmonth);
        // const month = presentTerm && new CommonUtil().convertReqtermPkToMonth(presentTerm.termyearmonth);

        const reqboxList = ["reqterm-fix", "reqterm-set"];
        console.log(createAvailable)
        return (
            <div className="page-top reqterm-wrapper">
                <>
                    {/*<Goal comment={`${year}년 ${month}월`} subtitle={`신청기간 설정`}/>*/}
                    {/*{reqboxList.map((reqbox) => {*/}
                    {/*    return (*/}
                    {/*        <>*/}
                    {/*            <Reqbox key={reqbox} getReqtermList={this.getReqtermList}*/}
                    {/*                    type={reqbox} usernum={usernum} presentTerm={presentTerm}*/}
                    {/*                    createAvailable={createAvailable}*/}
                    {/*                    today={today}/>*/}
                    {/*        </>*/}
                    {/*    );*/}
                    {/*})}*/}
                    {/*<div>지난 신청 기간</div>*/}
                    {/*<SelectReqterm reqtermList={reqtermList} handleSelect={this.handleSelect}/>*/}
                </>
            </div>
        );
    }
}

export default Reqterm;
