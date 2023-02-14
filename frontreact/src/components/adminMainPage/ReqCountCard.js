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
        }
    }


    componentDidMount() {

    }

    render() {
        let reqcount = this.props.reqcount

        return (
            <div className={"ReqCountCardDiv"}>
                <Row style={{width: '100%'}}>
                    <Col>
                        <div className="maincardcontainfirst">
                            <Card style={{width: '95%'}}>
                                <Card.Body   onClick={(e) => {this.props.routerpath(e,"/request")}}>
                                    <Card.Text className=" cardtitletext">요청</Card.Text>
                                        <Container>
                                            <Row >
                                                <Col style={{height:"64px"}} className="cardtext" xs={"8"}><span>{reqcount}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
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