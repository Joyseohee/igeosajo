import React, {Component} from 'react';
import OrderSearch from "./OrderSearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

let text = ""

class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            text : this.props.text,
        }

        console.log(text)

    }


    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));

    }
    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
        this.setState({text : this.props.text});
        }

    }






    render() {
        const { posts, text } = this.state
        return (
            <div>

                <Row>
                    <div className="btndivmargin">
                        <Form.Check className="orderallselect" inline label="전체선택" name="group1" id={`1`}/>
                        <button type="button" className="btn btn-success submitbutton">{text}</button>
                        <button type="button" className="btn btn-primary deliverbutton">배송완료</button>
                    </div>
                </Row>
                <div className="orderviewmargin">

                    <Row style={{width: '100%'}}>
                        <div className="cardcontain">
                            <Card style={{width: '95%'}}>
                                <Card.Body>
                                    <Container className="containermargin">
                                        <Row>
                                            <Col><Form.Check className="ordercardtext" inline label="문서번호" name="group1"
                                                             id={`1`}/></Col>
                                            <Col xs lg="2"><span className="ordercardtext">2021-08-19</span></Col>
                                            <Col xs lg="2"><span className="ordercardtext">불출완료</span></Col>
                                        </Row>
                                    </Container>
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>상품코드</th>
                                            <th>사무용품</th>
                                            <th>수량</th>
                                            <th>가격</th>
                                            <th>요청자</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Larry the Bird</td>
                                            <td>@twitter</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <div>
                                        <span>Total Price : </span>
                                        <span>600000000</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>

                </div>
            </div>
        )
    }
}

export default OrderView;