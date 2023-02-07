import React, {Component} from "react";
import {Table} from "react-bootstrap";

class ReqtermList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const termlist = this.props.termlist;
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
                                <td>{term.termavailable===0?"신청 불가 기간":"신청 가능 기간"}</td>
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
