import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
    }
    handleConfirm(e){
        this.props.handleConfirm(e.target.value);
    }

    render() {
        const text = this.props.text;
        const confirm = this.props.confirm;
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>{text}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>취소</Button>
                        <Button variant="primary" value={confirm} onClick={(e) => {this.handleConfirm(e)}}>{confirm}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ConfirmModal;
