import React, {Component} from 'react';
import PostCartModal from "../product/PostCartModal";

class DeleteCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posted: false
        };
    }

    //delete
    async deleteClick() {
        const prodnum = this.props.prodnum2;
        const response = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + this.props.usernum + '&prodnum=' + prodnum, {
            method: 'DELETE'
        }).then(() => {
            this.props.postcheck()
        });
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
        const prodnum = this.props.prodnum2;

        return (
            <div>
                <button className='btn btn-outline-secondary' onClick={(e) => {
                    this.postClick2()
                }}>삭제
                </button>
                {posted && <PostCartModal show={true} id={4}
                                          confirm={"삭제하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
                {posted && prodnum.length === 0 && <PostCartModal show={true} id={3}
                                                                      confirm={"확인"} handleClose={this.handleClose}
                                                                      handleConfirm={this.handleClose}
                                                                      modalInfo={this.props.modalInfo}
                />}
            </div>
        )
    }
}

export default DeleteCart;