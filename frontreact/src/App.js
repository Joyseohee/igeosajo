import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Reqterm from "./pages/Reqterm";
import "bootstrap/dist/css/bootstrap.css";

import DocRequest from "./pages/DocRequest";

class App extends Component {
    render() {

        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/reqterm" element={<Reqterm/>}/>
                    <Route path={"docrequest/"} element={<DocRequest></DocRequest>}></Route>
                </Routes>

            </div>
        );
    }
}

export default App;
