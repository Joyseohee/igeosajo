import React, {Component} from "react";
import Api from "../api/Api";
import ReqFilter from "../components/request/ReqFilter";
import ReqList from "../components/request/ReqList";
import SelectReqterm from "../components/request/SelectReqterm";
import "../styled/Request.css";
import Goal from "../components/Goal";
import reqtermList from "../components/reqterm/ReqtermList";
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
                    text: "선택하신 신청을 휘소하시겠습니까?",
                    path: ''

                }, {
                    id: 3,
                    type: 'alert',
                    text: "선택하신 신청이 없습니다.",
                    path: ''
                }
            ]
        }
    }


    componentDidMount() {
        this.props.setpagename("사무용품 신청 내역");
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
                <Goal comment={"신청 내역"}/>
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
                                           updateState={this.updateState}/> : <div>현재는 신청기간이 아닙니다.<br/>취소가 불가능합니다.</div>}
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
                    {requestFilteredList[0] !== 'requestFilteredList' && requestFilteredList.length > 0 &&
                        <>
                            <ReqList
                                allChecked={allChecked}
                                requestList={requestFilteredList}
                                requestFilter={requestFilter}
                                checkedRequest={checkedRequest}
                                updateState={this.updateState}
                                pageNum={this.state.pageNum}
                                pageCount={this.state.pageCount}
                                 modalInfo={this.state.modalInfo}
                            />
                            <Paging
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