import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styled/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userdept: "",
      userposition: "",
      pagename: "",
    };
  }

  async componentDidMount() {
    const response = await fetch("http://127.0.0.1:8000/api/user?usernum=1", {
      method: "GET",
    });
    const data = await response.json();
    this.setState({
      username: data[0].username,
      userdept: data[0].userdept,
      userposition: data[0].userposition,
    });
  }

  render() {
    const { username } = this.state;
    const { userdept } = this.state;
    const { userposition } = this.state;
    const { pagename } = this.props;
    console.log(pagename);
    return (
      <div className="header">
        <Row className="header-wrapper">
          <Col lg="8" md="8" className="logo-wrapper">
            <div className="logo">Office</div>
          </Col>
          <Col lg="3" md="3" className="profile">
            <Row>
              <Col lg="3" md="3">
                <div className="photo">사진</div>
              </Col>
              <Col lg="9" md="9" className="info">
                <Row>
                  <Col>
                    <div className="dept">
                      {userdept} {userposition}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="name">{username}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg="1" md="1" className="logout">
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
