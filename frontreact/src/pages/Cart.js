import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Counter from '../components/cart/cartcount';
import jwt_decode from "jwt-decode";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            select: "False",
            usernum: '',
            prodnumList: [],
            reqpriceList: [],
            reqcountList: [],
            prodnum2: [],
        };

        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.choiceAll = this.choiceAll.bind(this);
         this.choiceAll2 = this.choiceAll2.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);
        this.choiceUnit2 = this.choiceUnit2.bind(this);

        this.props.setpagename("장바구니");
    }


    //delete
    async handleClick() {
        const prodnum = this.state.prodnum2;
        //'5' + '1'
        console.log(prodnum)
        console.log(this.state.usernum)
        const response = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + this.state.usernum + '&prodnum=' + prodnum, {
            method: 'DELETE'
        });
        // const body = await response.json();

        console.log('this is:', this);
    }


    //post
    handleClick2() {

        const termyearmonth = 202301
        const prodnumList = this.state.prodnumList;
        const reqcountList = this.state.reqcountList;
        const reqpriceList = this.state.reqpriceList;

        const response = fetch('http://127.0.0.1:8000/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(prodnumList)

            body: JSON.stringify({
                "prodnum": prodnumList,
                "usernum": this.state.usernum,
                "reqcount": reqcountList,
                "reqprice": reqpriceList,
                "termyearmonth": termyearmonth

            })

        })
        console.log('this is:', this);
    }

    //get
    async componentDidMount() {

        const token = localStorage.getItem('secretcode');
        const decoded = jwt_decode(token);
        const usernum = decoded.usernum;
        this.setState({
            usernum: usernum
        })

        try {
            console.log('dsd');

            const res = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum);

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
        let prodnumList = [];
        let reqcountList = [];
        let reqpriceList = [];

        const checkboxes = document.getElementsByName('select1');
        let selectAll = document.getElementsByName('selectAll1');

        console.log("=========================")
        console.log(checkboxes)
        console.log(selectAll)
        console.log("=========================")

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            console.log("=========================")
            console.log(checkbox.value)
            if (selectAll[0].checked) {

                console.log("여기왔니")
                var valSplit = checkbox.value.split(',');
                console.log("prdnum:" + valSplit[0]);
                console.log("cartcount:" + valSplit[1]);
                console.log("prdprice:" + valSplit[2]);


                prodnumList.push(parseInt(valSplit[0]));
                reqcountList.push(parseInt(valSplit[1]));
                reqpriceList.push(parseInt(valSplit[2]) * parseInt(valSplit[1]));


                // reqcountList.push(parseInt(valSplit[1]));
                // reqpriceList.push(parseInt(valSplit[2]) * parseInt(valSplit[1]));
            }
        })

        this.setState({
            prodnumList : prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList

        })
        console.log("=========================")
        console.log(prodnumList);
        console.log(reqcountList);
        console.log(reqpriceList);
    }

    choiceAll2() {
        let prodnum2 = [];

        const checkboxes = document.getElementsByName('select2');
        let selectAll = document.getElementsByName('selectAll2');

        console.log("=========================")
        console.log(checkboxes)
        console.log(selectAll)
        console.log("=========================")

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            console.log("=========================")
            console.log(checkbox.value)
            if (selectAll[0].checked) {

                console.log("여기왔니2")
                var valSplit = checkbox.value.split(',');
                console.log("prdnum:" + checkbox.value);

                prodnum2.push(parseInt(checkbox.value));
            }
        })
        this.setState({
            prodnum2 : prodnum2
        })
        console.log("=========================")
        console.log(prodnum2);

    }
    choiceUnit(check, val) {
        const prodnumList = this.state.prodnumList;
        const reqcountList = this.state.reqcountList;
        const reqpriceList = this.state.reqpriceList;


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
        const prodnum2 = this.state.prodnum2;


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
        //console.login(usernum);

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select2"}
                                value={[list.prodnum]}
                                onChange={(e) => {
                                    this.choiceUnit2(e.target.checked, e.target.value);
                                }}/></td>

                <td>{list.prodimg}</td>
                <td>{list.prodname}</td>
                <td>{list.prodprice}</td>
                <td>{list.cartcount}</td>
                <td>{list.prodnum}</td>
                <td><Form.Check aria-label="option 1" name={"select1"}
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
                        this.handleClick(this.state.usernum, this.state.prodnum2)
                    }}>삭제
                    </button>
                </div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>삭제<Form.Check aria-label="option 1" name={"selectAll2"} onClick={this.choiceAll2}/></th>
                        <th>이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>상품코드</th>
                        <th>선택<Form.Check aria-label="option 1" name={"selectAll1"} onClick={this.choiceAll}/></th>
                    </tr>
                    </thead>
                    {list}
                </Table>


            </div>
        );
    }
}

export default Cart;