import React, {Component} from 'react';
import "../styled/etcCss.css"

class Goal extends Component {
    render() {

        const {comment, subtitle} = this.props;

        return (
            <div className="goalDiv">
                {comment}
                {subtitle !== null && <div style={{fontSize: "1rem"}}>{subtitle}</div>}
            </div>
        );
    }
}

Goal.defaultProps = {
    comment: "빈 페이지"
}


export default Goal;