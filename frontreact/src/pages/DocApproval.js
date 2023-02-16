import React, {Component} from 'react';
import DocListKind from "../components/docreq/DocListKind";

import "../styled/DocRequestCss.css"
import DocList from "../components/docreq/DocList";
import Goal from "../components/Goal";
import Paging from "../components/layout/Paging";
import {withRouter} from "react-router-dom";

class DocApproval extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listState: "allselect",
            doclist: [],
            allcnt: 0,
            approvalcnt: 0,
            rejectcnt: 0,
            waitcnt: 0,
            pageNum: 1,
            pageCount: 1
        };
    }

    async componentDidMount() {

        let word;
        let word1, word2, word3, word4;

        //  각각 수량
        await Promise.all([
            fetch('http://127.0.0.1:8000/api/document?checkDetail=1'),
            fetch('http://127.0.0.1:8000/api/document?state=승인&checkDetail=1'),
            fetch('http://127.0.0.1:8000/api/document?state=반려&checkDetail=1'),
            fetch('http://127.0.0.1:8000/api/document?state=대기&checkDetail=1')
        ])
            .then(([response1, response2, response3, response4]) =>
                Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]))

            .then(([response1, response2, response3, response4]) => {
                    this.setState({
                        allcnt: response1.length,
                        approvalcnt: response2.length,
                        rejectcnt: response3.length,
                        waitcnt: response4.length
                    })
                    word1 = response1.length;
                    word2 = response2.length;
                    word3 = response3.length;
                    word4 = response4.length;
                }
            ).catch((error) => console.error(error));

        // 테이블 생성
        if (this.state.listState === "allselect") {

            word = word1

            await fetch('http://127.0.0.1:8000/api/document?checkDetail=1&pagenum=1')
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response, pageCount: word})
                })
        } else {
            switch (this.state.listState) {
                case "승인":
                    word = word2
                    break;
                case "대기":
                    word = word4
                    break;
                case "반려":
                    word = word3
                    break;
            }

            await fetch('http://127.0.0.1:8000/api/document?state=' + this.state.listState + '&checkDetail=1&pagenum=1')
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response, pageCount: word})
                })
        }
    }


    statechange = (e) => {
        this.setState({listState: e, pageNum: 1})
        if (e === "allselect") {
            fetch('http://127.0.0.1:8000/api/document?checkDetail=1&pagenum=' + String(1))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response, pageCount: this.state.allcnt})
                })

        } else {
            let word;
            switch (e) {
                case "승인":
                    word = this.state.approvalcnt
                    break;
                case "대기":
                    word = this.state.waitcnt
                    break;
                case "반려":
                    word = this.state.rejectcnt
                    break;
            }

            fetch('http://127.0.0.1:8000/api/document?state=' + e + '&checkDetail=1&pagenum=' + String(1))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response, pageCount: word})
                })
        }
    }

    setPageNum = (e) => {
        this.setState({pageNum: e})

        if (this.state.listState === "allselect") {
            fetch('http://127.0.0.1:8000/api/document?checkDetail=1&pagenum=' + String(e))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })

        } else {
            fetch('http://127.0.0.1:8000/api/document?state=' + this.state.listState + '&checkDetail=1&pagenum=' + String(e))
                .then(response => response.json())
                .then(response => {
                    this.setState({doclist: response})
                })
        }
    }


    render() {

        return (
            <div>
                <Goal comment={"전자 결재 목록"}/>
                <DocListKind
                    cardMent={["승인", "반려", "승인 대기"]}

                    listState={this.state.listState}
                    statechange={this.statechange}
                    allcnt={this.state.allcnt}
                    approvalcnt={this.state.approvalcnt}
                    rejectcnt={this.state.rejectcnt}
                    waitcnt={this.state.waitcnt}
                    setPageNum={this.setPageNum}/>
                <DocList
                    listState={this.state.listState}
                    doclist={this.state.doclist}
                    statechange={this.statechange}
                    pageNum={this.state.pageNum}
                    user={this.props.user}/>
                <Paging
                    pageNum={this.state.pageNum}
                    setPageNum={this.setPageNum}
                    pageCount={this.state.pageCount}
                    showNum={10}/>
            </div>
        );
    }
}

export default withRouter(DocApproval);