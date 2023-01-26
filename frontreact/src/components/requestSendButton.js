import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

import "../styled/DocRequestCss.css"

class requestSendButton extends Component {
    render() {
        return(
            <div>
                <Button variant="primary" className={"sendButton"}>전자 결재 작성</Button>
            </div>
        );
    }
}

export default requestSendButton;