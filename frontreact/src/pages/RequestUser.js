import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";

let requestList = []
let requestList2 = ''
let cartcountList = []


class RequestUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],

            title: '',
            body: '',
            usernum: '',
        };
        this.props.setpagename("신청목록");

    }

    //post
    async handleClick() {
        const usernum = 1

        // const prodnum = requestList
        // const cartcount = cartcountList
        // console.log("pp:"+prodnum)
        // console.log("cc:"+cartcount)
        const response = await fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(requestList)

            body: JSON.stringify({
                "prodnum": requestList,
                "usernum": usernum,
                "cartcount": cartcountList
            }),
        });
        // const body = await response.json();

        console.log('this is:', this);


    }

    //delete
    async handleClick2() {
        // const usernum = '3'
        const reqnum = requestList
        //'5' + '1'
        console.log(reqnum)
        const response = await fetch('http://127.0.0.1:8000/api/request?reqnum=' + reqnum, {
            method: 'DELETE'
        });
        // const body = await response.json();

        console.log('this is:', this);
    }

    async componentDidMount() {

        const token = localStorage.getItem('secretcode');
        const decoded = jwt_decode(token);
        const usernum = decoded.usernum;
        this.setState({
            usernum: usernum
        })
        console.log(usernum)

        try {


            const res = await fetch('http://127.0.0.1:8000/api/request?usernum=' + usernum);

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
            requestList.push(val);

        } else {
            requestList.pop(val);
        }
        console.log(requestList);

    }


    render() {

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.reqnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.reqnum]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
                                }} disabled={list.reqstate == "대기" ? false : true}/></td>
                <td>{list.reqdate}</td>
                <td>{list.prodname}</td>
                <td>{list.reqcount}</td>
                <td>김연아</td>
                <td>{list.reqstate}</td>
                <td>{list.reqstaging}</td>
            </tr>
            </tbody>
        ))

        console.log(list);
        return (
            <div>
                <div><a>신청목록 </a>
                    <button className="btn btn-primary" onClick={this.handleClick2}>신청 취소
                    </button>


                </div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th><Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>신청날짜</th>
                        <th>상품이름</th>
                        <th>수량</th>
                        <th>상태</th>
                        <th>상태2</th>
                    </tr>
                    </thead>
                    {list}
                </Table>


            </div>
        );
    }
}


export default RequestUser;