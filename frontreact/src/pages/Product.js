import React, {Component} from 'react';
import ProductDetail from "../components/product/ProductDetail";
import ProductPost from "../components/product/ProductPost";
import Search from "../components/product/Search";
import ProductFilter from "../components/product/ProductFilter";
import Api from "../api/Api";
import Paging from "../components/layout/Paging";
import "../styled/Product.css";
import Goal from "../components/Goal";



class Product extends Component {


    ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            count: 0,
            prodname: '',
            category2code: '',
            category1code: '',
            productItemList: [],
            prodnumList: [],
            prodnumList2: [],
            cartcountList: [],
            posted: false,
            gocart: false,
            modalInfo: [
                {
                    id: 1,
                    type: 'confirm',
                    text: "선택하신 물품을 장바구니에 담으시겠습니까?",
                    path: ''

                },
                {
                    id: 2,
                    type: 'move',
                    text: "장바구니에 담았습니다." +
                        "장바구니로 이동하시겠습니까?",
                    path: "/cart"
                },
                {
                    id: 3,
                    type: 'alert',
                    text: "선택한 물품이 없습니다.",
                    path: ''
                }
            ],
            available: 1,
            termyearmonth: '',
            pageNum: 1,
            pageCount: 1,
            items2: []
        };
        this.checksend = this.checksend.bind(this);
        this.postcheck = this.postcheck.bind(this);
        this.getlist = this.getlist.bind(this);
        this.checkterm = this.checkterm.bind(this)
        this.props.setpagename("상품목록");

    }

    async componentDidMount() {
        this.checkterm();
        await this.getlist();
    }

    checkterm() {
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

    async getlist() {

        const category1code = this.state.category1code;
        const category2code = this.state.category2code;
        const prodname = this.state.prodname;
        const pagenum = this.state.pageNum;

        try {
            let url = 'http://127.0.0.1:8000/api/product?';
            if (category1code !== '') {
                url += '&category1code=' + category1code
            }
            if (category2code !== '') {
                url += '&category2code=' + category2code
            }
            if (prodname !== '') {
                url += '&prodname=' + prodname
            }

            const res = await fetch(url);
            const items2 = await res.json();

            url += '&pagenum=' + pagenum;
            const res2 = await fetch(url);
            const items = await res2.json();
            const productItemList = items.map((item) => {
                item.ccount = 0;
                return item
            })

            await this.setState({
                productItemList: productItemList,
                pageCount: items2.length
            });
        } catch (e) {
            console.log(e);
        }
    }

    postcheck = (posted) => {

        const {productItemList} = this.state;
        const newProductItemList = productItemList.map((item) => {

            item.ccount = 0
            this.ref.current.checkcleanall();
            return item
        })

        this.setState({
            productItemList: newProductItemList,
            prodnumList: []
        })
    }


    checksend = (res) => {
        this.setState({
            prodnumList: res
        })
    }

    handleIncrease = (prodnum) => {

        const {productItemList} = this.state;
        const newProductItemList = productItemList.map((item) => {
            if (item.prodnum === prodnum) {
                item.ccount = item.ccount + 1
            }
            return item
        })

        this.setState({
            productItemList: newProductItemList
        })
    }
    handleDecrease = (prodnum) => {

        const {productItemList} = this.state;
        const newProductItemList = productItemList.map((item) => {
            if (item.prodnum === prodnum) {
                if (item.ccount < 1) {
                    item.ccount = 0
                } else {
                    item.ccount = item.ccount - 1
                }
            }
            return item
        })

        this.setState({
            productItemList: newProductItemList
        })
    }

    callbackSearch = (res) => {
        this.setState({
                prodname: res
            },
            () => this.getlist())
    }

    callbackFilter = (res1, res2) => {
        this.setState({
                category1code: res1,
                category2code: res2
            },
            () => this.getlist())
    }
    setPageNum = (e) => {
        const pageNum = this.state.pageNum
        if (e !== pageNum) {
            const productItemList = [];
            const prodnumList = [];
            this.setState({pageNum: e, productItemList: productItemList, prodnumList: prodnumList}, () => {
                this.ref.current.checkcleanall();
                this.getlist();
            })
        }

    }


    render() {
        const {
            prodnumList
        } = this.state
        return (
            <div>
                <Goal comment={"물품보기"}/> <br/>
                <div><div style={{float: "left"}}> <Search callbackSearch={this.callbackSearch}/></div>
                    <div style={{float: "right"}} className="display_btn"><ProductPost postcheck={this.postcheck}
                                              productItemList={this.state.productItemList}
                                              prodnumList={prodnumList}
                                              usernum={this.props.usernum}
                                              modalInfo={this.state.modalInfo}/>
                    &nbsp;&nbsp;&nbsp;
                        <ProductFilter callbackFilter={this.callbackFilter}/></div></div>

                <br/><br/><br/>
                <ProductDetail productItemList={this.state.productItemList}
                               prodnumList={this.state.prodnumList}
                               usernum={this.props.usernum}
                               func1={this.checksend}
                               ref={this.ref}
                               callback1={{handleIncrease: this.handleIncrease}}
                               callback2={{handleDecrease: this.handleDecrease}}
                               modalInfo={this.state.modalInfo}
                               postcheck={this.postcheck}
                />
                <Paging
                    pageNum={this.state.pageNum}
                    setPageNum={this.setPageNum}
                    pageCount={this.state.pageCount}
                />

            </div>
        );
    }
}


export default Product;