import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Api from "../../api/Api";

class ReqtermModal extends Component {
    constructor(props) {
        super(props);
    }

    handleConfirm = (modalType) => {
        if (modalType === "마감반려") {
            const params = {
                "usernum": this.props.usernum,
                "termavailable": 0,
            }
            this.props.updateState({setreqtermstart: false});


            new Api().update("reqterm", params, this.props.presentTerm.termyearmonth).then(() => {
                this.props.getReqtermList()
            })

            Promise.all([
                new Api().update("reqterm", params, this.props.presentTerm.termyearmonth),
                new Api().update("request", {"termyearmonth": this.props.presentTerm.termyearmonth}, null)
            ]).then(([reqterm, request]) =>
                Promise.all([reqterm.status, request.status]))
                .then(([reqterm, request]) => {
                    if (reqterm !== 200 || request !== 200) {
                        alert("처리가 취소되었습니다.");
                    }
                })
                .catch((error) => console.error(error));
            this.props.updateState({showRequestAllEndModal: true});
        }
        this.handleClose();
    };

    handleClose = () => {
        const {modalType} = this.props;
        if (modalType === "마감반려") {
            this.props.updateState({showReqtermEndModal: false});
        } else if (modalType === "마감") {
            this.props.updateState({showRequestAllEndModal: false});
        }
    };

    render() {
        let {show, text, confirm, modalType} = this.props;

        return (
            <>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>{text}</Modal.Body>
                    <Modal.Footer>
                        {modalType === '마감반려' &&
                            <Button variant="secondary" onClick={this.handleClose}>취소</Button>}
                        <Button variant="primary" value={modalType} onClick={(e) => {
                            this.handleConfirm(e.target.value)
                        }} style={{
                            backgroundColor: "rgb(52, 152, 219)",
                            borderColor: "rgb(52, 152, 219)"
                        }}>{confirm}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ReqtermModal;
