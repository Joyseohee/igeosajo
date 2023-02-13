import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class modal1 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const open = this.props.open;
        return (
            <div>
                <Modal
                    show={open}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        {this.props.ment}
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.props.modalKind
                                ?
                                <div>
                                    <Button style={{
                                        backgroundColor: "rgb(110, 117, 124)",
                                        border: "none",
                                        marginRight: "1rem"
                                    }} onClick={(e) => {
                                        this.props.outcomeState(0);
                                    }}> 취소 </Button>

                                    <Button style={{backgroundColor: "rgb(82, 150, 213)", border: "none"}}
                                            onClick={(e) => {
                                                this.props.outcomeState(1);
                                            }}>확인</Button>
                                </div>
                                :
                                <Button style={{backgroundColor: "rgb(82, 150, 213)", border: "none"}}
                                        onClick={() => {
                                            this.props.outcomeState(2);
                                        }}>확인</Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default modal1;