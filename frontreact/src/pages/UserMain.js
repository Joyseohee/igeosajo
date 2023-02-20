import React, {Component} from "react";
import Goal from "../components/Goal";
import CheckPeriod from "../components/userMainPage/CheckPeriod";
import RequestStatus from "../components/userMainPage/RequestStatus";
import "../styled/UserMain.css";

let now = new Date();

class UserMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            reqCount: 0,
            reqBasket: 0
        };
    }

    async componentDidMount() {
        let nowdate;

        if (String(now.getMonth() + 1).length === 1) {
            nowdate = String(now.getFullYear()) + "0" + String(now.getMonth() + 1);
        } else {
            nowdate = String(now.getFullYear()) + String(now.getMonth() + 1);
        }

        // 신청기간 조회
        // 신청 내역 건수
        // 장바구니 건수
        await Promise.all([
            fetch('http://127.0.0.1:8000/api/reqterm/' + nowdate),
            fetch('http://127.0.0.1:8000/api/request?usernum=' + this.props.user.usernum.toString() + '&termyearmonth=' + nowdate),
            fetch('http://127.0.0.1:8000/api/cart?usernum=' + this.props.user.usernum.toString())
        ])
            .then(([response1, response2, response3]) =>
                Promise.all([response1.json(), response2.json(), response3.json()]))
            .then(([response1, response2, response3]) => {
                    this.setState({
                        items: response1,
                        reqCount: response2.length,
                        reqBasket: response3.length
                    })

                }
            ).catch((error) => console.error(error));
    };

    render() {
        return (
            <>
                <Goal comment={now.getFullYear() + "년 " + (now.getMonth() + 1) + "월"}/>
                <CheckPeriod items={this.state.items}/>
                <Goal comment={"신청 상태"}/>
                <RequestStatus
                    reqCount={this.state.reqCount}
                    reqBasket={this.state.reqBasket}/>
            </>
        );
    }
}

export default UserMain;
