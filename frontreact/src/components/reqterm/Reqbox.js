import React, {Component} from "react";
import "../../styled/Reqterm.css"

class Reqbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
        };
    }
    render() {
        const {type} = this.state;

        return (
            <div className="reqterm-box-wrapper">
                {type=="reqterm-fix" && (<>신청기간 설정</>)
                }

                 {type=="reqterm-set" && (<>신청기간 시작/마감</>)
                }

            </div>
        );
    }
}

export default Reqbox;
