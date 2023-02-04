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
                            <Col sm="3">
                                {usernum !== "fakenum" && <div className="photo"><img src={"/userprofile.png"} width={"35px"}/></div>}
                                {usernum === "fakenum" && <div className="photo"></div>}
                            </Col>
                            <Col sm="9" className="info">
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
                            <div onClick={this.logout}>로그아웃</div>
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
