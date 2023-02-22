import React, {Component} from 'react';
import PostCartModal from "../product/PostCartModal";

class CartPostAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posted: false,

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
        const items2 = this.props.items2
        let prodnumList = [];
        let reqcountList = [];
        let reqpriceList = [];
        console.log(items2)
        for (let i = 0; i < items2.length; i++) {
            prodnumList.push(parseInt(items2[i].prodnum));
            reqcountList.push(parseInt(items2[i].cartcount));
            reqpriceList.push(parseInt(items2[i].prodprice));

        }


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
        const {items2} = this.props;
        return (
            <div>
                <button className="btn btn-primary" onClick={(e) => {
                    this.postClick2()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-journal-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/>
                        <path
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>
                    &nbsp;전체 승인신청
                </button>
                {posted && <PostCartModal show={true} id={5}
                                          confirm={"신청하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
                {gocart && <PostCartModal show={true} id={2}
                                          confirm={"예"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}

            </div>
        )
    }
}

export default CartPostAll;