import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

import "../../styled/DocRequestCss.css"

class DocPaymentDetailBtn extends Component {
    constructor(props) {
        super();
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    render() {
        return(
            <div className={"docPaymentDetailDiv"}>
                <Button className={"docPaymentBtn cancleBtn"} style={{backgroundColor: "rgb(110, 117, 124)", border:"none"}} onClick={(e) => {
                    window.location.reload()
                    // window.location.assign("")
                    // 목록 돌아가는 경로 삽입
                }}> 목록 </Button>

                <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(214, 87, 69)", border:"none"}} onClick={ (e) =>{
                    this.reqSendClick(true);
                } } >상신 취소</Button>
            </div>
        );
    }
}

export default DocPaymentDetailBtn;