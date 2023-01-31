import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import all from "../../img/allicon.png";
import parchase from "../../img/iconsparchase.png";
import deliver from "../../img/iconsdeliver.png";
import finish from "../../img/iconsfinish.png";
import DateSetting from "../orderProgress/DateSetting";


class OrderReqSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allcnt:0,
            parchasecnt: 0,
            prevparchasecnt: 0,
            startdate: this.props.startdate,
            enddate:this.props.enddate,
        }
        this.statechange = this.statechange.bind(this);
    }

    statechange = (e,state) => {
        this.props.orderdocsearchstate(state);
        console.log(state)
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=allselect&startdate='+this.props.startdate+'&enddate='+this.props.enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({allcnt: data.length})
            })
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=parchase&startdate='+this.props.startdate+'&enddate='+this.props.enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({parchasecnt: data.length})
            })
    }

    render() {
        const {allcnt,prevparchasecnt,parchasecnt} = this.state
        return (
            <div className="containermargin">

                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.statechange(e,"all")}}>
                                    <Card.Text className=" cardtitletext">전체</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">{allcnt}</Col>
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
                                <Card.Body  onClick={(e) => {this.statechange(e,"prevparchase")}}>
                                    <Card.Text className="cardtitletext">구매전</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">{parchasecnt}</Col>
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
                                <Card.Body  onClick={(e) => {this.statechange(e,"parchase")}}>
                                    <Card.Text className="cardtitletext">구매완료</Card.Text>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Col className="cardtext">{parchasecnt}</Col>
                                                <Col> <img src={parchase} alt="logo"/></Col>
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

export default OrderReqSearch;