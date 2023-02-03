import React, {Component} from "react";
import "../styled/Layouts.css"
import {Link} from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.props.setpagename("메인");
    }

    render() {
        return (
            <>
                <div className="page-top">
                    <div>여기?</div>
                    <Link to='/request'>request</Link>
                </div>
            </>
        );
    }
}

export default Main;
