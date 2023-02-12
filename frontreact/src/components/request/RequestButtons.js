import React, {Component} from "react";
import {Button, FormSelect} from "react-bootstrap";

class RequestButtons extends Component {
    constructor(props) {
        super(props);
    }

    approve = () => {
        this.props.updateState({showApproveConfirmModal: true});
    };

    reject = () => {
        this.props.updateState({showRejectModal: true});
    };


    render() {
        return (
            <>
                <Button onClick={this.approve}>승인</Button>
                <Button onClick={this.reject}>반려</Button>
            </>
        );
    }
}

export default RequestButtons;

