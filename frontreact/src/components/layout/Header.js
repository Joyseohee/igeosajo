import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('secretcode');
        window.location.assign("http://localhost:3000");
    }

    render() {
        const {username, userdept, userposition} = this.props.userinfo;
        const {usernum} = this.props;
        const {pagename} = this.props;
        return (
            <div className="header">
                <Row className="header-wrapper">
                    <Col sm="8" className="logo-wrapper">
                        <div className="logo"><Link to="/main">Office</Link></div>
                    </Col>
                    <Col sm="3" className="profile">
                        <Row>
                            <Col sm="3" className="photo">
                                {usernum !== "fakenum" && <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(150, 150, 150)"
                                         className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fillRule="evenodd"
                                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg></div>}
                                {usernum === "fakenum" && <div className="photo"></div>}
                            </Col>
                            <Col sm="9" className="info" >
                                <Row>
                                    <Col>
                                        {usernum !== "fakenum" && <div className="name">{username}</div>}
                                        {usernum === "fakenum" && <div className="name"></div>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {usernum !== "fakenum" && <div className="dept">
                                            {userdept} {userposition}
                                        </div>}
                                        {usernum === "fakenum" && <div className="dept">
                                        </div>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="1" className="logout">
                        {usernum !== "fakenum" && <div className="name">
                            <div onClick={this.logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(150, 150, 150)"
                                     className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                    <path fillRule="evenodd"
                                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg></div>
                        </div>}
                        {usernum === "fakenum" && <div></div>}
                    </Col>
                </Row>
                <Row className="bar-wrapper">
                    <div className="bar">{pagename}</div>
                </Row>
            </div>
        );
    }
}

export default Header;
