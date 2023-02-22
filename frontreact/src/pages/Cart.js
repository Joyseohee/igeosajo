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
import CartPostAll from "../components/cart/CartPostAll";


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
                }, {
                    id: 5,
                    type: 'confirm',
                    text: "전체 항목을 승인신청 하시겠습니까??",
                    path: ""
                }

            ],
            available: 1,
            termyearmonth: '',
            pageNum: 1,
            pageCount: 1,
            items2: [],
            dates: [],
            message: ''
        };
        this.getlist = this.getlist.bind(this);
        this.props.setpagename("장바구니");
    }

    async componentDidMount() {
        this.getlist();
        this.checkterm();
    }


    async getlist() {

        const usernum = this.props.usernum;
        const pagenum = this.state.pageNum;


        try {
            let res2 = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum)
            let items2 = await res2.json();
            let res = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum + '&pagenum=' + pagenum);
            let items = await res.json();
            if (items2.length === 0) {
                await this.setState({
                    items: items,
                    pageCount: items2.length,
                    items2: items2,
                    message: '장바구니가 비었습니다.'
                });
            } else {
                if (items.length !== 0) {
                    await this.setState({
                        items2: items2,
                        items: items,
                        pageCount: items2.length,

                    });
                } else {
                    res2 = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum)
                    items2 = await res2.json();
                    res = await fetch('http://127.0.0.1:8000/api/cart?usernum=' + usernum + '&pagenum=' + (pagenum - 1));
                    items = await res.json();
                    await this.setState({
                        items: items,
                        pageCount: items2.length - 1,
                        pageNum: pagenum - 1,
                        items2: items2,

                    });
                }
            }


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
        let dates = this.state.dates
        new Api().read("reqterm", null, null)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                dates = response.filter(term => term.termyearmonth !== termyearmonth);
                available = response.filter(term => term.termyearmonth !== termyearmonth)[0].termavailable;
                this.setState({
                    available: available,
                    termyearmonth: termyearmonth,
                    dates: dates
                })
            });
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
            this.setState({pageNum: e, prodnumList: []}, () => {
                this.ref.current.checkcleanall();
                this.getlist();

            })
        }
    }


    render() {
        const {available} = this.state;

        return (
            <div>
                <Goal comment={"장바구니"}/>
                {available ? <div>
                    <div className='display_btn2'>
                        <DeleteCart style={{float: 'right'}} usernum={this.props.usernum}
                                    prodnumList={this.state.prodnumList}
                                    postcheck={this.postcheck}
                                    modalInfo={this.state.modalInfo}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <PostCartToRequest postcheck={this.postcheck} usernum={this.props.usernum}
                                           prodnumList={this.state.prodnumList}
                                           reqcountList={this.state.reqcountList}
                                           reqpriceList={this.state.reqpriceList}
                                           posted={this.state.posted}
                                           modalInfo={this.state.modalInfo}/>&nbsp;&nbsp;&nbsp;
                        <CartPostAll
                            items2={this.state.items2} postcheck={this.postcheck}
                            usernum={this.props.usernum}
                            posted={this.state.posted}
                            modalInfo={this.state.modalInfo}/></div>

                    <br/><br/>

                    <CartDetail items={this.state.items} func1={this.checksend1}
                                ref={this.ref}
                                message={this.state.message}
                                pagenum={this.state.pageNum}
                    />
                    <Paging
                        showNum={5}
                        pageNum={this.state.pageNum}
                        setPageNum={this.setPageNum}
                        pageCount={this.state.pageCount}
                    />
                </div> : <CheckPeriod items={this.state.dates}/>}
            </div>
        );
    }
}

export default Cart;