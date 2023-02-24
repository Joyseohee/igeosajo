import React, {Component} from "react";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import "../styled/Request.css";
import Goal from "../components/Goal";
import Paging from "../components/layout/Paging";
import ReqCancel from "../components/requestUser/ReqCancel";

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: ['requestList'],
            requestFilteredList: ['requestFilteredList'],
            reqtermList: ['reqtermList'],
            selectedReqterm: null,
            checkedRequest: [],
            allChecked: false,
            requestFilter: '전체',
            showRejectModal: false,
            showApproveConfirmModal: false,
            showRejectConfirmModal: false,
            showFinalModal: false,
            reqRejectReason: null,
            available: 0,
            pageNum: 1,
            pageCount: 1,
            modalInfo: [
                {
                    id: 1,
                    type: 'confirm',
                    text: "선택하신 신청을 취소하시겠습니까?",
                    path: ''

                }, {
                    id: 3,
                    type: 'alert',
                    text: "선택하신 신청이 없습니다.",
                    path: ''
                }
            ]
        }
        this.props.setpagename("사무용품 신청 내역");
    }

    componentDidMount() {
        let reqtermList = [];
        let available = null;
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        let termyearmonth = year + '' + month
        new Api().read("reqterm", null, null)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                reqtermList = response;
                available = response.filter(term => term.termyearmonth === response[0].termyearmonth)[0].termavailable;
                return new Api().read("request", {
                    termyearmonth: termyearmonth,
                    usernum: this.props.usernum !== undefined ? this.props.usernum : null
                }, null);
            })
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    requestList: response.map((request) => ({
                        ...request,
                        checked: false,
                    })),
                    reqtermList: reqtermList,
                    requestFilteredList: response.map((request) => ({
                        ...request,
                        checked: false,
                    })),
                    selectedReqterm: reqtermList[0].termyearmonth,
                    available: available,
                    pageCount: response.length
                })
            })
            .catch(error => console.error(error));
    }

    updateState = (newValues) => {
        this.setState(newValues);
    };

    setPageNum = (e) => {
        this.setState({pageNum: e})
        new Api().read("request", {
            termyearmonth: this.state.selectedReqterm, usernum: this.props.usernum,
            reqstate: this.state.requestFilter !== '전체' ? this.state.requestFilter : null,
        }, null)
            .then((response) => {
                return response.json();
            }).then((response) => {
            this.setState(() => ({
                requestFilteredList: response.map((request) => ({
                    ...request,
                    checked: false,
                })),
                allChecked: false,
                checkedRequest: [],
            }));
        })
    }

    render() {
        const {
            requestList,
            reqtermList,
            requestFilteredList,
            selectedReqterm,
            requestFilter,
            checkedRequest,
            available,
            pageNum,
            pageCount,
            allChecked
        } = this.state;

        return (
            <div className="page-top request-wrapper">
                <Goal comment={"사무용품 신청 내역"}/>
                <div className="request">
                    <div className="request-select-button-filter-wrapper">
                        <div className="request-select-button-wrapper">
                            {reqtermList[0] !== 'reqtermList' &&
                                <SelectReqterm
                                    reqtermList={reqtermList}
                                    updateState={this.updateState}
                                    pageNum={pageNum}
                                    pageCount={pageCount}
                                    usernum={this.props.usernum}
                                />
                            }
                            {available === 1 ?
                                <ReqCancel reqnum={checkedRequest}
                                           modalInfo={this.state.modalInfo}
                                           selectedReqterm={selectedReqterm}
                                           requestFilter={requestFilter}
                                           usernum={this.props.usernum}
                                           updateState={this.updateState}/> :
                                <div className="request-alert-wrapper">
                                    <div className="request-alert-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem"
                                             fill="rgb(248, 103, 106)" className="bi bi-exclamation-diamond-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                    </div>
                                    <div className="request-alert-text">
                                        <p>현재 마감된 신청기간입니다.</p>
                                        <p>신청 취소가 불가능합니다.</p>
                                    </div>
                                </div>
                            }
                        </div>
                        {requestList[0] !== 'requestList' &&
                            <ReqFilter
                                selectedFilter={requestFilter}
                                requestList={requestList}
                                selectedReqterm={selectedReqterm}
                                updateState={this.updateState}
                                pageNum={pageNum}
                                pageCount={pageCount}
                                usernum={this.props.usernum}
                            />
                        }
                    </div>
                    {(requestFilteredList[0] !== 'requestFilteredList') &&
                        <>
                            <ReqList
                                allChecked={allChecked}
                                available={available}
                                requestList={requestFilteredList}
                                requestFilter={requestFilter}
                                checkedRequest={checkedRequest}
                                updateState={this.updateState}
                                pageNum={this.state.pageNum}
                                pageCount={this.state.pageCount}
                                modalInfo={this.state.modalInfo}
                            />
                            <Paging
                                showNum={10}
                                pageNum={this.state.pageNum}
                                setPageNum={this.setPageNum}
                                pageCount={this.state.pageCount}
                            />
                        </>
                    }

                </div>
            </div>);
    }
}

export default Request;