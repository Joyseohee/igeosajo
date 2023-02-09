import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import jwt_decode from "jwt-decode";
import Layouts from "./components/layout/Layouts";
import Login from "./components/Login";
import Product from "./pages/Product";
import Reqterm from "./pages/Reqterm";
import RequestUser from "./pages/RequestUser";
import Cart from "./pages/Cart";
import Main from "./pages/Main";
import Request from "./pages/Request";
import DocRequest from "./pages/DocRequest";
import DocReqDetail from "./pages/DocReqDetail";
import DocPaymentDetail from "./pages/DocPaymentDetail";
import OrderReq from "./pages/OrderReq";
import OrderParchase from "./pages/OrderParchase";
import Order from "./pages/Order";
import DocPaymentList from "./pages/DocPaymentList";
import Api from "./api/Api";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: "fakenum",
            pagename: "페이지",
            logined: 'N',
        }
    }

    componentDidMount() {
        try {this.changeLogined(this.state.logined);} catch (e) {  }
    }

    setpagename = (pagename) => {
        this.setState({
            pagename: pagename,
        });
    }

    changeLogined = (logined) => {
        const token = localStorage.getItem('secretcode');
        const decoded = jwt_decode(token);
        const params = {usernum: decoded.usernum};
        new Api().read("user", params, null)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    user: response[0],
                    logined: logined,
                })
            })
    }

    render() {
        const {pagename, user} = this.state;
        const usernum = this.state.user.usernum;

        return (
            <>
                <Layouts user={user} pagename={pagename}>
                    <Switch>
                        {user === "fakenum" &&
                            <>
                                <Route exact path="/">
                                    <Login setpagename={() => this.setpagename()} changeLogined={this.changeLogined}/>
                                </Route>
                            </>
                        }
                        {user !== "fakenum" &&
                            <>
                                <Route exact path="/main">
                                    <Main user={user} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/cart">
                                    <Cart usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/product">
                                    <Product usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/requestuser">
                                    <RequestUser usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/request">
                                    <Request usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/reqterm">
                                    <Reqterm usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/order">
                                    <Order usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/orderreq">
                                    <OrderReq usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/orderparchase">
                                    <OrderParchase usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/docrequest">
                                    <DocRequest usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/docreqdetail">
                                    <DocReqDetail usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/docpaydetail">
                                    <DocPaymentDetail usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                                <Route exact path="/docpaylist">
                                    <DocPaymentList usernum={usernum} setpagename={this.setpagename}/>
                                </Route>
                            </>
                        }
                    </Switch>
                </Layouts>
            </>
        );
    }
}

export default App;

