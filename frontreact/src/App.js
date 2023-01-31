import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Reqterm from "./pages/Reqterm";
import "bootstrap/dist/css/bootstrap.css";
import Order from "./pages/Order";
import OrderReq from "./pages/OrderReq";
class App extends Component {
    render() {

        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/reqterm" element={<Reqterm/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/orderreq" element={<OrderReq/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;
