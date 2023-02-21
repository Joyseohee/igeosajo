import React, {Component} from "react";
import "../styled/Layouts.css"
import Container from "react-bootstrap/Container";
import OrderDataInput from "../components/orderRequestList/OrderDataInput";
import { withRouter } from 'react-router-dom';
import OrderTotalReq from "../components/orderRequestList/OrderTotalReq";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcode from 'react-daum-postcode';
import Goal from "../components/Goal";
class OrderParchase extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("구매 신청");
        this.state = {
            reqnum: this.props.location.state.data,
            reqdata: [],
            totalprice: 0,
            show:false,
            zoneCode: "",
            fullAddress: "",
            paymentshow:false,
            paymentcontent:"",
            paymentcheckshow:false,
            paymentcheckcontent:"",
            paymentflag:false,
            paymentconfirmationshow:false,
            paymentconfirmationcontent:false,
            deliverdata:[],
        };

    }
    componentDidMount() {
            fetch("http://127.0.0.1:8000/api/order", {
                    method : "POST",
                    headers : {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({reqdata:this.props.location.state.data} )
                }).then(response=>response.json())
                  .then(response=> {
                    this.setState({reqdata:response});
                    this.totalpricecal(response)
                  });
    }
    componentWillUnmount() {
        this.handleClose()
    }

    totalpricecal= (data) =>{
        let totalprice = 0
        {data && data.map((price,i) => (
            totalprice += price[3]
        ))}
        this.setState({totalprice: totalprice })
    }
   
    handleClose = (option) => {
            this.setState({show:false,paymentshow:false,paymentcheckshow:false})
            this.closePostCode()
    }
    handleShow = (state,btn) => {
        if(btn=="deliver"){
            this.setState({show:state})
            this.openPostCode()
        }else if(btn=="payment")
        {
             this.setState({paymentshow:state})
        }else if(btn=="paymentcheck")
        {
             this.setState({paymentcheckshow:state})
        }

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
        
        this.setState({fullAddress:fullAddress})
        this.setState({zoneCode:zoneCode})
        this.handleClose()
    }

    // 팝업창 열기
    openPostCode = () => {
        this.setState({isPopupOpen: true})
    }
    // 팝업창 닫기
    closePostCode = () => {
        this.setState({isPopupOpen: false})
    }
    payment= () => {
        const now = new Date();
        const nowdate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+now.getDate()
        const deliverdata = []
        let paymentcontent = ""

        const postcodeval = document.getElementById("postcode").value
        const addressval = document.getElementById("address").value
        const detailaddress = document.getElementById("detailaddress").value
        const firstphonenumval = document.getElementById("firstphonenum").value
        const midphonenumval = document.getElementById("midphonenum").value
        const lastphonenumval = document.getElementById("lastphonenum").value
        const delivermemoval = document.getElementById("delivermemo").value
        const phonenum =  firstphonenumval +'-' + midphonenumval + '-'+ lastphonenumval
        const totaladdress = addressval +"("+ postcodeval +") "+ detailaddress

        if(addressval== "" || detailaddress ==""){
            paymentcontent = "주소를 정확하게 입력하여 주세요."
            this.setState({paymentcontent:paymentcontent})
            this.handleShow(true,"payment")
        }else if(firstphonenumval== "" || midphonenumval =="" || lastphonenumval ==""){
            paymentcontent = "휴대폰 번호를 정확하게 입력하여 주세요."
            this.setState({paymentcontent:paymentcontent})
            this.handleShow(true,"payment")
        }else {
            deliverdata.push(nowdate)
            deliverdata.push(totaladdress)
            deliverdata.push(phonenum)
            deliverdata.push(delivermemoval)
            
            let paymentcheckcontent = "결제를 진행하시겠습니까?"
            this.setState({paymentcheckcontent:paymentcheckcontent,deliverdata:deliverdata})

            this.handleShow(true,"paymentcheck")
        }
    }
    purchaseConfirmationCheck=()=>{
        const text = "결제가 완료되었습니다.";
        this.setState({paymentcheckshow:false,paymentconfirmationshow:true,paymentconfirmationcontent:text})
        
    }
    purchaseConfirmation=()=>{
        this.setState({paymentconfirmationshow:false})
        fetch("http://127.0.0.1:8000/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({deliverdata: this.state.deliverdata, reqdata: this.props.location.state.data})
                })
                this.props.history.push({
                pathname: "/Order",
                })
    }
  
    render() {
        const {reqdata,totalprice,show,fullAddress,zoneCode,paymentcontent,paymentshow,paymentcheckshow,paymentcheckcontent,paymentconfirmationshow,paymentconfirmationcontent} = this.state
        return (
            <div className="page-top">
                <Container fluid style={{margin: 0, padding: 0}}>
                    <Goal comment={"배송지 입력"}/>
                    <OrderDataInput handleShow={this.handleShow} fullAddress={fullAddress} zoneCode={zoneCode}></OrderDataInput>
                    <OrderTotalReq reqdata={reqdata} totalprice={totalprice}></OrderTotalReq>
                    <Button onClick={this.payment} style={{width: '93%',margin:"auto",marginLeft:"28px", height:"50px"}}>결제하기</Button>
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
                <Modal
                    show={paymentshow}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Body>
                        {paymentcontent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>확인</Button>
                    </Modal.Footer>
                 </Modal>
                <Modal
                    show={paymentconfirmationshow}
                    onHide={this.purchaseConfirmation}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Body>
                        {paymentconfirmationcontent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.purchaseConfirmation}>확인</Button>
                    </Modal.Footer>
                 </Modal>
                <Modal
                    show={paymentcheckshow}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Body>
                        {paymentcheckcontent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.purchaseConfirmationCheck}>확인</Button>
                        <Button onClick={this.handleClose}>취소</Button>
                    </Modal.Footer>
                 </Modal>
            </div>
        );
    }
}
export default withRouter(OrderParchase);
