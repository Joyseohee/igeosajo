import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "./Productcount";
import PostCartModal from "./PostCartModal";
import myImage from '../../img/shopping-cart.png';
import "../../styled/Product.css"

class ProductPostEach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posted: false,
            gocart: false
        };
        this.postClick = this.postClick.bind(this);
    }

    //post
    postClick = () => {

        const prodnum = this.props.prodnum
        const count = this.props.count
        const usernum = this.props.usernum

        let prodnumList = [];
        let cartcountList = [];
        prodnumList.push(prodnum);
        cartcountList.push(count);

        const response = fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prodnum": prodnumList,
                "usernum": usernum,
                "cartcount": cartcountList
            }),
        })


        this.setState({
            posted: false,
            gocart: true
        }, () => {
            this.props.postcheck(this.state.posted);
        });
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
        const {posted, gocart} = this.state
        const {count} = this.props
        let disabled = count !== 0 ? 0 : 1

        return (
            <div className="buttonc" >
                <button className="btn-primary btn button_cart" onClick={this.postClick2} disabled={disabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                    </svg></button>
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

export default ProductPostEach