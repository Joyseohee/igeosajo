import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import Api from "../../api/Api";

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalModalType: null,
        }
    }

    handleConfirm = (modalType) => {
        if (modalType === "반려확인") {
            this.props.updateState({showRejectConfirmModal: true, showRejectModal: false});
        } else if (modalType === "반려" || modalType === "승인") {
            this.confirmUpdate(modalType);
        }
        this.handleClose();
    };

    handleClose = () => {
        const {modalType} = this.props;
        if (modalType === "반려확인") {
            this.props.updateState({showRejectModal: false});
        } else if (modalType === "승인") {
            this.props.updateState({showApproveConfirmModal: false});
        } else if (modalType === "반려") {
            this.props.updateState({showRejectConfirmModal: false});
        } else if (modalType === "반려이유확인") {
            this.props.updateState({showRejectReasonModal: 0});
        } else if (modalType === "신청없음") {
            this.props.updateState({showApproveConfirmModal: false, showRejectModal: false});
        } else {
            this.props.updateState({showFinalModal: false});
        }
    };

    confirmUpdate = (reqstate) => {
        this.props.checkedRequest.map((request) => {
            return new Api().update("request", {
                "reqstate": reqstate,
                "reqstaging": "처리전",
                "reqrejectreason": reqstate === '반려' ? this.props.reqRejectReason : null
            }, request.reqnum)
        });
        setTimeout(() => {
            Promise.all([
                new Api().read("request", {termyearmonth: this.props.selectedReqterm}, null),
                new Api().read("request", {
                    termyearmonth: this.props.selectedReqterm,
                    reqstate: this.props.requestFilter==='전체'?null:this.props.requestFilter,
                }, null)
            ]).then(([requestList, requestFilteredList]) =>
                Promise.all([requestList.json(), requestFilteredList.json()]))
                .then(([requestList, requestFilteredList]) => {
                    this.props.updateState({
                        requestList: requestList.map((request) => ({
                            ...request,
                            checked: false,
                        })),
                        requestFilteredList: requestFilteredList.map((request) => ({
                            ...request,
                            checked: false,
                        })),
                        requestFilter: this.props.requestFilter,
                        checkedRequest: [],
                        allChecked: false,
                        pageCount: requestFilteredList.length,
                    })}
                ).catch((error) => console.error(error));
        }, 500);
        this.props.updateState({showFinalModal: true});
        this.setState({finalModalType: reqstate})
    };

    setReqRejectReason = (e) => {
        this.props.updateState({reqRejectReason: e.target.value});
    };


    render() {
        let {show, text, confirm, modalType} = this.props;
        let finalModalType = this.state.finalModalType;
        if (finalModalType !== null) {
            modalType = finalModalType + "완료";
            text = finalModalType + " 완료되었습니다.";
        }

        return (
            <>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    {modalType === "반려확인" || modalType === "반려이유확인" ?
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>반려 사유</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control as="textarea"
                                                      rows={3}
                                                      onBlur={(e) => this.setReqRejectReason(e)}
                                                      placeholder={text}
                                                      readOnly={modalType==='반려이유확인'}
                                                      autoFocus/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </>
                        :
                        <Modal.Body>{text}</Modal.Body>
                    }
                    <Modal.Footer>
                        {(modalType ==='승인' || modalType === '반려' || modalType === '반려확인') &&
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

export default ConfirmModal;
