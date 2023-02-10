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
let now = new Date();


class AdminMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            reqCount: 0,
            reqBasket: 0
        };
    }

    async componentDidMount() {

        let nowdate

        // 신청기간 조회
        fetch('http://127.0.0.1:8000/api/reqterm/202303')
            .then(response => response.json())
            .then(response => {
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
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={now.getFullYear() + "년 " + (now.getMonth() + 1) + "월"}/>
                    <CheckPeriod items = {this.state.items}/>
                    <Row style={{marginBottom:"40px",marginTop:"40px"}}>
                        <Col xs={5}>
                            <SubGoal className={"colDiv"} comment={"사무용품 구매 요청 현황"}/>
                            <Row>
                                <ReqCountCard></ReqCountCard>
                            </Row>
                        </Col>
                        <Col xs={7}>
                            <SubGoal comment={"구매 진행 현황"}/>
                            <Row>
                                <OrderCountCard></OrderCountCard>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubGoal className={"colDiv"} comment={"전자 결재 진행 현황"}/>
                        </Col>
                    </Row>
                    <Row>
                        <DocCountCard></DocCountCard>
                    </Row>
                </Container>
            </>
        );
    }
}

export default AdminMain;
