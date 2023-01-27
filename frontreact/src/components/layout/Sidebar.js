import React, {Component} from "react";
import "../../styled/Layouts.css";
import {Link} from "react-router-dom";


class Sidebar extends Component {

    //
    // async componentDidMount() {
    //     const response = await fetch("http://127.0.0.1:8000/api/user?usernum=2", {
    //         method: "GET",
    //     });
    //     const data = await response.json();
    //     this.setState({
    //         userathority: data[0].userathority,
    //     });
    // }
    //
    // async componentDidUpdate(prevProps, prevState) {
    //     if (prevState.userathority == 0) {
    //         this.setState({
    //             menus: [{
    //                 name: "전자결재",
    //                 path: "/",
    //             }]
    //         });
    //     } else if (prevState.userathority == 1) {
    //         this.setState({
    //             menus: [{
    //                 name: "사무용품 신청 관리", path: "/",
    //                 menu2: [{name: "신청기간 설정", path: "/reqterm"}, {name: "신청 관리", path: "/"}]
    //             }, {
    //                 name: "전자결재", path: "/",
    //                 menu2: [{name: "전자 결재 작성", path: "/"}, {name: "전자 결재 목록", path: "/"}]
    //             }, {
    //                 name: "사무용품 구매", path: "/",
    //                 menu2: [{name: "구매 신청", path: "/"}, {name: "구매 진행 현황", path: "/"}]
    //             }]
    //         });
    //     } else if (prevState.userathority == 2) {
    //         this.setState({
    //             menus: [{
    //                 name: "사무용품 구매",
    //                 path: "/",
    //                 menu2: [{name: "물품보기", path: "/"}, {name: "장바구니", path: "/"}]
    //             }, {name: "사무용품 신청 내역", path: "/"}]
    //         });
    //     }
    // }

    render() {
        let {menus} = this.props;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="menu-wrapper">

                        {menus.map((menu) => {
                            return (
                                <>
                                    <div className="menu1"><a href={menu.path}>{menu.name}</a></div>
                                    {menu.menu2 && menu.menu2.map((menue) => {
                                        // console.log(value[0].name)
                                        return (
                                            <>
                                                <div className="menu2"><Link
                                                    to={menue.path}>{menue.name}</Link></div>
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
