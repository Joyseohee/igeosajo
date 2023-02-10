import React, {Component} from 'react';
import "../styled/etcCss.css"

class SubGoal extends Component {
    render() {

        const {comment, subtitle} = this.props;

        return (
            <div className={"subGoalDiv"}>
                {comment}
                {subtitle !== null && <div style={{fontSize: "1rem"}}>{subtitle}</div>}
            </div>
        );
    }
}

SubGoal.defaultProps = {
    comment: "빈 페이지"
}


export default SubGoal;