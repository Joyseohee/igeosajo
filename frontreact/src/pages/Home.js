import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header pagename="메인 페이지" />
        <Sidebar />
      </div>
    );
  }
}

export default Home;
