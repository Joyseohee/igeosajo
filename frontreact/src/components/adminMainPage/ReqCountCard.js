import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DocumentIcon from "../../storage/Icon";




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
                            <Card className="main-card" style={{width: '100%', height:'150px'}}>
                                <Card.Body   onClick={(e) => {this.props.routerpath(e,"/request")}}>
                                    <Card.Text className=" cardtitletext">요청</Card.Text>
                                        <Container>
                                            <Row >
                                                <Col className="cardtext" xs={"8"}><span>{reqcount}</span><span>{" "}</span><span style={{fontSize:"17px",fontWeight:"bold"}}>건</span></Col>
                                                <Col xs={"4"}>
                                                    <DocumentIcon reqstate="전체" size={50}/>
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

export default ReqCountCard;