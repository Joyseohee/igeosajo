import React, {Component} from "react";
import "../../styled/Reqterm.css"
import ReqtermFix from "./ReqtermFix";
import ReqtermSet from "./ReqtermSet";

class Reqbox extends Component {

    render() {
        const {type, usernum, reqtermList, presentTermyearmonth, today} = this.props;
        let menuname = "";
        if (type === "reqterm-fix") menuname = "신청 기간 설정";
        if (type === "reqterm-set") menuname = "신청 시작/마감";
        if (type === "reqterm-list") menuname = "신청 기간 목록";

        return (
            <div className="reqterm-box-wrapper">
                <div>
                    <div>{menuname}</div>
                    {type === "reqterm-fix" ?
                        <>
                            <ReqtermFix usernum={usernum} reqtermList={reqtermList} today={today}
                                        getReqtermList={this.props.getReqtermList}
                                        createAvailable={this.props.createAvailable}
                                        presentTermyearmonth={presentTermyearmonth}
                                        />
                        </>
                        :
                        <>
                            <ReqtermSet usernum={usernum} reqtermList={reqtermList} today={today}
                                        presentTermyearmonth={presentTermyearmonth}
                                        />
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default Reqbox;
