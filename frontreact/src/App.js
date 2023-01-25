import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;
