import React, {Component} from 'react';
import "../styled/etcCss.css"

class Goal extends Component {
    render() {

        const {comment} = this.props;

        return (
            <div className={"goalDiv"}>
                {comment}
            </div>
        );
    }
}

Goal.defaultProps = {
    comment: "빈 페이지"
}


export default Goal;