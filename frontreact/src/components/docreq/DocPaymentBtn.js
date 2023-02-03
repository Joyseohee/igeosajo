import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

import "../../styled/DocRequestCss.css"

class requestSendButton extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false
        };
    }

    reqSendClick = (e) => { // 값을 결재 신청 할지 말지 확인 하는 것
        this.props.reqSendClick(e)
    }

    render() {
        return(
            <div className={"docPaymentDiv"}>
                <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(82, 150, 213)", border:"none" , marginRight: "1rem"}} onClick={ (e) =>{
                    this.reqSendClick(true);
                } } >확인</Button>

                <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(110, 117, 124)", border:"none"}} onClick={(e) => {
                    this.reqSendClick(false);
                }}> 취소 </Button>
            </div>
        );
    }
}

export default requestSendButton;