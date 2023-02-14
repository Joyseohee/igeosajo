import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../styled/etcCss.css"
import {Form} from "react-bootstrap";

class modal2 extends Component {

    constructor(props) {
        super(props);
    }

    modal2 = (open) => {

        let rejectReason;

        return (
            <Modal
                show={open}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control as="textarea"
                                          rows={3}
                                          onBlur={(e) => {rejectReason = e.target.value}}
                                          placeholder={"반려 사유를 입력 하세요"}
                                          autoFocus/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button className={"modal1btn"}
                            style={{backgroundColor: "rgb(82, 150, 213)", border: "none"}}
                            onClick={() => {
                                this.props.inputReject("취소");
                            }}>취소</Button>

                    <Button className={"modal1btn"}
                            style={{backgroundColor: "rgb(82, 150, 213)", border: "none"}}
                            onClick={() => {
                                this.props.inputReject(rejectReason);
                            }}>확인</Button>

                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        const open = this.props.open;
        return (
            <div>
                {this.modal2(open)}
            </div>
        );
    }
}

export default modal2;