import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Reqterm from "./pages/Reqterm";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/aa" element={<Reqterm/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;
