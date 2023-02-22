import React, {Component} from 'react';
import DocumentIcon from "../../storage/Icon";


class OrderCountCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let prevparchase = this.props.prevparchase
        let parchase = this.props.parchase

        return (
            <div className="main-order-content">
                <div className="main-order-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/orderreq")
                    }}>
                        <div className="main-card-title">구매 대기</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count wait">{prevparchase}</span><span>{" "}</span>
                                <span className="main-card-text wait">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="대기" size={50}/></div>
                        </div>
                    </div>
                </div>
                <div className="main-order-box">
                    <div className="main-card" onClick={(e) => {
                        this.props.routerpath(e, "/order")
                    }}>
                        <div className="main-card-title">배송 완료</div>
                        <div className="main-card-count-text-wrapper">
                            <p>
                                <span className="main-card-count deliver">{parchase}</span><span>{" "}</span>
                                <span className="main-card-text deliver">건</span>
                            </p>
                            <div className="main-card-icon"><DocumentIcon reqstate="배송완료" size={50}/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderCountCard;