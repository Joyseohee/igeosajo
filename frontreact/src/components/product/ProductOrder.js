import React, {Component} from "react";

class ProductOrder extends Component {
    constructor(props) {
        super(props);
        this.getCate1name = this.getCate1name.bind(this);
        this.getCate2name = this.getCate2name.bind(this);
        this.state = {
            items1: [],
            items2: [],
            category1code: '',
            category2code: ''
        }
    }


    render() {
        return(
            <button></button>
        )
    }
} export default ProductOrder