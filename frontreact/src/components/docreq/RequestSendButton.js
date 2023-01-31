import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

import "../../styled/DocRequestCss.css"
import Modal1 from "../layout/Modal1";

class requestSendButton extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false
        };
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    changeModalState = (e) => {
        this.setState({open: e})
    }

    outcomeState = (e) => {
        this.reqSendClick(true);
    }

    render() {

        return(
            <div>
                <Button className={"sendButton"} style={{backgroundColor: "rgb(82, 150, 213)", border:"none"}} value={true} onClick={ (e) => {
                    this.changeModalState(true);
                } }>전자 결재 작성</Button>

                <Modal1 open={this.state.open} ment = {"선택한 목록으로 작성 하시겠습니까?"} changeModalState={this.changeModalState}
                        outcomeState = {this.outcomeState} modalkind = {true}></Modal1>

            </div>
        );
    }
}

export default requestSendButton;