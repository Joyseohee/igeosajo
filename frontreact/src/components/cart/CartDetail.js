import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';


class CartDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodnumList: [],
            reqcountList: [],
            reqpriceList: [],
            prodnum2: []

        };
    }

    ref = React.createRef();
//선택
    choiceAll = () => {
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
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList

        }, () => {
            this.props.func1(
                this.state.prodnumList,
                this.state.reqcountList,
                this.state.reqpriceList)
        })
        console.log("=========================")
        console.log(prodnumList);
        console.log(reqcountList);
        console.log(reqpriceList);

    }

    choiceAll2 = () => {
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
            prodnum2: prodnum2
        }, () => {
            this.props.func2(this.state.prodnum2)
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
        this.setState({
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList

        }, () => {
            this.props.func1(this.state.prodnumList, this.state.reqpriceList, this.state.reqpriceList);
        })


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
        this.setState({
            prodnum2: prodnum2
        }, () => {
            this.props.func2(this.state.prodnum2);
        })
        console.log("=========================")
        console.log(prodnum2);


    }


    checkcleanall = () => {
        let prodnumList = this.state.prodnumList
        let reqcountList = this.state.reqcountList
        let reqpriceList = this.state.reqpriceList
        let prodnum2 = this.state.prodnum2

        const checkboxes1 = document.getElementsByName('select1');
        const checkboxes2 = document.getElementsByName('select2');
        const checkall1 = document.getElementsByName('selectAll1');
        const checkall2 = document.getElementsByName('selectAll2');

        checkboxes1.forEach((checkbox) => {
            checkbox.checked = false;
        })
        checkboxes2.forEach((checkbox) => {
            checkbox.checked = false;
        })
        checkall1.forEach((state) => {
            state.checked = false
        })
        checkall2.forEach((state) => {
            state.checked = false
        })
        prodnumList = [];
        reqcountList = [];
        reqpriceList = [];
        prodnum2 = [];

        this.setState({
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList,
            prodnum2: prodnum2
        })

    }

    render() {
        const {select} = this.state;
        // const usernum = this.props.usernum;
        //console.login(usernum);

        const list = this.props.items.map((list, idx) => (
            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select2"}
                                value={[list.prodnum]}
                                onChange={(e) => {
                                    this.choiceUnit2(e.target.checked, e.target.value);
                                }}/></td>

                <td><img src={list.prodimg}/></td>
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
            </tbody>))
        return (
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
        )
    }
}

export default CartDetail;