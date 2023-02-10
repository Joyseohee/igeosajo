import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "./cartcount";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodname: ''
        };
    }

  onChange = (e) => {
      this.setState({
          prodname: (e.target.value)
      })

  }
  sendSearch =(e) => {
        this.props.callbackSearch(this.state.prodname)
  }
    render() {
        const prodname =this.state.prodname
        return (
            <div>
                <input onChange={this.onChange} value={prodname} /> <button onClick={this.sendSearch}>검색하기</button>
            </div>


        )
    }
} export default Search