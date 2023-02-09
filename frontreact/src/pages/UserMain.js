import React, {Component} from "react";
import Goal from "../components/Goal";
import CheckPeriod from "../components/userMainPage/CheckPeriod";
import RequestStatus from "../components/userMainPage/RequestStatus";

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

        if ( String(now.getMonth() + 1).length === 1){
            console.log("0" + String(now.getMonth() + 1))
            nowdate = String(now.getFullYear()) + "0" + String(now.getMonth() + 1);
        }else {
            nowdate = String(now.getFullYear()) + String(now.getMonth() + 1);
        }

        // 신청기간 조회
        fetch('http://127.0.0.1:8000/api/reqterm/' + nowdate)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({items: response})
            })

        // 신청 내역 건수
        fetch('http://127.0.0.1:8000/api/request?usernum=' + this.props.user.usernum.toString())
            .then(response => response.json())
            .then(response => {
                this.setState({reqCount: response.length})
            })

        // 장바구니 건수
        fetch('http://127.0.0.1:8000/api/cart?usernum=' + this.props.user.usernum.toString())
            .then(response => response.json())
            .then(response => {
                this.setState({reqBasket: response.length})
            })

    };

    render() {
        return (
            <>
                <Goal comment={now.getFullYear() + "년 " + (now.getMonth() + 1) + "월"}/>
                <CheckPeriod items = {this.state.items}/>
                <Goal comment={"신청 상태"}/>
                <RequestStatus
                    reqCount = {this.state.reqCount}
                    reqBasket = {this.state.reqBasket}/>
            </>
        );
    }
}

export default UserMain;
