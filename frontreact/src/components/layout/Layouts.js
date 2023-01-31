import React, {Component} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styled/Layouts.css"

class Layouts extends Component {

    render() {
        return (
            <div className="page-top">
                <Header pagename={this.props.pagename} userinfo={this.props.userinfo}/>
                <div className="container-content">
                    <Sidebar menus={this.props.userinfo.menus}/>
                    <div className="container-main">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Layouts;
