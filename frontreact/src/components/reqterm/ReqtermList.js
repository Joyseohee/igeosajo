import React, {Component} from "react";
import {Button, Form, Table} from "react-bootstrap";
import Api from "../../api/Api";

class ReqtermList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termlist: [],
        }
        this.setBasicReqterm = this.setBasicReqterm.bind(this);
    }

    async componentDidMount() {
        this.setBasicReqterm();
    }

    async setBasicReqterm() {
        let date = new Date()
        const response = await new Api().read("reqterm", null, null);
        const data = await response.json();
        await this.setState({
            termlist: data,
        })
    }

    render() {
        const termlist = this.state.termlist;
        return (
            <>
                <Table>
                    <thead>
                    <tr>
                        <th>귀속연월</th>
                        <th>신청 시작일</th>
                        <th>신청 마감일</th>
                        <th>현재 가능 여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {termlist.map((term) => {
                        return(
                            <tr key={term.termyearmonth}>
                                <td>{term.termyearmonth}</td>
                                <td>{term.termstartdate}</td>
                                <td>{term.termenddate}</td>
                                <td>{term.termavailable}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
            </>
        );
    }
}

export default ReqtermList;
