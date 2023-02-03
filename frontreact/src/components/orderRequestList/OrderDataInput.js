import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import all from "../../img/allicon.png";
import DaumPostcode from 'react-daum-postcode';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import OrderReqDate from "./OrderReqDate";

class OrderDataInput extends Component {
    constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            startyear: date.getFullYear(),
            startmonth: (date.getMonth() + 1),
            endyear: date.getFullYear(),
            endmonth: (date.getMonth() + 1),
            isPopipOpen: false,
        }
    }

    componentDidMount() {

    }

    handleAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    }

    // 팝업창 열기
    openPostCode = () => {
        this.setState({isPopupOpen: true})
    }

    // 팝업창 닫기
    closePostCode = () => {
        this.setState({isPopupOpen: false})
    }

    render() {
        const{isPopupOpen}= this.state
        return (

            <div className="cardcontain">
                <Card style={{width: '95%'}}>
                    <Card.Body onClick={(e) => {
                        this.statechange(e, "allselect")
                    }}>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col className="cardtext">115</Col>
                                    <Col> <img src={all} alt="logo"/></Col>
                                    <button type='button' onClick={this.openPostCode}>우편번호 검색</button>
                                    <div id='popupDom'>
                                        {isPopupOpen && (
                                            <PopupDom>
                                                <PopupPostCode onClose={this.closePostCode}/>
                                            </PopupDom>
                                        )}
                                    </div>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>

                {/*<DaumPostcode onComplete={this.handleClick} autoClose />*/}
            </div>
        )
    }
}
export default OrderDataInput;
