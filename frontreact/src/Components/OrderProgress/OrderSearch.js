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
            posts: []
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        console.log("구매완료")
        this.props.changetext("구매완료");
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));
    }

    render() {
        return (
            <div className="containermargin">

                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">0</Col>
                                                <Col> <img src={all} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body onClick={this.handleButtonClick}>
                                    <Card.Text className="cardtitletext">구매완료</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">0</Col>
                                                <Col> <img src={parchase} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body>
                                    <Card.Text className="cardtitletext">배송완료</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">0</Col>
                                                <Col> <img src={deliver} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body>
                                    <Card.Text className="cardtitletext">불출완료</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">0</Col>
                                                <Col> <img src={finish} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                    </Card.Text>
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