import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

class PostCartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartcountList: [],
            prodnumList2: [],
            modalselect: this.props.modalselect
        };
    }

    handleConfirm(e) {
        this.props.handleConfirm()
    }

    render() {
        const modalInfo = this.props.modalInfo
        const result= modalInfo.filter((modalInfo)=>modalInfo.id === this.props.id);
        const text = result[0].text;
        const confirm = this.props.confirm;


        return (
            <>{result[0].type==='move' ?
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body >{text}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>취소</Button>
                        <Link to={result[0].path}>
                          <Button variant="primary" value={confirm}>{confirm}</Button>
                        </Link>
                    </Modal.Footer>
                </Modal> : <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>{text}</Modal.Body>
                    <Modal.Footer>
                        {result[0].type!=='alert'? <Button variant="secondary" onClick={this.props.handleClose}>아니오</Button> : null}

                        <Button variant="primary" value={confirm} onClick={(e) => {
                            this.handleConfirm(e)
                        }}>{confirm}</Button>

                    </Modal.Footer>
                </Modal>}
            </>
        );
    }
}

export default PostCartModal;
