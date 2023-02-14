import React, {Component} from "react";
import {FormSelect} from "react-bootstrap";
import Api from "../../api/Api";

class SelectReqterm extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect = (e) => {
        const termyearmonth = e.target.value;
        let available = this.props.reqtermList.filter(term => term.termyearmonth.toString() === termyearmonth.toString());
        available = available.length > 0 ? available[0].termavailable : 0;
        new Api().read("request", {termyearmonth: termyearmonth}, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.props.updateState({
                requestList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                selectedReqterm: termyearmonth,
                requestFilter: '전체',
                reqRejectReason: null,
                available: available,
                allChecked: false,
                pageCount: response.length
            });
        })
    };


    render() {
        const {reqtermList} = this.props;
        return (
            <FormSelect onChange={(e) => this.handleSelect(e)} defaultValue={reqtermList[0]} className="request-select-wrapper">
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

