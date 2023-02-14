import React, {Component} from "react";
import "../../styled/Reqterm.css"
import ReqtermFix from "./ReqtermFix";
import ReqtermSet from "./ReqtermSet";

class Reqbox extends Component {

    render() {
        const {type, usernum, presentTerm, today} = this.props;
        let menuname = "";
        menuname = type === "reqterm-fix" ? "신청 기간 설정" : "신청 시작/마감";
        const getReqtermList = this.props.getReqtermList;

        return (
            <div className="reqterm-box-wrapper">
                <div className="reqterm-box-title">{menuname}</div>
                {today !== null &&
                    <>
                        {type === "reqterm-fix" ?
                            <ReqtermFix usernum={usernum}
                                        presentTerm={presentTerm}
                                        today={today}
                                        getReqtermList={getReqtermList}
                            />
                            :
                            <ReqtermSet usernum={usernum}
                                        presentTerm={presentTerm}
                                        today={today}
                                        getReqtermList={getReqtermList}
                            />
                        }
                    </>
                }
            </div>
        );
    }
}

export default Reqbox;
