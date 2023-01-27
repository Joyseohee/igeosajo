import React, { Component } from "react";
import {Container, Row, Col, NavbarBrand} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  //
  // async componentDidMount() {
  //   const response = await fetch("http://127.0.0.1:8000/api/user?usernum=1", {
  //     method: "GET",
  //   });
  //   const data = await response.json();
  //   this.setState({
  //     username: data[0].username,
  //     userdept: data[0].userdept,
  //     userposition: data[0].userposition,
  //   });
  // }

  render() {
    const {username, userdept, userposition} = this.props.state;
    const {pagename} = this.props;
    console.log(this.props.state);
    console.log(pagename);

    return (
      <div className="header">
        <Row className="header-wrapper">
          <Col sm="8" className="logo-wrapper">
            <div className="logo"><Link to="/">Office</Link></div>
          </Col>
          <Col sm="3" className="profile">
            <Row>
              <Col sm="3">
                <div className="photo">사진</div>
              </Col>
              <Col sm="9" className="info">
                <Row>
                  <Col>
                    <div className="name">{username}</div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="dept">
                      {userdept} {userposition}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="1" className="logout">
            <div>로그아웃</div>
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
