import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../../api/Api";
import CommonUtil from "../../util/CommonUtil";
import ReqtermModal from "./ReqtermModal";

class ReqtermSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReqtermEndModal: false,
            showRequestAllEndModal: false,
        }
    }

    handleStart = (e) => {
        const params = {
            "usernum": this.props.usernum,
            "termavailable": 1,
        }
        this.setState({
            setreqtermstart: true,
        })
        new Api().update("reqterm", params, this.props.presentTerm.termyearmonth).then(() => {
                this.props.getReqtermList();
            }
        )
    }

    handleEnd = (e) => {
        this.setState({
            showReqtermEndModal: true
        })
    }

    updateState = (newValues) => {
        this.setState(newValues);
    };

    render() {
        const {presentTerm, today, getReqtermList, usernum} = this.props;
        const {showReqtermEndModal, showRequestAllEndModal} = this.state;
        const disabled = (presentTerm !== null && presentTerm !== undefined) && presentTerm.termavailable;
        let {inTerm, setreqtermstart, setreqtermend} = false;

        let showModal = "";
        let text = "";
        let modalType = "";
        let confirm = "";

        if (showReqtermEndModal) {
            showModal = true;
            text = `신청 접수를 마감하면 처리되지 않은 신청은 자동으로 반려됩니다.\n그래도 마감하시겠습니까?`;
            modalType = "마감반려";
            confirm = "마감";
        } else if (showRequestAllEndModal) {
            showModal = true;
            text = "신청 접수가 마감되었습니다.";
            modalType = "마감";
            confirm = "확인";
        }

        if (presentTerm !== null && presentTerm !== undefined) {
            const date = new CommonUtil().convertDateType(today);
            const startDate = presentTerm.termstartdate;
            const endDate = presentTerm.termenddate;

            if (startDate <= date && endDate >= date) {
                inTerm = true;
                setreqtermstart = presentTerm.termavailable !== 1;
                setreqtermend = presentTerm.termavailable === 1;
            } else {
                inTerm = false;
                setreqtermstart = false;
                setreqtermend = false;
            }
        }

        let startDate = "";
        let endDate = "";

        if (inTerm) {
            startDate = new CommonUtil().getLocalDate(presentTerm.termstartdate);
            endDate = new CommonUtil().getLocalDate(presentTerm.termenddate);
        }

        return (
            <>
                {inTerm ?
                    <div>
                        <div className="reqterm-set-alert">지금은 신청 기간입니다.</div>
                        <div className="reqterm-set-term-check">신청 기간은 <span
                            className="reqterm-date">{startDate}</span>부터 <span
                            className="reqterm-date">{endDate}</span>까지입니다.
                        </div>
                    </div>
                    :
                    <div className="reqterm-set-alert">지금은 신청기간이 아닙니다.</div>
                }
                {inTerm ? setreqtermend ?
                        <div className="reqterm-set-term-message blue">신청 접수가 진행중입니다.</div>
                        :
                        <div className="reqterm-set-term-message red">신청 접수가 마감되었습니다.</div>
                    : <div className="reqterm-set-term-message">아직 등록된 신청 기간이 없습니다. 신청 기간을 등록해주세요</div>
                }

                {inTerm &&
                    <div className="reqterm-set-button-wrapper">
                        <Button className="reqterm-set-button"
                                onClick={(e) => this.handleStart(e)} disabled={disabled}
                                style={{
                                    backgroundColor: "#8EA6C0",
                                    borderColor: "#8EA6C0",
                                    borderRadius: "5px 0 0 5px",
                                    width: "100px",
                                    height: "50px"
                                }}>
                            시작
                        </Button>
                        <Button className="reqterm-set-button"
                                onClick={(e) => this.handleEnd(e)} disabled={!disabled}
                                style={{
                                    backgroundColor: "#8EA6C0",
                                    borderColor: "#8EA6C0",
                                    borderRadius: "0 5px 5px 0",
                                    width: "100px",
                                    height: "50px"
                                }}>
                            마감
                        </Button>
                    </div>
                }
                <ReqtermModal show={showModal}
                              text={text}
                              confirm={confirm}
                              modalType={modalType}
                              getReqtermList={getReqtermList}
                              usernum={usernum}
                              presentTerm={presentTerm}
                              updateState={this.updateState}/>
            </>
        );
    }
}

export default ReqtermSet;
