import React, {Component, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";

class ReqReject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.show);
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>반려 사유</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" rows={3}
                                              onBlur={(e) => this.props.setReqRejectReason(e)}
                                              placeholder="반려 사유를 입력해주세요."
                                              autoFocus/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={this.props.confirmReject}>반려</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ReqReject;
