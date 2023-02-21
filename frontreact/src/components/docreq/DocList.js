import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import {withRouter} from "react-router-dom";
import "../../styled/DocList.css"

class DocList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listState: "allselect",
            moveDetail: 0
        }
    }

    moveDocDetail = (e) => {

        if (this.props.user.userathority === 1) {
            this.props.history.push({
                pathname: '/docpaydetail',
                document: {detailDocNum: e},
                listState: {listKind: this.props.listState}
            })
        } else if (this.props.user.userathority === 0) {
            this.props.history.push({
                pathname: '/docappro',
                document: {detailDocNum: e},
                listState: {listKind: this.props.listState}
            })
        }
    }

    render() {

        let doclist = this.props.doclist;
        let pageNum = this.props.pageNum;

        return (
            <div>
                <Table bordered hover className={"DocListTable"}>
                    <thead>
                    <tr className={"listTh"}>
                        <th>No.</th>
                        <th>문서 제목</th>
                        <th>기안자</th>
                        <th>결재자</th>
                        <th>결재 현황</th>
                        <th>결재 일자</th>
                    </tr>
                    </thead>
                    {
                        doclist.length !== 0
                            ? <tbody>
                            {
                                doclist.map((data, i) => (
                                    <tr className={"doclistTd"} key={`docreq${data.reqnum}` + i} value={data.docnum}
                                        onClick={(e) => {
                                            this.moveDocDetail(data.docnum)
                                        }}>
                                        <td> {(pageNum - 1) * 10 + i + 1} </td>
                                        <td>결재요청</td>
                                        <td>진도준</td>
                                        <td>진양철</td>
                                        <td>{data.docstate}</td>
                                        <td>{data.docwdate}</td>
                                    </tr>

                                ))
                            }
                            </tbody>
                            : <tbody>
                            <tr>
                                <td colSpan={6}>데이터가 없습니다.</td>
                            </tr>
                            </tbody>
                    }

                </Table>
            </div>);
    }
}

export default withRouter(DocList);