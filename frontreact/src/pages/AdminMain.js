import React, {Component} from "react";
import Goal from "../components/Goal";
import CheckPeriod from "../components/userMainPage/CheckPeriod";
// import RequestStatus from "../components/userMainPage/RequestStatus";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styled/etcCss.css"
import SubGoal from "../components/SubGoal";
import ReqCountCard from "../components/adminMainPage/ReqCountCard";
import OrderCountCard from "../components/adminMainPage/OrderCountCard";
import DocCountCard from "../components/adminMainPage/DocCountCard";
import { withRouter } from 'react-router-dom';

let now = new Date();

class AdminMain extends Component {
    constructor(props) {
        super(props);
        let startdate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+"01"
        let day = new Date(now.getFullYear(),(now.getMonth()+1),0).getDate()
        let enddate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+ day
        let month = now.getMonth()+1
        if(month <10)
        {
            month = "0"+String(month)
        }
        let termyearmonth = String(now.getFullYear()) + month
        this.state = {
            items: [],
            count: [],
            termyearmonth: termyearmonth,
            startdate: startdate,
            enddate: enddate,
            reqcount :0,
            prevparchase:0,
            docsubmit:0,
            reject:0,
            approval:0,

        };

    }

    async componentDidMount() {
        const startdate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+"01"
        const day = new Date(now.getFullYear(),(now.getMonth()+1),0).getDate()
        const enddate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+ day
        let month = now.getMonth()+1
        if(month <10)
        {
            month = "0"+String(month)
        }
        const termyearmonth = String(now.getFullYear()) + month

        // 신청기간 조회
        fetch('http://127.0.0.1:8000/api/main?termyearmonth='+termyearmonth + '&startdate='+startdate+'&enddate='+ enddate)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    count: response,
                    reqcount :response[0],
                    prevparchase:response[1],
                    parchase:response[2],
                    docsubmit:response[3],
                    reject:response[4],
                    approval:response[5],
                    })
            })
          // 신청기간 조회
        fetch('http://127.0.0.1:8000/api/reqterm/' + termyearmonth)
            .then(response => response.json())
            .then(response => {

                this.setState({items: response})
            })
    };

    routerpath = (e,state) =>{
        if(state == "/request")
        {
            this.props.history.push({
                pathname : state,
            })
        }
        else if(state == "/orderreq" || state == "/Order")
        {
            let orderstate = ""
            if(state == "/orderreq"){
               orderstate = "prevparchase"
            }else if(state == "/Order"){
                orderstate = "parchase"
            }
            this.props.history.push({
                pathname : state, 
                state: {
                     orderstate:orderstate
                 },
            })
        }
        else if(state == "/docsubmit" || state == "/docreject" || state == "/docapproval")
        {
            let docstate = ""
            if(state == "/docsubmit"){
                docstate = "대기"
            }else if(state == "/docreject"){
                docstate = "반려"
            }else if(state == "/docapproval"){
                docstate = "승인"
            }
            this.props.history.push({
                pathname : "/docpaylist",
                state: {
                     docstate:docstate
                 },
            })
        }

    }

    render() {
        const {reqcount,prevparchase,parchase,docsubmit,reject,approval} = this.state

        return (
            <>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={now.getFullYear() + "년 " + (now.getMonth() + 1) + "월"}/>
                    <CheckPeriod items = {this.state.items}/>
                    <Row style={{marginBottom:"40px",marginTop:"40px"}}>
                        <Col xs={5}>
                            <SubGoal className={"colDiv"} comment={"당월 사무용품 구매 요청 현황"}/>
                            <Row>
                                <ReqCountCard reqcount={reqcount} routerpath={this.routerpath}></ReqCountCard>
                            </Row>
                        </Col>
                        <Col xs={7}>
                            <SubGoal comment={"당월 구매 진행 현황"}/>
                            <Row>
                                <OrderCountCard prevparchase={prevparchase} parchase={parchase} routerpath={this.routerpath}></OrderCountCard>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubGoal className={"colDiv"} comment={"전자 결재 진행 현황"}/>
                        </Col>
                    </Row>
                    <Row>
                        <DocCountCard docsubmit={docsubmit} reject={reject} approval={approval} routerpath={this.routerpath}></DocCountCard>
                    </Row>
                </Container>
            </>
        );
    }
}

export default withRouter(AdminMain);
