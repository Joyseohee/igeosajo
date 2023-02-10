import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "./cartcount";
import PostCartModal from "./PostCartModal";

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
            <div>
                <button className="btn btn-primary" onClick={this.postClick2} disabled={disabled}>cart</button>


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