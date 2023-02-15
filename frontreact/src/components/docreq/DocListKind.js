import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import all from "../../img/allicon.png";
import parchase from "../../img/iconsparchase.png";
import deliver from "../../img/iconsdeliver.png";
import finish from "../../img/iconsfinish.png";

class DocListKind extends Component {

    constructor(props) {
        super(props);
    }

    statechange = (e) => {
        this.props.statechange(e);
    }

    render() {
        const {allcnt, approvalcnt, rejectcnt, waitcnt} = this.props
        let listState = this.props.listState;
        return (
            <div className="containermargin">

                <Row style={{width: '100%', marginTop:'3rem'}}>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%', backgroundColor : listState ==="allselect" ? "rgb(224, 224, 224)" : "#FAFBFF"}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("allselect")
                                }}>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{allcnt}</Col>
                                        <Col> <img src={all} alt="logo"/></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%', backgroundColor : listState ==="승인" ? "rgb(224, 224, 224)" : "#FAFBFF"}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("승인")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[0]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{approvalcnt}</Col>
                                        <Col> <img src={parchase} alt="logo"/></Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%', backgroundColor : listState ==="반려" ? "rgb(224, 224, 224)" : "#FAFBFF"}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("반려")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[1]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{rejectcnt}</Col>
                                        <Col> <img src={deliver} alt="logo"/></Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%', backgroundColor : listState ==="대기" ? "rgb(224, 224, 224)" : "#FAFBFF"}}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("대기")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[2]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{waitcnt}</Col>
                                        <Col> <img src={finish} alt="logo"/></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default DocListKind;