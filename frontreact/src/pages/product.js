import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

let requestList = []
let cartcountList = []


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],

            title: '',
            body: ''
        };

    }


    async handleClick() {
        const usernum = 7

        const prodnum = requestList
        const cartcount = cartcountList

        const response = await fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(requestList)

            body: {
                "prodnum": prodnum,
                "usernum": usernum,
                "cartcount": cartcount
            },
        });
        // const body = await response.json();

        console.log('this is:', this);


    }

    async componentDidMount() {
        try {

            console.log('dsd');
            const res = await fetch('http://127.0.0.1:8000/api/product');

            const items = await res.json();
            this.setState({
                items
            });

        } catch (e) {
            console.log(e);
            console.log('dsd');
        }
    }

    choiceAll() {
        requestList = []
        cartcountList = []

        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;

            if (selectAll[0].checked) {
                requestList.push(checkbox.value);


            }
        })

        console.log(requestList.prodnum);
    }

    choiceUnit(check, val1, val2) {
        if (check) {
            requestList.push(val1);
            cartcountList.push(val2);
        } else {
            requestList.pop(val1);
        }
        console.log(requestList);
        console.log(cartcountList);
    }


    render() {

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[ list.prodnum ,  list.prodprice]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value[1], e.target.value[2]);
                                    console.log("value1:" + e.target.value[1])
                                    console.log("value2:" + e.target.value[2])
                                }}/></td>
                <td>{list.prodname}</td>
                <td>{list.prodnum}</td>
                <td>{list.prodimg}</td>
                <td>{list.prodprice}</td>
            </tr>
            </tbody>
        ))

        console.log(list);
        return (
            <div>
                <div><a>상품목록 </a>
                    <button className="btn btn-primary" onClick={this.handleClick}>장바구니 담기
                    </button>


                </div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th><Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>품목명</th>
                        <th>번호</th>
                        <th>이미지</th>
                        <th>가격</th>
                    </tr>
                    </thead>
                    {list}
                </Table>


            </div>
        );
    }
}


export default Product;