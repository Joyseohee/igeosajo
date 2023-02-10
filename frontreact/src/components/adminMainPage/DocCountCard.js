import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DocSubmit from "../../img/icondocsubmit.png";
import DocCancel from "../../img/icondoccancel.png";
import DocApproval from "../../img/icondocapproval.png";
import "../../styled/etcCss.css"

class DocCountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allcnt:0,
            parchasecnt: 0,
            prevparchasecnt: 0,
            reqterm: this.props.reqterm
        }
        this.statechange = this.statechange.bind(this);
    }

    statechange = (e,state) => {
        this.props.orderdocsearchstate(state);
        console.log(state)
    }
    componentDidMount() {
         fetch('http://127.0.0.1:8000/api/order?func=orderreqcount&&termyearmonth=' + this.state.reqterm+'&&state=parchase')
            .then(res => res.json())
            .then(data => {
                    this.setState({allcnt:data[0],prevparchasecnt:data[1],parchasecnt:data[2],})
            })
    }

    render() {
        const {allcnt,prevparchasecnt,parchasecnt} = this.state
        return (
            <div className={"DocCountCardDiv"}>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.statechange(e,"all")}}>
                                    <Card.Text className=" cardtitletext">상신 완료</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}>{allcnt}</Col>
                                                <Col xs={"4"}> <img src={DocSubmit} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="maincardcontainetc">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.statechange(e,"prevparchase")}}>
                                    <Card.Text className="cardtitletext">결재 반려</Card.Text>

                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}>{prevparchasecnt}</Col>
                                                <Col xs={"4"}> <img src={DocCancel} alt="logo"/></Col>
                                            </Row>
                                        </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="maincardcontainetc">
                            <Card style={{width: '95%'}}>
                                <Card.Body  onClick={(e) => {this.statechange(e,"parchase")}}>
                                    <Card.Text className="cardtitletext">결재 완료</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext" xs={"8"}>{parchasecnt}</Col>
                                                <Col xs={"4"}> <img src={DocApproval} alt="logo"/></Col>
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