import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import all from "../../img/allicon.png";
import parchase from "../../img/iconsparchase.png";
import deliver from "../../img/iconsdeliver.png";
import finish from "../../img/iconsfinish.png";
import DateSetting from "./DateSetting";


class OrderSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }
    
    statechange = (e,state) => {
        this.props.orderstate(state);
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {

    }

    render() {

        const ordercnt = this.props.ordercnt
        return (
            <div className="containermargin">

                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.statechange(e,"allselect")}}>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>

                                        <Container>
                                            <Row>
                                                {/*<Col className="cardtext">{allcnt}</Col>*/}
                                                 <Col className="cardtext"><span>{ordercnt[0]}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col> <img src={all} alt="logo"/></Col>
                                            </Row>
                                        </Container>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.statechange(e,"parchase")}}>
                                    <Card.Text className="cardtitletext">구매완료</Card.Text>

                                        <Container>
                                            <Row>
                                               <Col className="cardtext"><span>{ordercnt[1]}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col> <img src={parchase} alt="logo"/></Col>
                                            </Row>
                                        </Container>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.statechange(e,"deliver")}}>
                                    <Card.Text className="cardtitletext">배송완료</Card.Text>

                                        <Container>
                                            <Row>
                                                <Col className="cardtext"><span>{ordercnt[2]}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col> <img src={deliver} alt="logo"/></Col>
                                            </Row>
                                        </Container>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.statechange(e,"finish")}}>
                                    <Card.Text className="cardtitletext">불출완료</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext"><span>{ordercnt[3]}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col> <img src={finish} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default OrderSearch;