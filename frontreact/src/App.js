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


class App extends Component {
    constructor() {
        super();
        this.state = {
            usernum: "fakenum",
            pagename: "username",
            logined: 'N',
        }
        this.setpagename = this.setpagename.bind(this);
        this.changeLogined = this.changeLogined.bind(this);
    }

    setpagename(pagename) {
        this.setState({
            pagename: pagename,
        });
    }

    changeLogined(logined) {
        this.setState({
            logined: logined,
        });
    }

    componentDidMount() {
        try {
            const token = localStorage.getItem('secretcode');
            const decoded = jwt_decode(token);
            this.setState((state) => ({
                logined: state.logined,
                usernum: decoded.usernum,
            }))
            this.setState((state) => ({
                pagename: state.pagename,
            }))
        } catch (e) {
            console.error(e);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.logined !== this.state.logined) {
            const token = localStorage.getItem('secretcode');
            const decoded = jwt_decode(token);
            this.setState((state) => ({
                logined: state.logined,
                usernum: decoded.usernum,
            }))
        }
        if (prevState.pagename !== this.state.pagename) {
            this.setState((state) => ({
                pagename: state.pagename,
            }))
        }
    }


    render() {
        const {pagename, usernum} = this.state;
        return (
            <>
                <Layouts usernum={usernum} pagename={pagename}>
                    <Switch>
                        {this.state.usernum === "fakenum" &&
                            <>
                                <Route exact path="/">
                                    <Login setpagename={this.setpagename} changeLogined={this.changeLogined}/>
                                </Route>
                            </>
                        }
                        {this.state.usernum !== "fakenum" &&
                            <>
                                <Route exact path="/main">
                                    <Main usernum={usernum} setpagename={this.setpagename}/>
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
                            </>
                        }
                    </Switch>
                </Layouts>
            </>
        );
    }
}
export default App;

