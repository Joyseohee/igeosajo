import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Test1 from "./components/test1";

import DocRequest from "./pages/DocRequest";

class App extends Component {
    render() {
        return (
            <div>

                <Routes>
                    <Route path={"test/"} element={<Test1></Test1>}></Route>
                    <Route path={"docrequest/"} element={<DocRequest></DocRequest>}></Route>
                </Routes>

            </div>
        );
    }
}

export default App;
