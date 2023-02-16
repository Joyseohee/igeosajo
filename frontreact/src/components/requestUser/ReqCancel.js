import React, {Component} from "react";
import {Button} from "react-bootstrap";
import PostCartModal from "../product/PostCartModal";
import Api from "../../api/Api";
import "../../styled/Request.css"

class ReqCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posted: false,
        };
    }

    //delete
    async deleteClick() {
        let reqnumList = []

        this.props.reqnum.map((request) => {
            reqnumList.push(parseInt(request.reqnum))
        });

        const response = await fetch('http://127.0.0.1:8000/api/request?reqnum=' + reqnumList, {
            method: 'DELETE'
        });

        setTimeout(() => {
            Promise.all([
                new Api().read("request", {
                    termyearmonth: this.props.selectedReqterm,
                    usernum: this.props.usernum !== undefined ? this.props.usernum : null
                }, null),
                new Api().read("request", {
                    usernum: this.props.usernum !== undefined ? this.props.usernum : null,
                    termyearmonth: this.props.selectedReqterm,
                    reqstate: this.props.requestFilter === '전체' ? null : this.props.requestFilter,
                }, null)
            ]).then(([requestList, requestFilteredList]) =>
                Promise.all([requestList.json(), requestFilteredList.json()]))
                .then(([requestList, requestFilteredList]) => {
                        this.props.updateState({
                            requestList: requestList.map((request) => ({
                                ...request,
                                checked: false,
                            })),
                            requestFilteredList: requestFilteredList.map((request) => ({
                                ...request,
                                checked: false,
                            })),
                            requestFilter: this.props.requestFilter,
                            checkedRequest: [],
                            allChecked: false,
                            pageCount: requestFilteredList.length,
                        })
                    }
                ).catch((error) => console.error(error));
        }, 500);
    }

    handleClose = () => {
        this.setState({
            posted: false
        })
    };

    handleConfirm = () => {
        this.deleteClick();
        this.handleClose();
    };
    postClick2 = () => {
        this.setState({
            posted: true
        })
    }

    render() {
        const {posted} = this.state
        return (<div>
                <Button className="request-button" style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0", width:"130px"}} onClick={() => {
                    this.postClick2()
                }}>신청 취소</Button>
                {posted && <PostCartModal show={true} id={1}
                                          confirm={"삭제하기"} handleClose={this.handleClose}
                                          handleConfirm={this.handleConfirm}
                                          modalInfo={this.props.modalInfo}
                />}
                {posted &&  this.props.reqnum.length === 0 && <PostCartModal show={true} id={3}
                                                                      confirm={"확인"} handleClose={this.handleClose}
                                                                      handleConfirm={this.handleClose}
                                                                      modalInfo={this.props.modalInfo}
                />}
            </div>
        )
    }
}

export default ReqCancel