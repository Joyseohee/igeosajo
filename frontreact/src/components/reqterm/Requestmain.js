import React, {Component} from "react";
import Reqbox from "./Reqbox";

class Requestmain extends Component {
    render() {
        return (
            <div className="reqterm-wrapper">
                <div>타이틀</div>
                <Reqbox type="reqterm-fix"/>
                <Reqbox type="reqterm-set"/>
            </div>
        );
    }
}

export default Requestmain;
