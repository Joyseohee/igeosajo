import React, {Component} from "react";
import {Form} from "react-bootstrap";

class SelectReqterm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            // <select>
            <select onChange={(e) => {
                this.props.handleSelect(e)
            }}>
                {this.props.reqtermlist.map((reqterm) => {
                    return (
                        <option key={reqterm.termyearmonth}
                                value={reqterm.termyearmonth}>{reqterm.termyearmonth.toString().slice(0, 4)}년 {reqterm.termyearmonth.toString().slice(4, 7)}월</option>)
                })}
            </select>
        );
    }
}

export default SelectReqterm;

