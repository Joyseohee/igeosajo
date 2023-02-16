import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {withRouter} from "react-router-dom";

import "../../styled/DocRequestCss.css"


class DocPaymentDetailBtn extends Component {
    constructor(props) {
        super();
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e);
    }

    showBtn = () => {


        if (this.props.listState === "대기") {
            return (
                <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(214, 87, 69)", border:"none"}} onClick={ (e) =>{
                    this.reqSendClick(true);
                } } >상신 취소</Button>
            )
        }
    }



    render() {
        return(
            <div className={"docPaymentDetailDiv"}>
                <Button className={"docPaymentBtn cancleBtn"} style={{backgroundColor: "rgb(110, 117, 124)", border:"none"}} onClick={(e) => {
                    this.props.history.push('/docpaylist');
                }}> 목록 </Button>

                {this.showBtn()}
            </div>
        );
    }
}

export default withRouter(DocPaymentDetailBtn);