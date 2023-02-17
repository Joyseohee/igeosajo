import {FormSelect} from "react-bootstrap";
import React, {Component} from "react";

class ProductFilter extends Component {
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

    async componentDidMount() {
        await this.getCate1name();
    }

    async getCate1name() {

        try {
            let res = await fetch('http://127.0.0.1:8000/api/category1');
            const items1 = await res.json();
            await this.setState({
                items1
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getCate2name() {

        try {
            const category1code = this.state.category1code
            let url = 'http://127.0.0.1:8000/api/category2';

            if (category1code !== '') {
                url += '?category1code=' + category1code
            }
            let res = await fetch(url);
            const items2 = await res.json();
            await this.setState({
                items2
            });

        } catch (e) {
            console.log(e);
        }
    }

    select1 = (value) => {
        this.setState({
            category1code: value,
            category2code: '',
            items2:[]

        }, () => {
            if (this.state.category1code!==''){
            this.getCate2name();}
            this.props.callbackFilter(this.state.category1code, this.state.category2code);
        });

    }
    sendfilter = (value) => {
        this.setState({
            category2code: value
        }, () => {
            this.props.callbackFilter(this.state.category1code, this.state.category2code);
        });

    }

    render() {
        const category1code = this.state.category1code
        return (
            <div>
                  <div className="inline">
                <FormSelect className="form-select" style={{width:'130px', height:'45px', cursor:"pointer"}} onChange={(e) => this.select1(e.target.value)}>
                    <option value={''}
                                    >전체 </option>
                    {this.state.items1.map((cate1) => {
                        return (
                            <option key={cate1.category1code}
                                    value={cate1.category1code}>{cate1.category1name}</option>)
                    })}
                </FormSelect>
                &nbsp;&nbsp;
                <FormSelect className="form-select" style={{width:'130px', height:'45px', cursor:"pointer"}} onChange={(e) => this.sendfilter(e.target.value)}
                     disabled= {category1code !=='' ? 0 : 1}>
                    {category1code !=='' ? <option value={''}
                                    >전체</option> : null}
                    {this.state.items2.map((cate1) => {
                        return (
                            <option key={cate1.category2code}
                                    value={cate1.category2code}>{cate1.category2name}</option>)
                    })}
                </FormSelect>
                  </div>
            </div>
        );
    }
}

export default ProductFilter;