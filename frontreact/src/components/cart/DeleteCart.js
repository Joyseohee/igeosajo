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
        const prodnumList = this.props.prodnumList;
        const response = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + this.props.usernum + '&prodnum=' + prodnumList, {
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
        const prodnumList = this.props.prodnumList;

        return (
            <div>
                <button className='btn btn-outline-secondary' onClick={(e) => {
                    this.postClick2()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-cart-dash" viewBox="0 0 16 16">
                        <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                        <path
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>&nbsp;삭제
                </button>
                {posted && <PostCartModal show={true} id={4}
                                          confirm={"삭제하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
                {posted && prodnumList.length === 0 && <PostCartModal show={true} id={3}
                                                                      confirm={"확인"} handleClose={this.handleClose}
                                                                      handleConfirm={this.handleClose}
                                                                      modalInfo={this.props.modalInfo}
                />}
            </div>
        )
    }
}

export default DeleteCart;