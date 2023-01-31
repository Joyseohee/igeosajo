import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

let prodnumList = []
let cartcountList = []


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            title: '',
            body: ''
        };
        this.props.setpagename("상품목록");

    }


    async handleClick() {
        const usernum = 1

        const response = await fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prodnum": prodnumList,
                "usernum": usernum,
                "cartcount": cartcountList
            }),
        });
        // const body = await response.json();

        console.log('this is:', this);


    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/product');
            const items = await res.json();
            this.setState({
                items
            });
        } catch (e) {
            console.log(e);
        }
    }

    choiceAll() {
        prodnumList = []
        cartcountList = []

        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            if (selectAll[0].checked) {
                prodnumList.push(checkbox.value);
            }
        })
        console.log(prodnumList.prodnum);
    }

    choiceUnit(check, val) {

        if (check) {
            var valSplit = val.split(',');
            console.log(valSplit[0]);
            console.log(valSplit[1]);

            prodnumList.push(parseInt(valSplit[0]));
            cartcountList.push(parseInt(valSplit[1]));
        } else {
             for (let i = 0; i < prodnumList.length; i++) {
                if (prodnumList[i] == val) {
                    prodnumList.splice(i, 1);
                    break;
                }
            }
        }
        console.log(prodnumList);
        console.log(cartcountList);
    }


    render() {

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.prodnum, list.prodprice]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
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