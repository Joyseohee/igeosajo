import React, {Component} from "react";
import "../../styled/Layouts.css";
import {Link} from "react-router-dom";
import Menu from "../../storage/Menu";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [{
                index: "depth1",
                name: "",
                path: "",
            }],
        }
        this.setMenu = this.setMenu.bind(this);
    }

    setMenu(userathority) {
        if (userathority === 0) {
            this.setState({
                menus: new Menu().user0menu,
            });
        } else if (userathority === 1) {
            this.setState({
                menus: new Menu().user1menu,
            });
        } else if (userathority === 2) {
            this.setState({
                menus: new Menu().user2menu,
            });
        }
    }

    componentDidMount() {
        try {
            this.setMenu(this.props.userathority);
        } catch (e) {
            console.error(e);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userathority !== this.props.userathority) {
            this.setMenu(this.props.userathority);
        }
    }

    render() {
        const {menus} = this.state;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="menu-wrapper">
                        {menus.map((menu) => {
                            return (
                                <div key={menu.index}>
                                    <div className="menu1"><a href={menu.path}>{menu.name}</a></div>
                                    {menu.menu2 && menu.menu2.map((menue) => {
                                        return (
                                            <div key={menue.index}>
                                                <div className="menu2"><Link
                                                    to={menue.path}>{menue.name}</Link></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;
