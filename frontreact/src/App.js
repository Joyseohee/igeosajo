
import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Reqterm from "./pages/Reqterm";
import RequestUser from "./pages/RequestUser";

import Hello from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.css";



class App extends Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/cart/:usernum" usernum="13" element={<Hello/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/request" element={<RequestUser/>}/>
                    <Route path="/reqterm" element={<Reqterm/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;

