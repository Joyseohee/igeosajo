import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Request from "../../img/iconrequest.png";




class ReqCountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allcnt:0,
            parchasecnt: 0,
            prevparchasecnt: 0,
            reqterm: this.props.reqterm
        }
    }

    statechange = (e,state) => {
        this.props.orderdocsearchstate(state);
        console.log(state)
    }
    componentDidMount() {

    }

    render() {
        const {allcnt,prevparchasecnt,parchasecnt} = this.state
        return (
            <div className={"ReqCountCardDiv"}>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.statechange(e,"all")}}>
                                    <Card.Text className=" cardtitletext">요청</Card.Text>
                                        <Container>
                                            <Row >
                                                <Col style={{width:"64px"}} className="cardtext" xs={"8"}>{allcnt}</Col>
                                                <Col xs={"4"}> <img src={Request} alt="logo"/></Col>
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

export default ReqCountCard;