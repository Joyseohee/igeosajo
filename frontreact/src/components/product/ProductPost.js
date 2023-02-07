import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "../common/cartcount";

class ProductPost extends Component {
    constructor(props) {
        super(props);
        this.state = {

            posted : true,
            prodnumList2: [],
            cartcountList: []
        };
        this.postClick = this.postClick.bind(this);

    }

    //post
    postClick() {
        let prodnumList = this.props.prodnumList
        let cartcountList = this.state.cartcountList
        let prodnumList2 = this.state.prodnumList2
        let productItemList2 = this.props.productItemList2

        const usernum = this.props.usernum
        console.log("prodnumList: " + prodnumList)
        for (let i = 0; i < prodnumList.length; i++) {
            console.log('post1')
            console.log(productItemList2)
            console.log(i)
            console.log(prodnumList[i])
            var returnValue = productItemList2.find(function (data) {
                return data.id === prodnumList[i]
            });
            console.log('post2')

            if (returnValue) {
                console.log('post3')
                prodnumList2.push(returnValue.id);
                cartcountList.push(returnValue.count);
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
        });
        prodnumList = [];
        prodnumList2 = [];
        cartcountList = [];
        this.setState({
            prodnumList2: prodnumList2,
            prodnumList: prodnumList,
            cartcountList: cartcountList
        })
        // const body = await response.json();

        console.log('this is 포스트 완료:', this);

        if  ( this.props.posted ===true){
            this.setState((state) => ({
                posted : false
            }), () => {
                this.props.postcheck(this.state.posted);
        });

        }
        else {
            this.setState((state) => ({
                posted : true
            }), () => {
                this.props.postcheck(this.state.posted);
        });

        }

    }


    render() {
        return (
            <button className="btn btn-primary" onClick={this.postClick}>장바구니 담기</button>
        );
    }
}

export default ProductPost;