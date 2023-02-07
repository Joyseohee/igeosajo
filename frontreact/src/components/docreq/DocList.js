import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import {withRouter} from "react-router-dom";

class DocList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listState: "allselect",
            doclist: [],
            moveDetail: 0
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document?checkDetail=1')
            .then(response => response.json())
            .then(response => {
                this.setState({doclist: response})
            })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.listState !== prevProps.listState) {
            await this.setState({listState: this.props.listState});

            if (this.state.listState === "allselect") {
                fetch('http://127.0.0.1:8000/api/document?checkDetail=1')
                    .then(response => response.json())
                    .then(response => {
                        this.setState({doclist: response})
                    })

            } else {
                fetch('http://127.0.0.1:8000/api/document?state=' + this.props.listState + '&checkDetail=1')
                    .then(response => response.json())
                    .then(response => {
                        this.setState({doclist: response})
                    })
            }
        }
    }

    moveDocDetail = (e) => {
        this.props.history.push({
            pathname: '/docpaydetail',
            document: {detailDocNum: e},
        })
    }

    render() {
        return (<div>
            <Table striped="columns">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>문서 제목</th>
                    <th>기안자</th>
                    <th>결재자</th>
                    <th>결재 현황</th>
                    <th>결재 일자</th>
                </tr>
                </thead>
                <tbody>
                {/*9 대신에 범위 설정
                i에 값을 넣고*/}
                {
                    this.state.doclist.map((data, i) => (
                        i < 20
                            ? (<tr key={data.docnum} value={data.docnum} onClick={(e)=>{
                                this.moveDocDetail(data.docnum)
                                }
                            }
                            >
                                <td> {i + 1} </td>
                                <td>결재요청</td>
                                <td>김연아</td>
                                <td>홍길동</td>
                                <td>{data.docstate}</td>
                                <td>{data.docwdate}</td>
                            </tr>)
                            : <a></a>
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