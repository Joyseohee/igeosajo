import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "../common/cartcount";
import PostCartModal from "./PostCartModal";

class ProductPost extends Component {
    constructor(props) {
        super(props);
        this.state = {

            posted: false,
            gocart: false,
            prodnumList2: [],
            cartcountList: []
        };
        this.postClick = this.postClick.bind(this);

    }

    //post
    postClick = () => {

        let prodnumList = this.props.prodnumList
        let cartcountList = this.state.cartcountList
        let prodnumList2 = this.state.prodnumList2
        let productItemList = this.props.productItemList

        const usernum = this.props.usernum
        console.log("prodnumList: " + prodnumList)
        for (let i = 0; i < prodnumList.length; i++) {
            console.log('post1')
            console.log(productItemList)
            console.log(i)
            console.log(prodnumList[i])
            var returnValue = productItemList.find(function (data) {
                return data.prodnum === prodnumList[i]
            });
            console.log('post2')
            console.log(returnValue.prodnum)
            if (returnValue) {
                console.log('post3')
                prodnumList2.push(returnValue.prodnum);
                cartcountList.push(returnValue.ccount);
            }
        }
        console.log('post4')

        const response = fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prodnum": prodnumList2,
                "usernum": usernum,
                "cartcount": cartcountList
            }),
        })

        prodnumList = [];
        prodnumList2 = [];
        cartcountList = [];
        this.setState({
            prodnumList2: prodnumList2,
            prodnumList: prodnumList,
            cartcountList: cartcountList,
            posted: false,
            gocart: true
        })
        // const body = await response.json();

        console.log('this is 포스트 완료:', this);


        if (this.props.posted === true) {
            this.setState((state) => ({
                posted: false
            }), () => {
                this.props.postcheck(this.state.posted);
            });

        } else {
            this.setState((state) => ({
                posted: true
            }), () => {
                this.props.postcheck(this.state.posted);
            });

        }

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
        const posted = this.state.posted
        const gocart = this.state.gocart
        return (
            <div>
                <button className="btn btn-primary" onClick={this.postClick2}>장바구니 담기</button>

                {posted && <PostCartModal show={true} id={1}
                                          confirm={"담기"} handleClose={this.handleClose}
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

export default ProductPost;