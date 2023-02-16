import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Deliver from "../../img/iconsdeliver.png";
import Parchase from "../../img/iconsparchase.png";



class OrderCountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    componentDidMount() {

    }

    render() {
        let prevparchase = this.props.prevparchase
        let parchase = this.props.parchase

        return (
            <div>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.props.routerpath(e,"/orderreq")}}>
                                    <Card.Text className=" cardtitletext">구매 대기</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}><span>{prevparchase}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col xs={"4"}> <img src={Parchase} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="maincardcontainetc">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.props.routerpath(e,"/order")}}>
                                    <Card.Text className="cardtitletext">배송 완료</Card.Text>

                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}><span>{parchase}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span> </Col>
                                                <Col xs={"4"}> <img src={Deliver} alt="logo"/></Col>
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

export default OrderCountCard;