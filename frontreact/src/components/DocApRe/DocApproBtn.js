import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {withRouter} from "react-router-dom";

import "../../styled/DocRequestCss.css"


class DocApproBtn extends Component {
    constructor(props) {
        super();
    }

    reqSendClick = (reqSend, reject) => {
        this.props.reqSendClick(reqSend, reject);
    }

    render() {
        return (
            <div className={"docPaymentDetailDiv"}>
                <Button className={"docPaymentBtn cancleBtn"}
                        style={{backgroundColor: "rgb(110, 117, 124)", border: "none"}} onClick={(e) => {
                    this.props.history.push('/main');
                }}> 목록 </Button>

                <div>
                    <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(110, 117, 124)", border: "none"}}
                            onClick={(e) => {
                                this.reqSendClick(true, true);
                            }}>반려</Button>
                    <Button className={"docPaymentBtn"} style={{backgroundColor: "rgb(214, 87, 69)", border: "none"}}
                            onClick={(e) => {
                                this.reqSendClick(true, false);
                            }}>승인</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(DocApproBtn);