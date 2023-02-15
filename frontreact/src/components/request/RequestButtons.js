import React, {Component} from "react";
import {Button} from "react-bootstrap";

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
        const checkedRequest = this.props.checkedRequest;

        return (
            <div className="request-button-wrapper">
                <Button className="request-button"
                        onClick={this.approve} style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0"}}>승인</Button>
                <Button className="request-button"
                        onClick={this.reject} style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0"}}>반려</Button>
            </div>
        );
    }
}

export default RequestButtons;

