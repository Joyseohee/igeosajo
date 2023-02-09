import {FormSelect} from "react-bootstrap";
import React, {Component} from "react";

class ProductFilter extends Component {
    constructor(props) {
        super(props);
        this.getCatename = this.getCatename.bind(this)
        this.state = {
            items1: [],
            items2: [],
            category1code : '',
                        category2code : ''


        }
    }


    async componentDidMount() {
        await this.getCatename()
    }

    async getCatename() {

        try {
            let res = await fetch('http://127.0.0.1:8000/api/category1');
            const items1 = await res.json();
            await this.setState({
                items1
            });
            console.log("pl")
            const category1code = this.state.category1code
            res = await fetch('http://127.0.0.1:8000/api/category2');
            const items2 = await res.json();
            await this.setState({
                items2
            });
            console.log("pl")
        } catch (e) {
            console.log(e);
        }
    }
     select1 = (value) => {
        console.log('select1')
      this.setState({
          category1code: value
      })

  }
  select2 = (value) => {
        console.log('select1')
      this.setState({
          category2code: value
      })

  }

    render() {
          const category1code = this.state.category1code
         const category2code = this.state.category2code
        return (
            <div>
                <FormSelect onClick={(e) => this.select1(e.target.value)}>
                    {this.state.items1.map((cate1) => {
                        return (
                            <option key={cate1.category1code}
                                    value={cate1.category1name}>{cate1.category1name}</option>)
                    })}
                </FormSelect>
                {category1code}
                <br></br>

                <FormSelect  onClick={(e) => this.select1(e.target.value)}>
                    {this.state.items2.map((cate1) => {
                        return (
                            <option key={cate1.category2code}
                                    value={cate1.category2name}>{cate1.category2name}</option>)
                    })}
                </FormSelect>
            </div>
        );
    }
}

export default ProductFilter;