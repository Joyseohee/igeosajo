import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Counter from '../components/product/Productcount';
import jwt_decode from "jwt-decode";
import DeleteCart from "../components/cart/DeleteCart";
import PostCartToRequest from "../components/cart/PostCartToRequest";
import ProductDetail from "../components/product/ProductDetail";
import CartDetail from "../components/cart/CartDetail";
import Api from "../api/Api";


class Cart extends Component {
    ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            select: "False",
            posted: false,
            prodnumList: [],
            reqpriceList: [],
            reqcountList: [],
            prodnum2: [],
            modalInfo: [
                {
                    id: 1,
                    type: 'confirm',
                    text: "선택하신 항목을 신청하시겠습니까?",
                    path: ''

                },
                {
                    id: 2,
                    type: 'move',
                    text: "신청 내역을 확인하시겠습니까?",
                    path: "/requestuser"
                }, {
                    id:3,
                    type: 'alert',
                    text: "선택한 물품이 없습니다.",
                    path: ''
                },
                {
                    id: 4,
                    type: 'confirm',
                    text: "선택하신 항목을 장바구니에서 삭제하시겠습니까??",
                    path: ""
                }
            ],
            available: 0,
            termyearmonth: ''
        };

        // this.handleClick2 = this.handleClick2.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.choiceAll = this.choiceAll.bind(this);
        this.getlist = this.getlist.bind(this);

        // this.choiceAll2 = this.choiceAll2.bind(this);
        // this.choiceUnit = this.choiceUnit.bind(this);
        // this.choiceUnit2 = this.choiceUnit2.bind(this);

        this.props.setpagename("장바구니");
    }


    //get
    async componentDidMount() {
        this.getlist();
        this.checkterm();


    }

    async getlist() {

        const usernum = this.props.usernum;


        try {
            console.log('dsd');

            const res = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum);

            const items = await res.json();
            await this.setState({
                items
            });
            console.log(items)
            console.log('getlist')
        } catch (e) {
            console.log(e);
            console.log('dsd');
        }
    }

    checkterm = () => {
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        const termyearmonth = year + '' + month

        let available = this.state.available
        new Api().read("reqterm", null, null)
            .then((response) => {
                return response.json();
            })
            .then((response) => {

                available = response.filter(term => term.termyearmonth !== termyearmonth)[0].termavailable;
                this.setState({
                    available: available,
                    termyearmonth: termyearmonth
                })
            });
    }

    //선택
    checksend1 = (res1, res2, res3) => {
        // var {prodnumList} = this.state;
        console.log("checksend:" + res1)

        this.setState({
            prodnumList: res1,
            reqcountList: res2,
            reqpriceList: res3,

        })
        // console.log("prodnumList: " + prodnumList)
        console.log("prodnumList: " + this.state.prodnumList)
        console.log("reqpriceList: " + this.state.reqpriceList)
        console.log("reqpriceList: " + this.state.reqpriceList)

    }

    //삭제
    checksend2 = (res) => {
        // var {prodnumList} = this.state;
        console.log("checksend:" + res)

        this.setState({
            prodnum2: res
        })
        // console.log("prodnumList: " + prodnumList)
        console.log("prodnumList: " + this.state.prodnum2)

    }

    postcheck = () => {
        this.getlist();
        this.ref.current.checkcleanall();
        this.setState({
            prodnumList: [],
            reqcountList: [],
            reqpriceList: [],
            prodnum2: []
        })
        // console.log('postcheck')
        //
        // this.setState({
        //     posted: true
        // }, () => {
        //     this.getlist();
        // });

    }

    render() {
        const {select, available} = this.state;
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
                    {available ?
                        <div><PostCartToRequest postcheck={this.postcheck} usernum={this.props.usernum}
                                                prodnumList={this.state.prodnumList}
                                                reqcountList={this.state.reqcountList}
                                                reqpriceList={this.state.reqpriceList}
                                                posted={this.state.posted} modalInfo={this.state.modalInfo}/>
                            <DeleteCart usernum={this.props.usernum} prodnum2={this.state.prodnum2}
                                        postcheck={this.postcheck}
                                        modalInfo={this.state.modalInfo}/>
                        </div> : '현재 신청기간이 아닙니다. 신청 및 장바구니 삭제가 불가능합니다.'}
                </div>
                <CartDetail items={this.state.items} func1={this.checksend1}
                            func2={this.checksend2}
                            ref={this.ref}
                />
            </div>
        );
    }
}

export default Cart;