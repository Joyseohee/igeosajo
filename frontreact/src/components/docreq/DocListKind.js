import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DocumentIcon from "../../storage/Icon";

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
                <Row style={{width: '100%', marginTop: '3rem', marginLeft: '0'}}>
                    <Col className="doc-card-col">
                        <div className="cardcontain">
                            <Card className="doc-filter-wrapper" style={{
                                width: '100%',
                                backgroundColor: listState === "allselect" ? "#FAFBFF" : "rgb(224, 224, 224)"
                            }}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("allselect")
                                }}>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{allcnt}
                                            <span>{" "}</span>
                                            <span style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                        <Col className="cardicon">
                                            <div className="order-search-box-icon">
                                                <DocumentIcon reqstate="전체"/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                     <Col className="doc-card-col">
                        <div className="cardcontain">
                            <Card className="doc-filter-wrapper" style={{
                                width: '100%',
                                backgroundColor: listState === "대기" ? "#FAFBFF" : "rgb(224, 224, 224)"
                            }}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("대기")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[2]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{waitcnt}
                                            <span>{" "}</span>
                                            <span style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                        <Col className="cardicon">
                                            <div className="order-search-box-icon">
                                                <DocumentIcon/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                     <Col className="doc-card-col">
                        <div className="cardcontain">
                            <Card className="doc-filter-wrapper" style={{
                                width: '100%',
                                backgroundColor: listState === "승인" ? "#FAFBFF" : "rgb(224, 224, 224)"
                            }}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("승인")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[0]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{approvalcnt}
                                            <span>{" "}</span>
                                            <span style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                        <Col className="cardicon">
                                            <div className="order-search-box-icon">
                                                <DocumentIcon reqstate="승인"/>
                                            </div>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                     <Col className="doc-card-col">
                        <div className="cardcontain">
                            <Card className="doc-filter-wrapper" style={{
                                width: '100%',
                                backgroundColor: listState === "반려" ? "#FAFBFF" : "rgb(224, 224, 224)"
                            }}>
                                <Card.Body onClick={(e) => {
                                    this.statechange("반려")
                                }}>
                                    <Card.Text className="cardtitletext">{this.props.cardMent[1]}</Card.Text>
                                    <Row>
                                        <Col className="cardtext">{rejectcnt}
                                            <span>{" "}</span>
                                            <span style={{fontSize: "17px", fontWeight: "bold"}}>건</span></Col>
                                        <Col className="cardicon">
                                            <div className="order-search-box-icon">
                                                <DocumentIcon reqstate="반려"/>
                                            </div>
                                        </Col>
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