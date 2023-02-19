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

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    render() {

        return (
            <div>
                <Button className={"sendButton"} style={{backgroundColor: "#1C91FB", border: "none"}}
                        value={true} onClick={(e) => {
                    this.reqSendClick(true);
                }}>{this.props.btnMent}</Button>

            </div>
        );
    }
}

export default requestSendButton;