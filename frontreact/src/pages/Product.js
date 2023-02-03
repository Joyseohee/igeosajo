import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Counter from "../components/cart/cartcount";
import jwt_decode from "jwt-decode";


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            title: '',
            body: '',
            count: 0,
            data: {},
            productItemList2: [{
                id: 0,
                count: 0
            }],
            productItemList: [],
            usernum: '',
            prodnumList: [],
            prodnumList2: [],
            cartcountList: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);

        this.cartcount = this.cartcount.bind(this);
        this.choiceAll = this.choiceAll.bind(this);


        this.props.setpagename("상품목록");

    }

    // handleCheck = (e) => {
    //     let check = this.state.checkedItems.findIndex(item => item === e.target.value);
    //     if (check === -1) {
    //         this.state.checkedItems.push(e.target.value);
    //         this.setState({
    //             checkedItems: this.state.checkedItems,
    //         })
    //     } else {
    //         if (check > -1) this.state.checkedItems.splice(check, 1);
    //         this.setState({
    //             checkedItems: this.state.checkedItems,
    //         })
    //     }
    //     this.props.storeChecked(this.state.checkedItems);
    // }

    //post
    handleClick() {
        let prodnumList = this.state.prodnumList
        let cartcountList = this.state.cartcountList
        let prodnumList2 = this.state.prodnumList2


        for (let i = 0; i < prodnumList.length; i++) {
            console.log('post1')
            var returnValue = this.state.productItemList2.find(function (data) {
                return data.id === prodnumList[i]
            });
            console.log('post2')

            if (returnValue) {
                prodnumList2.push(returnValue.id);
                cartcountList.push(returnValue.count);
            }
        }
        console.log('post3')

        const response = fetch('http://127.0.0.1:8000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "prodnum": prodnumList2,
                "usernum": this.state.usernum,
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
            const res = await fetch('http://127.0.0.1:8000/api/product');
            const items = await res.json();

            console.log(">>>items", items)
            const productItemList = items.map((item) => {
                item.ccount = 0;
                return item
            })


            this.setState({
                productItemList
            });
            console.log("pl")
            console.log(productItemList)
            console.log(productItemList[0].ccount)
        } catch (e) {
            console.log(e);
        }
    }

    choiceAll() {
        let prodnumList = this.state.prodnumList


        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            if (selectAll[0].checked) {
                prodnumList.push(parseInt(checkbox.value));
                this.setState({
                    prodnumList: prodnumList
                })
            } else {
                console.log("else1")
                prodnumList = [];
                this.setState({
                    prodnumList: prodnumList
                })
            }
        })
        console.log(prodnumList);
    }

    choiceUnit(check, val) {

        const prodnumList = this.state.prodnumList
        console.log("unit list2")

        if (check) {

            console.log("unit val")
            console.log(val);


            prodnumList.push(parseInt(val))
            //cartcountList.push(parseInt(returnValue.count));
            console.log(prodnumList)
            // console.log(cartcountList)

        } else {
            const prodnumList = this.state.prodnumList
            console.log('else1')
            for (let i = 0; i < prodnumList.length; i++) {
                console.log('else2')

                if (prodnumList[i] === parseInt(val)) {
                    console.log('else3')

                    prodnumList.splice(i, 1);
                    break;
                }
            }

            this.setState({
                prodnumList: prodnumList
            })
            console.log("1: " + prodnumList)

            // console.log("2"+pprodnumList)
        }

        console.log(prodnumList);

    }

    cartcount = (res, res2) => {
        var {productItemList2} = this.state;
        console.log("cartfunc")
        console.log("count:" + res)
        console.log("prodnum:" + res2)
        console.log("빼기전")
        console.log(productItemList2)
        // console.log(pk)
        productItemList2 = productItemList2.filter((productItemList2) => productItemList2.id !== res2);

        productItemList2.push({
            id: res2,
            count: res,
        });

        this.setState({
            productItemList2: productItemList2
        })
        console.log("뺸후")
        console.log(productItemList2)

        console.log("더한후")
        console.log(productItemList2[res2])
        console.log(productItemList2)
        // return {
        //     productItemList2
        //
        // }


//         this.setState({
// //productItemList.filter((productItemList) => productItemList.id !== res)
//               //  productItemList: productItemList.filter((productItemList) => productItemList.id !== res)
// //
// //             productItemList: productItemList.concat({
// //                 id: this.state.nextId,
// //                 count: this.state.inputText,
// //             }),
// //             inputText: "",
// //             nextId: this.state.nextId + 1
// //
// //
//             }
// //
// //
//         )
        //{data: "test"} 가 찍힙니다
    }

    render() {

        let list = this.state.productItemList.map((list, idx) => (

            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.prodnum]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
                                }}/></td>
                <td>{list.prodname}</td>
                <td>{list.prodnum}</td>
                <td>{list.prodimg}</td>
                <td>{list.prodprice}</td>
                <td><Counter func={this.cartcount}
                             data={list.prodnum}></Counter>
                </td>
            </tr>


            </tbody>


        ))
        console.log("list")
        console.log(list);
        // console.log(list.prodnum);
        //console.log(list[0].count);

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
                        <th>수량</th>
                    </tr>
                    </thead>
                    {list}
                </Table>

            </div>
        );
    }
}


export default Product;