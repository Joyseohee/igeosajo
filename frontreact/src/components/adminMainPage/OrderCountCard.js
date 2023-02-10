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
            <div>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.statechange(e,"all")}}>
                                    <Card.Text className=" cardtitletext">구매대기</Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">{allcnt}</Col>
                                                <Col> <img src={Parchase} alt="logo"/></Col>
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
                                    <Card.Text className="cardtitletext">배송 완료</Card.Text>

                                        <Container>
                                            <Row>
                                                <Col className="cardtext">{prevparchasecnt}</Col>
                                                <Col> <img src={Deliver} alt="logo"/></Col>
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