import React, {Component} from "react";
import "../styled/Layouts.css"
import OrderProgress from "./OrderProgress";
import Container from "react-bootstrap/Container";
import Headertitle from "../components/orderProgress/HeaderTitle";
import DateSetting from "../components/orderProgress/DateSetting";
import OrderSearch from "../components/orderProgress/OrderSearch";
import OrderView from "../components/orderProgress/OrderView";
import OrderDataInput from "../components/orderRequestList/OrderDataInput";
import { withRouter } from 'react-router-dom';
import OrderTotalReq from "../components/orderRequestList/OrderTotalReq";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcode from 'react-daum-postcode';
class OrderParchase extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("구매 페이지");
        this.state = {
            reqnum: this.props.location.state.data,
            reqdata: [],
            totalprice: 0,
            show:false,
            zoneCode: "",
            fullAddress: "",
        };
        console.log(this.props.location.state.data)
        this.totalpricecal = this.totalpricecal.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
            fetch("http://127.0.0.1:8000/api/order", {
                    method : "POST",          //메소드 지정
                    headers : {               //데이터 타입 지정
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({data:this.props.location.state.data} )   //실제 데이터 파싱하여 body에 저장
                }).then(response=>response.json())        // 리턴값이 있으면 리턴값에 맞는 req 지정
                  .then(response=> {
                    this.setState({reqdata:response});
                  });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         if (this.state.reqnum !== prevState.reqnum) {
            this.setState({reqnum : this.state.reqnum});
        }
         if (this.state.reqdata !== prevState.reqdata) {
            this.setState({reqdata : this.state.reqdata});
            console.log(this.state.reqdata)
             this.totalpricecal(this.state.reqdata)
        }
    }

    totalpricecal= (data) =>{
        let totalprice = 0
        {data && data.map((price,i) => (
            totalprice += price[3]
        ))}
        this.setState({totalprice: totalprice })
    }
    handleClose = () => {
        this.setState({show:false})
        this.closePostCode()
    }
    handleShow = (state) => {
        this.setState({show:state})
        this.openPostCode()
    }
    handleAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';
        let zoneCode = data.zonecode;
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.handleClose()
        this.setState({fullAddress:fullAddress})
        this.setState({zoneCode:zoneCode})
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
        const {reqdata,totalprice,show,fullAddress,zoneCode} = this.state
        return (
            <div className="page-top">
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Headertitle title="배송지 입력"></Headertitle>
                    <OrderDataInput handleShow={this.handleShow} fullAddress={fullAddress} zoneCode={zoneCode}></OrderDataInput>
                    <OrderTotalReq reqdata={reqdata} totalprice={totalprice}></OrderTotalReq>
                    <Button  onClick={this.modalshow} style={{width: '92%',margin:"auto",marginLeft:"28px", height:"50px"}}>결제하기</Button>
                </Container>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>우편번호 검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DaumPostcode
                          onComplete={this.handleAddress}
                        />
                    </Modal.Body>
                 </Modal>
            </div>
        );
    }
}

export default withRouter(OrderParchase);
