import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

class modal1 extends Component {

    constructor(props) {
        super(props);
    }

    changeModalState = () => {
        this.props.changeModalState(false)
    }

    clickbtn = () => {
        this.props.outcomeState(true);
        this.changeModalState();
        // window.location.replace("http://localhost:3000/docreqdetail");
        // document.location.href("http://localhost:3000/docreqdetail");
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
                            this.props.modalkind
                                ?
                                <div>
                                <Button style={{backgroundColor: "rgb(110, 117, 124)", border:"none", marginRight: "1rem"}} onClick={(e) => {
                                this.changeModalState();
                                }}> 취소 </Button>
                                <Button style={{backgroundColor: "rgb(82, 150, 213)", border:"none"}} onClick={ (e) =>{
                                    // this.props.outcomeState(true);
                                    // this.changeModalState();
                                    // // window.location.replace("http://localhost:3000/docreqdetail");
                                    // document.location.href("http://localhost:3000/docreqdetail");
                                    console.log(1234)
                                    this.clickbtn();
                                } } >확인</Button>
                                </div>
                                : <Button style={{backgroundColor: "rgb(82, 150, 213)", border:"none"}} onClick={ () =>{
                                    console.log(123)
                                    this.changeModalState();
                                    window.location.reload();
                                } } >확인</Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default modal1;