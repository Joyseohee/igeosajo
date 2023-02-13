import React, {Component} from 'react';
import ProductDetail from "../components/product/ProductDetail";
import ProductPost from "../components/product/ProductPost";
import Search from "../components/product/Search";
import ProductFilter from "../components/product/ProductFilter";
import Api from "../api/Api";
import Paging from "../components/layout/Paging";
import "../styled/Product.css";

//import parchase from "../../img/iconsparchase.png";


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
            data: {},
            productItemList2: [],
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
            termyearmonth: ''
        };
        this.checksend = this.checksend.bind(this);
        //  this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.postcheck = this.postcheck.bind(this);
        this.getlist = this.getlist.bind(this);
        this.checkterm = this.checkterm.bind(this)
        this.props.setpagename("상품목록");

    }


    //post
    async componentDidMount() {

        await this.getlist();
        this.checkterm();
    }

    checkterm() {
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        const termyearmonth = year + '' + month
        console.log('termyearmonth:' + termyearmonth)

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

        const usernum = this.props.usernum;
        const category1code = this.state.category1code;
        const category2code = this.state.category2code;
        const prodname = this.state.prodname;


        console.log("usernum" + usernum)
        console.log("usernum2:" + this.props.usernum)

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
            console.log('pl2')

            console.log(productItemList[0].ccount)
            console.log('pl3')

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
        // var {prodnumList} = this.state;
        console.log("checksend:" + res)

        this.setState({
            prodnumList: res
        })
        // console.log("prodnumList: " + prodnumList)
        console.log("prodnumList: " + this.state.prodnumList)

    }
    cartsend = (res) => {
        console.log("cartsend:" + res)
        this.setState({
            productItemList2: res
        }, () => {
            console.log("productItemList2 id: " + this.state.productItemList2);
        });
        // console.log("json" + JSON.stringify(this.state.productItemList2))
        console.log("productItemList2 id: " + this.state.productItemList2)
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
        this.setState({pageNum: e})

        if (this.state.listState === "allselect") {
            fetch('http://127.0.0.1:8000/api/document?checkDetail=1&pagenum=' + String(e))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })

        } else {
            fetch('http://127.0.0.1:8000/api/document?state=' + this.state.listState + '&checkDetail=1&pagenum=' + String(e))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })
        }
    }


    render() {
        console.log("prodnumListrrrr: " + this.state.prodnumList)

        console.log("productItemList2rrr: " + this.state.productItemList2)
        const {
            posted,
            available
        } = this.state
        console.log('available: ' + available)
        return (
            <div>
            <a>상품목록 </a> <br/>
                    <div className="display_btn"><Search callbackSearch={this.callbackSearch}/>
                        {available ? <ProductPost postcheck={this.postcheck}
                                              productItemList={this.state.productItemList}
                                              prodnumList={this.state.prodnumList}
                                              usernum={this.props.usernum}
                                              modalInfo={this.state.modalInfo}/> : '현재는 신청기간이 아닙니다. 장바구니 담기가 불가능 합니다'}
                        &nbsp;&nbsp;&nbsp;
                        <ProductFilter callbackFilter={this.callbackFilter}/> </div>

<br/><br/><br/>
                <ProductDetail productItemList={this.state.productItemList}
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
                    pageCount={this.state.pageCount}/>

            </div>
        );
    }
}


export default Product;