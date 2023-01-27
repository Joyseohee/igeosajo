import React, { Component } from 'react';
import Hello from "./pages/cart.js";
import Product from "./pages/product.js";
import {Route, Routes} from 'react-router-dom';


class App extends Component {
  render() {
    return(
        <div>
            <Routes>
            <Route path= "/cart/:usernum" usernum="13" element={<Hello />} />
                <Route path= "/product" element={<Product />} />
            </Routes>
        </div>
    );
  }
}

export default App;

