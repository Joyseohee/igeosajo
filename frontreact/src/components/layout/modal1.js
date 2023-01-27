import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class modal1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={ () => {
                    this.state.show = true;
                } }>
                    Launch static backdrop modal
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={ () => {this.state.show = false;} }
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.state.show = false;}}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default modal1;