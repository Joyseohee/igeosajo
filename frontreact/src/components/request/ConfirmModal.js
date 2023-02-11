import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirm(e) {
        this.props.handleConfirm(e.target.value);
    }

    render() {
        const {show, text, confirm, modalType} = this.props;
        console.log(modalType);

        return (
            <>
                <Modal
                    show={show}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    {modalType === "반려확인" ?
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>반려 사유</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control as="textarea" rows={3}
                                                      onBlur={(e) => this.props.setReqRejectReason(e)}
                                                      placeholder={text}
                                                      autoFocus/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </>
                        :
                        <Modal.Body>{text}</Modal.Body>
                    }
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>취소</Button>
                        <Button variant="primary" value={modalType} onClick={(e) => {
                            this.handleConfirm(e)
                        }}>{confirm}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ConfirmModal;
