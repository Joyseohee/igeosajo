import React, {Component} from "react";
import {FormSelect} from "react-bootstrap";

class SelectReqterm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {reqtermList} = this.props;
        return (
            <FormSelect onChange={(e) => this.props.handleSelect(e)}>
                {reqtermList.map((reqterm) => {
                    return (
                        <option key={reqterm.termyearmonth}
                                value={reqterm.termyearmonth}>{reqterm.termyearmonth.toString().slice(0, 4)}년 {reqterm.termyearmonth.toString().slice(4, 7)}월</option>)
                })}
            </FormSelect>
        );
    }
}

export default SelectReqterm;

