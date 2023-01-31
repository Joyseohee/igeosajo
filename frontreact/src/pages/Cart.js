import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";

let prodnumList = []
let reqcountList = []
let requestList = []
let prodnum2 = []
let reqpriceList = []
let usernum = '1';

class Hello extends Component {
    state = {
        items: [],
        select: "False",

    };

    //delete
    async handleClick() {
        const prodnum =prodnumList;
        //'5' + '1'
        console.log(prodnum)
        const response = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum + '&prodnum=' + prodnum, {
                method: 'DELETE'
            }
                .then(response => response.json())
                .then(json => console.log(json))
        );
        // const body = await response.json();

        console.log('this is:', this);
    }


    //post
    async handleClick2() {

        const termyearmonth = 202301

        const response = await fetch('http://127.0.0.1:8000/api/request', {
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

        }).then(() => {

                this.handleClick()
            }
        );
        console.log('this is:', this);
    }

    //get
    async componentDidMount() {
        try {
            console.log('dsd');

            const res = await fetch('http://127.0.0.1:8000/api/cart?usernum=1');

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
        requestList = null

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

    choiceUnit(check, val) {

        if (check) {
            var valSplit = val.split(',');
            console.log("prdnum:" + valSplit[0]);
            console.log("cartcount:" + valSplit[1]);
            console.log("prdprice:" + valSplit[2]);


            prodnumList.push(parseInt(valSplit[0]));
            reqcountList.push(parseInt(valSplit[1]));
            reqpriceList.push(parseInt(valSplit[2]) * parseInt(valSplit[1]));

        } else {
            for (let i = 0; i < prodnumList.length; i++) {
                if (prodnumList[i] == val) {
                    prodnumList.splice(i, 1);
                    reqcountList.splice(i, 1);
                    reqpriceList.splice(i, 1);
                    break;
                }
            }
            console.log(prodnumList);
            console.log(reqcountList);
            console.log(reqpriceList);

        }
    }

    choiceUnit2(check, val) {

        if (check) {

            console.log("prdnum:" + val);
            prodnum2.push(val);

        } else {
            for (let i = 0; i < prodnum2.length; i++) {
                if (prodnum2[i] == val) {
                    prodnum2.splice(i, 1);

                    break;
                }
            }
        }
        console.log(prodnum2);


    }

    render() {
        const {select} = this.state;
        // const usernum = this.props.usernum;
        //console.log(usernum);

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.prodnum]}
                                onChange={(e) => {
                                    this.choiceUnit2(e.target.checked, e.target.value);
                                }}/></td>

                <td>{list.prodimg}</td>
                <td>{list.prodname}</td>
                <td>{list.prodprice}</td>
                <td>{list.cartcount}</td>
                <td>{list.prodnum}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.prodnum, list.cartcount, list.prodprice]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
                                }}/></td>
            </tr>
            </tbody>
        ))
        console.log(list);
        return (
            <div>
                <div><a>장바구니 </a>
                    <button className="btn btn-primary" onClick={this.handleClick2}>승인신청</button>
                    <button onClick={(e) => {
                        this.handleClick(usernum, prodnum2)
                    }}>삭제
                    </button>
                </div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>삭제<Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>상품코드</th>
                        <th>선택<Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                    </tr>
                    </thead>
                    {list}
                </Table>


            </div>
        );
    }
}

export default Hello;