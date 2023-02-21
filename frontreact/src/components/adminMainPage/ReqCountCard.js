import React, {Component} from 'react';
import DocumentIcon from "../../storage/Icon";


class ReqCountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let reqcount = this.props.reqcount

        return (
            <>
                <div className="main-req-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/request")
                    }}>
                        <div className="main-card-title">요청</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count request">{reqcount}</span>
                                <span>{" "}</span>
                                <span className="main-card-text request">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="전체" size={50}/></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ReqCountCard;