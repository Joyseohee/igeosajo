import React, {Component} from "react";
import {Button} from "react-bootstrap";
import PostCartModal from "../product/PostCartModal";

class ReqCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posted: false

        };

    }

    //delete
    async deleteClick() {
        // const usernum = '3'
        const reqnum = this.props.reqnum
        //'5' + '1'
        console.log(reqnum)
        const response = await fetch('http://127.0.0.1:8000/api/request?reqnum=' + reqnum, {
            method: 'DELETE'
        });
        // const body = await response.json();

        console.log('this is:', this);
    }

    handleClose = () => {
        this.setState({
            posted: false
        })
    };

    handleConfirm = () => {
        this.deleteClick();
        this.handleClose();
    };
    postClick2 = () => {
        this.setState({
            posted: true
        })
    }

    render() {
        const posted = this.state.posted
        return (<div>
                <Button className="btn btn-primary" onClick={() => {
                    this.postClick2()
                }}>신청 취소</Button>
                {posted && <PostCartModal show={true} id={1}
                                          confirm={"삭제하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
            </div>


        )
    }
}

export default ReqCancel