import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import jwt_decode from "jwt-decode";
import Main from "./pages/Main";
import Request from "./pages/Request";
import Reqterm from "./pages/Reqterm";
import Login from "./components/Login";
import Layouts from "./components/layout/Layouts";


class App extends Component {
    constructor() {
        super();
        this.state = {
            usernum: "fakenum",
            pagename: "username",
            logined: 'N',
        }
        this.changePagename = this.changePagename.bind(this);
        this.changeLogined = this.changeLogined.bind(this);
    }

    changePagename(pagename) {
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
                                    <Login changePagename={this.changePagename} changeLogined={this.changeLogined}/>
                                </Route>
                            </>
                        }
                        {this.state.usernum !== "fakenum" &&
                            <>
                                <Route exact path="/main">
                                    <Main usernum={usernum} changePagename={this.changePagename}/>
                                </Route>
                                <Route exact path="/request">
                                    <Request usernum={usernum} changePagename={this.changePagename}/>
                                </Route>
                                <Route exact path="/reqterm">
                                    <Reqterm usernum={usernum} changePagename={this.changePagename}/>
                                </Route>
                            {/*  일반 페이지 라우팅  */}
                            </>
                        }
                    </Switch>
                </Layouts>
            </>
        );
    }
}

export default App;

