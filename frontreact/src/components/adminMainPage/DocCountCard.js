import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DocSubmit from "../../img/icondocsubmit.png";
import DocCancel from "../../img/icondoccancel.png";
import DocApproval from "../../img/icondocapproval.png";
import "../../styled/etcCss.css"
import DocumentIcon from "../../storage/Icon";

class DocCountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
    }

    render() {
        let docsubmit = this.props.docsubmit
        let reject = this.props.reject
        let approval = this.props.approval
        return (
            <div className={"DocCountCardDiv"}>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card className="main-card" style={{width: '100%', height:'150px'}}>
                                <Card.Body   onClick={(e) => {this.props.routerpath(e,"/docsubmit")}}>
                                    <Card.Text className=" cardtitletext">상신 완료</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}><span>{docsubmit}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col xs={"4"}><DocumentIcon reqstate="대기" size={50}/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="maincardcontainetc">
                            <Card className="main-card" style={{width: '100%', height:'150px'}}>
                                <Card.Body  onClick={(e) => {this.props.routerpath(e,"/docreject")}}>
                                    <Card.Text className="cardtitletext">결재 반려</Card.Text>

                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}><span>{reject}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col xs={"4"}><DocumentIcon reqstate="반려" size={50}/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="maincardcontainetc">
                            <Card className="main-card" style={{width: '100%', height:'150px'}}>
                                <Card.Body  onClick={(e) => {this.props.routerpath(e,"/docapproval")}}>
                                    <Card.Text className="cardtitletext">결재 완료</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}><span>{approval}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col xs={"4"}><DocumentIcon reqstate="승인" size={50}/></Col>
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

export default DocCountCard;