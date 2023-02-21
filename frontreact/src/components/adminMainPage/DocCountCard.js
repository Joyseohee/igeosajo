import React, {Component} from 'react';
import "../../styled/etcCss.css"
import DocumentIcon from "../../storage/Icon";

class DocCountCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let docsubmit = this.props.docsubmit
        let reject = this.props.reject
        let approval = this.props.approval
        return (
            <div className="main-order-content">
                <div className="main-order-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/docsubmit")
                    }}>
                        <div className="main-card-title">상신 완료</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count wait">{docsubmit}</span><span>{" "}</span>
                                <span className="main-card-text wait">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="대기" size={50}/></div>
                        </div>
                    </div>
                </div>
                <div className="main-order-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/docreject")
                    }}>
                        <div className="main-card-title">결재 반려</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count reject">{reject}</span><span>{" "}</span>
                                <span className="main-card-text reject">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="반려" size={50}/></div>
                        </div>
                    </div>
                </div>
                <div className="main-order-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/docapproval")
                    }}>
                        <div className="main-card-title">결재 완료</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count approve">{approval}</span><span>{" "}</span>
                                <span className="main-card-text approve">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="승인" size={50}/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DocCountCard;