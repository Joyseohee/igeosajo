import React, {Component} from "react";
import Reqbox from "../components/reqterm/Reqbox";
import Api from "../api/Api";
import Goal from "../components/Goal";
import CommonUtil from "../util/CommonUtil";

class Reqterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqtermList: null,
            presentTermyearmonth: null,
            createAvailable: false,
            today: null,
        }
    }

    componentDidMount() {
        this.props.setpagename("사무용품 신청 관리");
        let date = new Date();
        let presentTermyearmonth = new CommonUtil().convertDateToReqtermPk(date);
        console.log(presentTermyearmonth);
        new Api().read("reqterm", null, presentTermyearmonth)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                this.setState({
                    reqtermList: response,
                    createAvailable: response.length < 1,
                    presentTermyearmonth: presentTermyearmonth,
                    today: date,
                })
            })
        console.log("됌");
    }

    getReqtermList = () => {
        new Api().read("reqterm", null, this.state.presentTermyearmonth)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    reqtermList: response,
                    createAvailable: false,
                })
            })
    }

    render() {
        const {reqtermList, today, createAvailable, presentTermyearmonth} = this.state;
        const {usernum} = this.props.user;
        const year = presentTermyearmonth && new CommonUtil().convertReqtermPkToYear(presentTermyearmonth);
        const month = presentTermyearmonth && new CommonUtil().convertReqtermPkToMonth(presentTermyearmonth);
        const reqboxList = ["reqterm-fix", "reqterm-set"];
        console.log(createAvailable)
        return (
            <div className="page-top reqterm-wrapper">
                {reqtermList !== null &&
                    <>
                        <Goal comment={`${year}년 ${month}월`} subtitle={`신청기간 설정`}/>
                        {reqboxList.map((reqbox) => {
                            return (
                                <>
                                    <Reqbox key={reqbox} getReqtermList={this.getReqtermList}
                                            type={reqbox} usernum={usernum} reqtermList={reqtermList}
                                            presentTermyearmonth={presentTermyearmonth}
                                            createAvailable={createAvailable}
                                            today={today}/>
                                </>
                            );
                        })}
                        {/*<div>지난 신청 기간</div>*/}
                        {/*<SelectReqterm reqtermList={reqtermList} handleSelect={this.handleSelect}/>*/}
                    </>
                }
            </div>
        );
    }
}

export default Reqterm;
