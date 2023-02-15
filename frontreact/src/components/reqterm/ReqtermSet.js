import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Api from "../../api/Api";
import CommonUtil from "../../util/CommonUtil";

class ReqtermSet extends Component {
    constructor(props) {
        super(props);
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
        const params = {
            "usernum": this.props.usernum,
            "termavailable": 0,
        }
        this.setState({
            setreqtermstart: false,
        })
        new Api().update("reqterm", params, this.props.presentTerm.termyearmonth).then(() => {
                this.props.getReqtermList();
            }
        )
    }

    render() {
        const {presentTerm, today} = this.props;
        const disabled = (presentTerm !== null && presentTerm !== undefined) && presentTerm.termavailable;
        let {inTerm, setreqtermstart, setreqtermend} = false;

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

        let startDate = new CommonUtil().getLocalDate(presentTerm.termstartdate);
        let endDate = new CommonUtil().getLocalDate(presentTerm.termenddate);

        return (
            <>
                {inTerm ?
                    <div>
                        <div className="reqterm-set-alert">지금은 신청 기간입니다.</div>
                        <div className="reqterm-set-term-check">신청 기간은 <span className="reqterm-date">{startDate}</span>부터 <span className="reqterm-date">{endDate}</span>까지입니다.</div>
                    </div>
                    :
                    <div className="reqterm-set-alert">지금은 신청기간이 아닙니다.</div>
                }
                {inTerm ? setreqtermend ?
                            <div>신청을 받고 있습니다.<br/>마감 버튼을 눌러주시면 신청이 마감됩니다.</div>
                            :
                            <div>신청을 받고 있지 않습니다.<br/>시작 버튼을 눌러주시면 신청이 가능해집니다.</div>
                    : <div>아직 등록된 신청 기간이 없습니다. 신청 기간을 등록해주세요</div>
                }

                {inTerm &&
                    <div className="reqterm-set-button-wrapper">
                        <Button className="reqterm-set-button"
                                onClick={(e) => this.handleStart(e)} disabled={disabled}
                                style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0", borderRadius:"5px 0 0 5px"}}>
                            시작
                        </Button>
                        <Button className="reqterm-set-button"
                                onClick={(e) => this.handleEnd(e)} disabled={!disabled}
                                style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0", borderRadius:"0 5px 5px 0"}}>
                            마감
                        </Button>
                    </div>
                }
            </>
        );
    }
}

export default ReqtermSet;
