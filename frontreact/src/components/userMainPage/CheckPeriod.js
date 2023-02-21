import React, {Component} from "react";
import "../../styled/UserMain.css"
import DocumentIcon from "../../storage/Icon";

class CheckPeriod extends Component {
    constructor(props) {
        super(props);
    }

    renderContent = (items) => {
        if (items.length !== 0) {
            return items[0].termavailable === 1 ?
                <>
                    <div className="period-alarm"><DocumentIcon reqstate="기간"/>&nbsp;&nbsp;사무용품 신청기간입니다.</div>
                    <div className="period">
                        신청기간 : {items[0].termstartdate} ~ {items[0].termenddate}
                    </div>
                </>
                :
                <>
                    <div className="period-alarm"><DocumentIcon reqstate="기간아님"/>&nbsp;&nbsp;사무용품 신청기간이 아닙니다</div>
                    <div className="period">
                        신청기간 : {items[0].termstartdate} ~ {items[0].termenddate}
                    </div>
                </>
        }
    }

    render() {

        let items = this.props.items;

        return (
            <div className={"checkPeriodDiv"}>
                {this.renderContent(items)}
            </div>
        );
    }
}

export default CheckPeriod;
