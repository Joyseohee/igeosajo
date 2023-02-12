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
                    today: date,
                })
            })
    }

    getReqtermList = () => {
        let termyearmonth = new CommonUtil().convertDateToReqtermPk(this.state.today);
        new Api().read("reqterm", null, termyearmonth)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    presentTerm: response[0],
                })
            })
    }


    render() {
        const {presentTerm, today} = this.state;
        const {usernum} = this.props.user;
        const reqboxList = [{index: "box1", type: "reqterm-fix"}, {index: "box2", type: "reqterm-set"}];
        let year = today !== null ? today.getFullYear() : '2023';
        let month = today !== null ? today.getMonth() + 1 : '2';

        return (
            <div className="page-top reqterm-wrapper">
                <Goal comment={`${year}년 ${month}월`} subtitle={`신청기간 설정`}/>
                {reqboxList.map((reqbox) => {
                    return (
                        <Reqbox key={reqbox.index}
                                type={reqbox.type} usernum={usernum}
                                presentTerm={presentTerm}
                                today={today}
                                getReqtermList={this.getReqtermList}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Reqterm;
