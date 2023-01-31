import React, {Component} from "react";
import {Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Reqterm from "./pages/Reqterm";
import RequestUser from "./pages/RequestUser";
import Hello from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.css";
import Order from "./pages/Order";
import OrderReq from "./pages/OrderReq";
import Layouts from "./components/layout/Layouts";
import Request from "./pages/Request";
import Login from "./components/Login";
import DocRequest from "./pages/DocRequest";
import DocReqDetail from "./pages/DocReqDetail";
import jwt_decode from "jwt-decode";


class App extends Component {
    constructor() {
        super();
        this.state = {
            usernum: "2",
            username: "",
            userdept: "",
            userposition: "",
            userathority: 3,
            menus: 1,
            setting: 0,
            pagename: 0,
        }
    }

    setpagename = (pagename) => {
        this.setState({
            pagename: pagename,
        })
    }

    async componentDidMount() {
        const token = localStorage.getItem('secretcode');
        const decoded = jwt_decode(token);
        const usernum = decoded.usernum;
        console.log(usernum);
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + usernum, {
            method: "GET",
        });
        const data = await response.json();
        this.setState({
            username: data[0].username,
            userdept: data[0].userdept,
            userposition: data[0].userposition,
            userathority: data[0].userathority,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.pagename !== this.state.pagename) {
            this.setState({
                pagename: this.state.pagename,
            });
        }
        if (prevState.userathority !== this.state.userathority) {
            if (this.state.userathority === 0) {
                this.setState({
                    menus: [{
                        name: "전자결재",
                        path: "/docrequest",
                    }]
                });
            } else if (this.state.userathority === 1) {
                this.setState({
                    menus: [{
                        name: "사무용품 신청 관리",
                        menu2: [{name: "신청기간 설정", path: "/reqterm"}, {name: "신청 관리", path: "/request"}]
                    }, {
                        name: "전자결재",
                        menu2: [{name: "전자 결재 작성", path: "/docrequest"}, {name: "전자 결재 목록", path: "/"}]
                    }, {
                        name: "사무용품 구매",
                        menu2: [{name: "구매 신청 목록", path: "/orderreq"}, {name: "구매 진행 현황", path: "/order"}]
                    }]
                });
            } else if (this.state.userathority === 2) {
                this.setState({
                    menus: [{
                        name: "사무용품 구매",
                        menu2: [{name: "물품보기", path: "/product"}, {name: "장바구니", path: "/cart"}]
                    }, {name: "사무용품 신청 내역", path: "/requestuser"}]
                });
            }
        }
    }


    render() {
        console.log(this.state.userathority);
        return (
            <div>
                <Routes><Route path="/" element={<Login setpagename={this.setpagename}/>}/></Routes>
                {(this.state.userathority !== 3 && this.state.menus !== 1) &&
                    <Layouts userinfo={this.state} pagename={this.state.pagename}>
                        <Routes>
                            <Route path="/home/*" element={<Home setpagename={this.setpagename}/>}/>
                            <Route path="/cart/:usernum" element={<Hello setpagename={this.setpagename}/>}/>
                            <Route path="/product" element={<Product setpagename={this.setpagename}/>}/>
                            <Route path="/requestuser" element={<RequestUser setpagename={this.setpagename}/>}/>
                            <Route path="/reqterm/*" element={<Reqterm setpagename={this.setpagename}/>}/>
                            <Route path="/request/*" element={<Request setpagename={this.setpagename}/>}/>
                            <Route exact path="/docrequest" element={<DocRequest setpagename={this.setpagename}/>}/>
                            <Route exact path="/docreqdetail" element={<DocReqDetail setpagename={this.setpagename}/>}/>
                            <Route exact path="/order" element={<Order setpagename={this.setpagename}/>}/>
                            <Route path="/orderreq" element={<OrderReq setpagename={this.setpagename}/>}/>
                        </Routes>
                    </Layouts>
                }

            </div>
        );
    }
}

export default App;

