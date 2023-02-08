import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
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

    componentDidMount() {
        this.props.statechange("allselect");
    }

    moveDocDetail = (e) => {
        this.props.history.push({
            pathname: '/docpaydetail',
            document: {detailDocNum: e},
        })
    }

    render() {

        let doclist = this.props.doclist;

        return (<div>
            <Table bordered hover>
                <thead>
                <tr className={"doclistTh"}>
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
                        <tr key={data.docnum} value={data.docnum} onClick={(e) => {
                            this.moveDocDetail(data.docnum)
                        }}>
                            <td> {i + 1} </td>
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

            <Pagination>
                <Pagination.First/>
                <Pagination.Prev/>
                <Pagination.Item>{1}</Pagination.Item>
            </Pagination>
        </div>);
    }
}

export default withRouter(DocList);