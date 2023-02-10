import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "../product/cartcount";
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

    //post
    postClick() {
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        const termyearmonth = year + '' + month
        // const termyearmonth = 202301

        console.log('날짜보기')
        console.log(termyearmonth)
        const usernum = this.props.usernum
        const prodnumList = this.props.prodnumList;
        const reqcountList = this.props.reqcountList;
        const reqpriceList = this.props.reqpriceList;
        console.log(usernum)
        console.log(prodnumList)
        console.log(reqcountList)
        console.log(reqpriceList)


        const response = fetch('http://127.0.0.1:8000/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(prodnumList)

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

    // if (this.props.posted === true) {
    //     this.setState((state) => ({
    //         posted: false
    //     }), () => {
    //         this.props.postcheck(this.state.posted);
    //     });
    //
    // } else {
    //     this.setState((state) => ({
    //         posted: true
    //     }), () => {
    //         this.props.postcheck(this.state.posted);
    //     });
    //
    // }


    // if (this.props.posted === true) {
    //     this.setState((state) => ({
    //         posted: false
    //     }), () => {
    //         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    //         this.props.postcheck(this.state.posted);
    //      //   console.log('---------postcarttorequest2')
    //     });
    //
    // } else {
    //     this.setState((state) => ({
    //         posted: true
    //     }), () => { console.log('??????????????????????')
    //         this.props.postcheck(this.state.posted);
    //
    //     });
    //
    // }


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
                }}>승인신청
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