import React, {Component} from "react";
import "../styled/etcCss.css"
import "../styled/AdminMain.css"
import Goal from "../components/Goal";
import CheckPeriod from "../components/userMainPage/CheckPeriod";
import SubGoal from "../components/SubGoal";
import ReqCountCard from "../components/adminMainPage/ReqCountCard";
import OrderCountCard from "../components/adminMainPage/OrderCountCard";
import DocCountCard from "../components/adminMainPage/DocCountCard";
import {withRouter} from 'react-router-dom';

let now = new Date();

class AdminMain extends Component {
    constructor(props) {
        super(props);
        let startdate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + "01"
        let day = new Date(now.getFullYear(), (now.getMonth() + 1), 0).getDate()
        let enddate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + day
        let month = now.getMonth() + 1
        if (month < 10) {
            month = "0" + String(month)
        }
        let termyearmonth = String(now.getFullYear()) + month
        this.state = {
            items: [],
            count: [],
            termyearmonth: termyearmonth,
            startdate: startdate,
            enddate: enddate,
            reqcount: 0,
            prevparchase: 0,
            docsubmit: 0,
            reject: 0,
            approval: 0,

        };

    }

    async componentDidMount() {
        const startdate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + "01"
        const day = new Date(now.getFullYear(), (now.getMonth() + 1), 0).getDate()
        const enddate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + day
        let month = now.getMonth() + 1
        if (month < 10) {
            month = "0" + String(month)
        }
        const termyearmonth = String(now.getFullYear()) + month


        Promise.all([
            fetch('http://127.0.0.1:8000/api/main?termyearmonth=' + termyearmonth + '&startdate=' + startdate + '&enddate=' + enddate),
            fetch('http://127.0.0.1:8000/api/reqterm/' + termyearmonth)
        ]).then(([response1, response2]) =>
            Promise.all([response1.json(), response2.json()]))
            .then(([response1, response2]) => {
                this.setState({
                    count: response1,
                    reqcount: response1[0],
                    prevparchase: response1[1],
                    parchase: response1[2],
                    docsubmit: response1[3],
                    reject: response1[4],
                    approval: response1[5],
                    items: response2
                })

            }).catch((error) => console.error(error));

    };

    routerpath = (e, state) => {
        if (state == "/request") {
            this.props.history.push({
                pathname: state,
            })
        } else if (state == "/orderreq" || state == "/order") {
            let orderstate = ""
            if (state == "/orderreq") {
                orderstate = "prevparchase"
            } else if (state == "/order") {
                orderstate = "deliver"
            }
            this.props.history.push({
                pathname: state,
                state: {
                    orderstate: orderstate
                },
            })
        } else if (state == "/docsubmit" || state == "/docreject" || state == "/docapproval") {
            let docstate = ""
            if (state == "/docsubmit") {
                docstate = "대기"
            } else if (state == "/docreject") {
                docstate = "반려"
            } else if (state == "/docapproval") {
                docstate = "승인"
            }
            this.props.history.push({
                pathname: "/docpaylist",
                state: {
                    docstate: docstate
                },
            })
        }

    }

    render() {
        const {reqcount, prevparchase, parchase, docsubmit, reject, approval} = this.state

        return (
            <>
                <Goal comment={now.getFullYear() + "년 " + (now.getMonth() + 1) + "월"}/>
                <CheckPeriod items={this.state.items}/>
                <div className="main-req-order-wrapper">
                    <div className="main-req-wrapper">
                        <SubGoal className={"colDiv"} comment={"당월 사무용품 구매 요청 현황"}/>
                        <ReqCountCard reqcount={reqcount} routerpath={this.routerpath}></ReqCountCard>
                    </div>
                    <div className="main-order-wrapper">
                        <SubGoal comment={"당월 구매 진행 현황"}/>
                        <OrderCountCard prevparchase={prevparchase} parchase={parchase}
                                        routerpath={this.routerpath}></OrderCountCard>
                    </div>
                </div>
                <div>
                    <SubGoal className={"colDiv"} comment={"전자 결재 진행 현황"}/>
                    <DocCountCard docsubmit={docsubmit} reject={reject} approval={approval}
                                  routerpath={this.routerpath}></DocCountCard>
                </div>
            </>
        );
    }
}

export default withRouter(AdminMain);
