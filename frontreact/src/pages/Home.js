import React, {Component} from "react";
import Layouts from "../components/layout/Layouts";
import Requestmain from "./Request";
import "../styled/Layouts.css"

class Home extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("메인");
    }

    render() {
        return (
            <div className="page-top">
                <div>여기?</div>
            </div>
        );
    }
}

export default Home;
