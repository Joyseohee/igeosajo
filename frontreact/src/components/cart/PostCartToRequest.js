import React, {Component} from 'react';
import PostCartModal from "../product/PostCartModal";

class PostCartToRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posted: false,
            gocart: false
        };
        this.postClick = this.postClick.bind(this);
    }

    postClick() {
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        const termyearmonth = year + '' + month
        const usernum = this.props.usernum
        const prodnumList = this.props.prodnumList;
        const reqcountList = this.props.reqcountList;
        const reqpriceList = this.props.reqpriceList;

        const response = fetch('http://127.0.0.1:8000/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prodnum": prodnumList,
                "usernum": usernum,
                "reqcount": reqcountList,
                "reqprice": reqpriceList,
                "termyearmonth": termyearmonth
            })
        }).then(response => {
            this.props.postcheck();
        })
    }

    handleClose = () => {
        this.setState({
            posted: false,
            gocart: false
        })
    };

    handleConfirm = () => {
        this.postClick();
        this.handleClose();
        this.setState({
            gocart: true
        })
    };
    postClick2 = () => {
        this.setState({
            posted: true
        })
    }

    render() {
        const {posted, gocart} = this.state;
        const prodnumList = this.props.prodnumList;
        return (
            <div>
                <button className="btn btn-primary" onClick={(e) => {
                    this.postClick2()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                        <path
                            d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
                        <path
                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>&nbsp;승인신청
                </button>
                {posted && <PostCartModal show={true} id={1}
                                          confirm={"신청하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
                {gocart && <PostCartModal show={true} id={2}
                                          confirm={"예"} handleClose={this.handleClose}
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

export default PostCartToRequest;