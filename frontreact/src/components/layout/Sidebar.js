import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import "../../styled/Sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userathority: 2,
        };
    }

    async componentDidMount() {
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=1", {
            method: "GET",
        });
        const data = await response.json();
        this.setState({
            userathority: data[0].USERATHORITY,
        });
    }

    render() {
        const {userathority} = this.state;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="menu-wrapper">
                        <div className="menu1">메뉴1</div>
                        <div className="menu2">메뉴2</div>
                        <div className="menu2">메뉴2</div>
                    </div>
                    <div className="menu-wrapper">
                        <div className="menu1">메뉴1</div>
                        <div className="menu2">메뉴2</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
