import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Reqterm from "./pages/Reqterm";
import "bootstrap/dist/css/bootstrap.css";
import Layouts from "./components/layout/Layouts";
import Request from "./pages/Request";

// let pagename="";
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
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + this.state.usernum, {
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
                        path: "/",
                    }]
                });
            } else if (this.state.userathority === 1) {
                this.setState({
                    menus: [{
                        name: "사무용품 신청 관리",
                        menu2: [{name: "신청기간 설정", path: "/reqterm"}, {name: "신청 관리", path: "/request"}]
                    }, {
                        name: "전자결재", path: "/",
                        menu2: [{name: "전자 결재 작성", path: "/"}, {name: "전자 결재 목록", path: "/"}]
                    }, {
                        name: "사무용품 구매", path: "/",
                        menu2: [{name: "구매 신청", path: "/"}, {name: "구매 진행 현황", path: "/"}]
                    }]
                });
            } else if (this.state.userathority === 2) {
                this.setState({
                    menus: [{
                        name: "사무용품 구매",
                        path: "/",
                        menu2: [{name: "물품보기", path: "/"}, {name: "장바구니", path: "/"}]
                    }, {name: "사무용품 신청 내역", path: "/"}]
                });
            }
        }
    }

    render() {
        return (
            <div>
                {(this.state.userathority !== 3 && this.state.menus !== 1) &&
                    <Layouts userinfo={this.state} pagename={this.state.pagename}>
                        <Routes>
                            <Route path="/" element={<Home setpagename={this.setpagename}/>}/>
                            <Route exact path="/reqterm" element={<Reqterm setpagename={this.setpagename}/>}/>
                            <Route exact path="/request" element={<Request setpagename={this.setpagename}/>}/>
                        </Routes>
                    </Layouts>}
            </div>
        );
    }
}

export default App;
