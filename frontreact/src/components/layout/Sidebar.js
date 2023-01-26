import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./Sidebar.css";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userathority: 2,
            menus: [{name: "사무용품 구매", path: "/"}]
        };
        // console.log(userathority);
    }

    async componentDidMount() {
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=2", {
            method: "GET",
        });
        const data = await response.json();
        this.setState({
            userathority: data[0].userathority,
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.userathority == 0) {
            this.setState({
                menus: [{
                    name: "전자결재",
                    path: "/",
                }]
            });
        } else if (prevState.userathority == 1) {
            this.setState({
                menus: [{
                    name: "사무용품 신청 관리", path: "/",
                    menu2: [{name: "신청기간 설정", path: "/"}, {name: "신청 관리", path: "/"}]
                }, {
                    name: "전자결재", path: "/",
                    menu2: [{name: "전자 결재 작성", path: "/"}, {name: "전자 결재 목록", path: "/"}]
                }, {
                    name: "사무용품 구매", path: "/",
                    menu2: [{name: "구매 신청", path: "/"}, {name: "구매 진행 현황", path: "/"}]
                }]
            });
        } else if (prevState.userathority == 2) {
            this.setState({
                menus: [{
                    name: "사무용품 구매",
                    path: "/",
                    menu2: [{name: "물품보기", path: "/"}, {name: "장바구니", path: "/"}]
                }, {name: "사무용품 신청 내역", path: "/"}]
            });
        }
    }

    render() {
        let {menus} = this.state;
        console.log(menus)
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="menu-wrapper">
                        {menus.map((menu) => {
                            return (
                                <>
                                    <div className="menu1"><a href={menu.path}>{menu.name}</a></div>
                                    {menu.menu2 && menu.menu2.map((menue) => {
                                        return (
                                            <>
                                                <div className="menu2"><a
                                                    href={menue.path}>{menue.name}</a></div>
                                            </>
                                        )
                                    })}
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
