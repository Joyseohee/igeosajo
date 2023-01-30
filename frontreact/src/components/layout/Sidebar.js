import React, {Component} from "react";
import "../../styled/Layouts.css";
import {Link} from "react-router-dom";


class Sidebar extends Component {

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
