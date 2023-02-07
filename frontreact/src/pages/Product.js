import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Counter from "../components/common/cartcount";
import jwt_decode from "jwt-decode";
import ProductDetail from "../components/product/ProductDetail";
import ProductPost from "../components/product/ProductPost";

//import parchase from "../../img/iconsparchase.png";


class Product extends Component {


    ref =React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            title: '',
            body: '',
            count: 0,
            data: {},
            productItemList2: [],
            productItemList: [],

            prodnumList: [],
            prodnumList2: [],
            cartcountList: [],
            posted: true
        };
        this.checksend = this.checksend.bind(this);
      //  this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.postcheck = this.postcheck.bind(this);
        this.getlist = this.getlist.bind(this)
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
    async componentDidMount() {

        await this.getlist()
    }

    async getlist() {

        const usernum = this.props.usernum;
        this.setState({
            usernum: usernum
        })
        console.log("usernum" + usernum)
        console.log("usernum2:" + this.props.usernum)

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
            console.log('pl2')

            console.log(productItemList[0].ccount)
            console.log('pl3')

        } catch (e) {
            console.log(e);
        }
    }

    postcheck = (posted) => {
        console.log(posted)
     if(posted === false){
           console.log('postcheck')
        this.ref.current.callcheck1(posted);
     }
      // })

    }

    // getlist = () => {
    //
    //     const usernum = this.props.usernum;
    //     this.setState({
    //         usernum: usernum
    //     })
    //     console.log("usernum" + usernum)
    //     console.log("usernum2:" + this.props.usernum)
    //
    //     try {
    //
    //         fetch("http://127.0.0.1:8000/api/product", {
    //             method: "GET",
    //         }).then(res => {
    //             return res.json();
    //         }).then(res => {
    //             this.setState({
    //                 items: res,
    //             })
    //         })
    //
    //
    //         console.log(">>>items", this.state.items)
    //         const productItemList = this.state.items.map((item) => {
    //             item.ccount = 0;
    //             return item
    //         })
    //
    //
    //         this.setState({
    //            productItemList: productItemList
    //         });
    //         console.log("pl")
    //         console.log(productItemList)
    //
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


    // componentDidUpdate = (prevState) => {
    //     console.log('업데이트 if 문 전')
    //     console.log(prevState) //true
    //
    //     //post예비 받아와서 1함수에 넘겨줘서 setState false->true
    //     //post 예비랑 비교하기, post랑 다르면 (true, false)
    //     //setState 로 post 예비를 post 에 넣기
    //     console.log(this.state.posted) //false
    //
    //     if (this.state.posted !== prevState) {
    //         console.log('업데이트!!!')
    //         this.setState({
    //             posted: prevState
    //         })
    //
    //         this.getlist();
    //         console.log('업데이트성공!!')
    //
    //     }
    //     console.log('업데이트후')
    //     console.log(prevState.posted)
    // }


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


    render() {
        console.log("prodnumListrrrr: " + this.state.prodnumList)

        console.log("productItemList2rrr: " + this.state.productItemList2)

        return (
            <div>
                <div><a>상품목록 </a>
                    <ProductPost productItemList2={this.state.productItemList2} prodnumList={this.state.prodnumList}
                                 usernum={this.props.usernum} posted={this.state.posted}
                                 postcheck={this.postcheck}/>
                    {/*<ProductPost productItemList2={this.state.productItemList2} prodnumList={this.state.prodnumList}*/}
                    {/*            usernum={this.props.usernum} posted={this.state.posted}*/}
                    {/*            componentDidUpdate={this.componentDidUpdate}/>*/}

                </div>
                <ProductDetail productItemList={this.state.productItemList} func1={this.checksend}
                               func2={this.cartsend} ref={this.ref}/>

            </div>
        );
    }
}


export default Product;