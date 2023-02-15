import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteCart from "../components/cart/DeleteCart";
import PostCartToRequest from "../components/cart/PostCartToRequest";
import CartDetail from "../components/cart/CartDetail";
import Api from "../api/Api";
import '../styled/Cart.css';
import Paging from "../components/layout/Paging";
import Goal from "../components/Goal";
import CheckPeriod from "../components/userMainPage/CheckPeriod";


class Cart extends Component {
    ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            items: ['items'],
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
                    id: 3,
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
            available: 1,
            termyearmonth: '',
            pageNum: 1,
            pageCount: 1,
            dates:[]
        };
        this.getlist = this.getlist.bind(this);
        this.props.setpagename("사무용품 구매");
    }

    async componentDidMount() {
        this.getlist();
        this.checkterm();
    }


    async getlist() {

        const usernum = this.props.usernum;
        const pagenum = this.state.pageNum;


        try {
            const res2 = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum)
            const items2 = await res2.json();

            const res = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum + '&pagenum=' + pagenum);

            const items = await res.json();
            await this.setState({
                items: items,
                pageCount: items2.length
            });

        } catch (e) {
            console.log(e);
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

        // 신청기간 조회
        fetch('http://127.0.0.1:8000/api/reqterm/' + termyearmonth)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({dates: response})
            })
    }

    checksend1 = (res1, res2, res3) => {
        this.setState({
            prodnumList: res1,
            reqcountList: res2,
            reqpriceList: res3,
        })
    }

    // checksend2 = (res) => {
    //     this.setState({
    //         prodnum2: res
    //     })
    // }

    postcheck = () => {
        this.getlist();
        this.ref.current.checkcleanall();
        this.setState({
            prodnumList: [],
            reqcountList: [],
            reqpriceList: [],
            prodnum2: []
        })
    }
    setPageNum = (e) => {
        const pageNum = this.state.pageNum
        if (e !== pageNum) {
            const productItemList = [];
            this.setState({pageNum: e, productItemList: productItemList, prodnumList: []}, () => {
                this.ref.current.checkcleanall();
                this.getlist();

            })
        }
    }


    render() {
        const {available} =this.state;

        return (
            <div>
                <Goal comment={"장바구니"}/>
                {available ?<div>
                    <div className='display_btn2'>
                        <DeleteCart style={{float: 'right'}} usernum={this.props.usernum} prodnumList={this.state.prodnumList}
                                    postcheck={this.postcheck}
                                    modalInfo={this.state.modalInfo}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <PostCartToRequest postcheck={this.postcheck} usernum={this.props.usernum}
                                           prodnumList={this.state.prodnumList}
                                           reqcountList={this.state.reqcountList}
                                           reqpriceList={this.state.reqpriceList}
                                           posted={this.state.posted}
                                           modalInfo={this.state.modalInfo}/>&nbsp;&nbsp;&nbsp; </div>

                <br/><br/>

                <CartDetail items={this.state.items} func1={this.checksend1}
                            ref={this.ref}
                />
                <Paging
                    showNum={5}
                    pageNum={this.state.pageNum}
                    setPageNum={this.setPageNum}
                    pageCount={this.state.pageCount}
                />
    </div> :  <CheckPeriod items = {this.state.dates}/>}
            </div>
        );
    }
}

export default Cart;