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

        if(this.props.user.userathority === 1){
            this.props.history.push({
                pathname: '/docpaydetail',
                document: {detailDocNum: e},
            })
        }else if(this.props.user.userathority === 0){
            this.props.history.push({
                pathname: '/docappro',
                document: {detailDocNum: e},
            })
        }
    }

    render() {

        let doclist = this.props.doclist;
        let pageNum = this.props.pageNum;

        return (
            <div>
                <Table bordered hover>
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
                    <tbody>
                    {
                        doclist.map((data, i) => (
                            <tr className={"doclistTd"} key={data.docnum} value={data.docnum} onClick={(e) => {
                                this.moveDocDetail(data.docnum)
                            }}>
                                <td> {(pageNum - 1) * 10 + i + 1} </td>
                                <td>결재요청</td>
                                <td>김연아</td>
                                <td>홍길동</td>
                                <td>{data.docstate}</td>
                                <td>{data.docwdate}</td>
                            </tr>

                        ))
                    }

                    </tbody>
                </Table>
            </div>);
    }
}

export default withRouter(DocList);