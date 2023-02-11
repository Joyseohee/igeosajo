import React, {Component} from "react";
import "../../styled/Layouts.css";
import {Link, withRouter} from "react-router-dom";
import Menu from "../../storage/Menu";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [
                {
                    index: "depth1",
                    name: "",
                    path: "",
                },
            ],
            currentMenu: null,
        };
        this.setMenu = this.setMenu.bind(this);
    }

    setMenu(userAuthority) {
        if (userAuthority === 0) {
            this.setState({
                menus: new Menu().user0menu,
            });
        } else if (userAuthority === 1) {
            this.setState({
                menus: new Menu().user1menu,
            });
        } else if (userAuthority === 2) {
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


    handleMainMenuClick = (index) => {
        this.setState({currentMenu: index});
    };

    render() {
        const {menus, currentMenu} = this.state;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="menu-wrapper">
                        {menus.map((menu, index) => {
                            return (
                                <div key={menu.index}>
                                    <div
                                        className="menu1"
                                        value={menu.index}
                                        onClick={() => this.handleMainMenuClick(index)}
                                    >
                                        <Link to={menu.path}>
                                            {menu.name}
                                        </Link>
                                    </div>
                                    {index === currentMenu &&
                                        menu.menu2 &&
                                        menu.menu2.map((submenu) => {
                                            return (
                                                <div key={submenu.index}>
                                                    <div className="menu2">
                                                        <Link to={submenu.path}>{submenu.name}</Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
