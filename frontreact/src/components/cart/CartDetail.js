import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import '../../styled/Cart.css';
import CommonUtil from "../../util/CommonUtil";

class CartDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodnumList: [],
            reqcountList: [],
            reqpriceList: [],
            // prodnum2: [],

            items: ['hello']
        };
    }

    ref = React.createRef();
    choiceAll = () => {
        let prodnumList = [];
        let reqcountList = [];
        let reqpriceList = [];

        const checkboxes = document.getElementsByName('select1');
        let selectAll = document.getElementsByName('selectAll1');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            if (selectAll[0].checked) {

                var valSplit = checkbox.value.split(',');
                prodnumList.push(parseInt(valSplit[0]));
                reqcountList.push(parseInt(valSplit[1]));
                reqpriceList.push(parseInt(valSplit[2]) * parseInt(valSplit[1]));
            }
        })

        this.setState({
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList

        }, () => {
            console.log(prodnumList)
               console.log(reqcountList)
               console.log(reqpriceList)

            this.props.func1(
                this.state.prodnumList,
                this.state.reqcountList,
                this.state.reqpriceList)
        })
    }

    // choiceAll2 = () => {
    //     let prodnum2 = [];
    //     const checkboxes = document.getElementsByName('select2');
    //     let selectAll = document.getElementsByName('selectAll2');
    //
    //     checkboxes.forEach((checkbox) => {
    //         checkbox.checked = selectAll[0].checked;
    //         if (selectAll[0].checked) {
    //             prodnum2.push(parseInt(checkbox.value));
    //         }
    //     })
    //     this.setState({
    //         prodnum2: prodnum2
    //     }, () => {
    //         this.props.func2(this.state.prodnum2)
    //     })
    // }

    choiceUnit(check, val1, val2, val3) {
        const prodnumList = this.state.prodnumList;
        const reqcountList = this.state.reqcountList;
        const reqpriceList = this.state.reqpriceList;
        console.log(check)
        console.log(val1);
        console.log(val2);
        console.log(val3);

        if (check) {
            prodnumList.push(parseInt(val1));
            reqcountList.push(parseInt(val2));
            reqpriceList.push(parseInt(val3) * parseInt(val2));
            console.log(prodnumList)
            console.log(reqcountList)
            console.log(reqpriceList)
        } else {
            for (let i = 0; i < prodnumList.length; i++) {

                if (prodnumList[i] === val1) {
                    console.log("here")
                    prodnumList.splice(i, 1);
                    reqcountList.splice(i, 1);
                    reqpriceList.splice(i, 1);
                    break;
                }
            }
        }
        console.log(prodnumList)
        this.setState({
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList

        }, () => {
            this.props.func1(this.state.prodnumList, this.state.reqcountList, this.state.reqpriceList);
        })
    }

    // choiceUnit2(check, val) {
    //     const prodnum2 = this.state.prodnum2;
    //     if (check) {
    //         prodnum2.push(val);
    //     } else {
    //         for (let i = 0; i < prodnum2.length; i++) {
    //             if (prodnum2[i] == val) {
    //                 prodnum2.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }
    //     this.setState({
    //         prodnum2: prodnum2
    //     }, () => {
    //         this.props.func2(this.state.prodnum2);
    //     })
    // }

    checkcleanall = () => {

        const checkboxes1 = document.getElementsByName('select1');
        //  const checkboxes2 = document.getElementsByName('select2');
        const checkall1 = document.getElementsByName('selectAll1');
        //   const checkall2 = document.getElementsByName('selectAll2');

        checkboxes1.forEach((checkbox) => {
            checkbox.checked = false;
        })
        // checkboxes2.forEach((checkbox) => {
        //     checkbox.checked = false;
        // })
        checkall1.forEach((state) => {
            state.checked = false
        })
        // checkall2.forEach((state) => {
        //     state.checked = false
        // })
        let prodnumList = []
        let reqcountList = []
        let reqpriceList = []
        // let prodnum2 = []

        this.setState({
            prodnumList: prodnumList,
            reqcountList: reqcountList,
            reqpriceList: reqpriceList,
            //    prodnum2: prodnum2
        })
    }

    setList = (items) => {
        return (
            items.map((list, idx) => (

                <tbody key={list.prodnum}>
                <tr>
                    <td className='cartth2'>{idx + 1}</td>
                    <td className='cartth1'><img className='img2' src={list.prodimg}/></td>
                    <td className='cartth3'>{list.prodname}</td>
                    <td className='cartth5'>\ {new CommonUtil().numberComma(list.prodprice)}</td>
                    <td className='cartth4'>{list.cartcount}</td>
                    <td className='cartth4'>{list.prodnum}</td>
                    {/*<td><Form.Check aria-label="option 1" name={"select2"}*/}
                    {/*                value={[list.prodnum]}*/}
                    {/*                onChange={(e) => {*/}
                    {/*                    this.choiceUnit2(e.target.checked, e.target.value);*/}
                    {/*                }}/></td>*/}
                    <td><Form.Check aria-label="option 1" name={"select1"}
                                    value={[list.prodnum ,list.cartcount, list.prodprice]}
                                    onChange={(e) => {
                                        this.choiceUnit(e.target.checked, list.prodnum, list.cartcount, list.prodprice);
                                    }}/></td>
                </tr>
                </tbody>
            ))

        )
    }


    render() {
        let list
        if (this.props.items.length !== 0) {
            list = this.setList(this.props.items)
        }

        return (
            <div>
                <Table bordered className='table1'>
                    <thead>
                    <tr className='doclistTh tr11'>

                        <th>No</th>
                        <th>이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>상품코드</th>
                        <th><span>선택</span>&nbsp;&nbsp;<Form.Check style={{display: "inline-block"}}
                                                                   aria-label="option 1" name={"selectAll1"}
                                                                   onClick={this.choiceAll}/></th>
                    </tr>
                    </thead>
                    {list}
                </Table>
                <div className='nonefoundmsg'>{this.props.message}<br/></div>
            </div>
        )
    }
}

export default CartDetail;