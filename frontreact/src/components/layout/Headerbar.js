import React, {Component} from "react";
import "../../styled/Layouts.css";
import {Link} from "react-router-dom";


class Headerbar extends Component {

    render() {
        let {pagename} = this.props;
        return (
            <div className="bar">{pagename}</div>
        );
    }
}

export default Headerbar;



