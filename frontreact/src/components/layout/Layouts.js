import React, {Component} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styled/Layouts.css"

class Layouts extends Component {
    constructor({children}) {
        super({children});
        console.log(children);
        console.log(React.Children.toArray(children));
        console.log(React.Children.toArray(children));
        this.state = {
            username: "",
            userdept: "",
            userposition: "",
            userathority: "",
            menus: [{
                name: "전자결재",
                path: "/",
            }]
        }
    }

    async componentDidMount() {
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + this.props.usernum, {
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
                        name: "사무용품 신청 관리", path: "/",
                        menu2: [{name: "신청기간 설정", path: "/reqterm"}, {name: "신청 관리", path: "/"}]
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
        const {menus} = this.state;
        const {pagename} = this.props;
        const children = this.props.children;
        console.log("**" + children);

        return (
            <div className="page-top">
                <Header pagename={pagename} state={this.state}/>
                <div className="container-content">
                    <Sidebar menus={menus}/>
                    <div className="container-main">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Layouts;
