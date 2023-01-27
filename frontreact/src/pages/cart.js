import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";

let requestList =''

class Hello extends Component {
    state = {
        items: [],
        select: "False",

    };

    async handleClick() {
        const usernum = '7'
        const prodnum = requestList
        //'5' + '1'
        console.log(prodnum)
        const response = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum + '&prodnum=' + prodnum, {
            method: 'DELETE'
        });
        // const body = await response.json();

        console.log('this is:', this);
    }

    async componentDidMount() {
        try {
            console.log('dsd');

            const res = await fetch('http://127.0.0.1:8000/api/cart?usernum=7');

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
            requestList += val.toString();
        } else {
            requestList -= val.toString();
        }
        console.log(requestList);
    }

    render() {
        const {select} = this.state;
        const usernum = this.props.usernum;
        console.log(usernum);

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={list.prodnum}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
                                }}/></td>

                <td>{list.prodname}</td>
                <td>{list.prodprice}</td>
                <td>{list.cartcount}</td>
            </tr>
            </tbody>
        ))
        console.log(list);
        return (
            <div>
                    <div><a>장바구니 </a>
                        <button className="btn btn-primary">승인신청</button>
                        <button onClick={this.handleClick}>삭제</button>
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


export default Hello;