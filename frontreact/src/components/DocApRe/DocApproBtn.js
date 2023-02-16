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

    showBtn = () => {

        if (this.props.listState === "대기") {
            return (
                <div className={"awaitDocApproBtnDiv"}>
                    <Button className={"awaitDocApproBtn"} style={{backgroundColor: "rgb(214, 87, 69)", border: "none"}}
                            onClick={(e) => {
                                this.reqSendClick(true, true);
                            }}>반려</Button>
                    <Button className={"awaitDocApproBtn approvalBtn"} style={{backgroundColor: "rgb(82, 150, 213)", border: "none"}}
                            onClick={(e) => {
                                this.reqSendClick(true, false);
                            }}>승인</Button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className={"DocApproBtnDiv"}>
                <Button className={"DocApproBtn"}
                        style={{backgroundColor: "rgb(110, 117, 124)", border: "none"}} onClick={(e) => {
                    this.props.history.push('/main');
                }}> 목록 </Button>

                {this.showBtn()}
            </div>
        );
    }
}

export default withRouter(DocApproBtn);