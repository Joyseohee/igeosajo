import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import all from "../../img/allicon.png";
import parchase from "../../img/iconsparchase.png";
import DocumentIcon from "../../storage/Icon";


class OrderReqSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allcnt: 0,
            parchasecnt: 0,
            prevparchasecnt: 0,
            reqterm: this.props.reqterm
        }
        this.statechange = this.statechange.bind(this);
    }

    statechange = (e, state) => {
        this.props.orderdocsearchstate(state);
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?func=orderreqcount&&termyearmonth=' + this.state.reqterm + '&&state=parchase')
            .then(res => res.json())
            .then(data => {
                this.setState({allcnt: data[0], prevparchasecnt: data[1], parchasecnt: data[2],})
            })
    }

    render() {
        const {allcnt, prevparchasecnt, parchasecnt} = this.state
        let color = ["transparent", "transparent", "transparent"]
        if (this.props.orderreqstate == "all") {
            color[0] = 'rgb(156,252,252)';
            color[1] = 'transparent';
            color[2] = 'transparent';
        } else if (this.props.orderreqstate == "prevparchase") {
            color[1] = "rgb(156,252,252)";
            color[0] = 'transparent';
            color[2] = 'transparent';
        } else if (this.props.orderreqstate === "parchase") {
            color[2] = "rgb(156,252,252)";
            color[0] = 'transparent';
            color[1] = 'transparent';
        }

        return (
            <div>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="cardcontain">
                            <Card className="order-card" style={{width: '95%', backgroundColor: color[0]}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange(e, "all")
                                }}>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>
                                    <Container>
                                        <Row>
                                            <Col className="cardtext"><span>{allcnt}</span><span>{" "}</span><span
                                                style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                            <Col className="cardicon">
                                                <div className="order-search-box-icon">
                                                    <DocumentIcon reqstate="전체"/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card className="order-card" style={{width: '95%', backgroundColor: color[1]}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange(e, "prevparchase")
                                }}>
                                    <Card.Text className="cardtitletext">구매대기</Card.Text>

                                    <Container>
                                        <Row>
                                            <Col
                                                className="cardtext"><span>{prevparchasecnt}</span><span>{" "}</span><span
                                                style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                            <Col className="cardicon">
                                                <div className="order-search-box-icon">
                                                    <DocumentIcon/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="cardcontain">
                            <Card className="order-card" style={{width: '95%', backgroundColor: color[2]}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange(e, "parchase")
                                }}>
                                    <Card.Text className="cardtitletext">구매완료</Card.Text>
                                    <Container>
                                        <Row>
                                            <Col className="cardtext"><span>{parchasecnt}</span><span>{" "}</span><span
                                                style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                            <Col className="cardicon">
                                                <div className="order-search-box-icon">
                                                    <DocumentIcon reqstate="구매완료"/>
                                                </div>
                                            </Col>
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

export default OrderReqSearch;