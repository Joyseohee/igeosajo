import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

import "../styled/DocRequestCss.css"

class requestSendButton extends Component {
    constructor(props) {
        super();
    }

    reqSendClick = (e) => {
        this.props.reqSendClick(e)
    }

    render() {

        return(
            <div>
                <Button variant="primary" className={"sendButton"} value={true} onClick={ (e) => {
                    this.reqSendClick(true);
                } }>전자 결재 작성</Button>
            </div>
        );
    }
}

export default requestSendButton;