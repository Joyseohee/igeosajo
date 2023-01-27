import React, { Component } from 'react';
import '../../css/header.css'
import OrderProgress from "../../pages/OrderProgress";

let title = ''
class HeaderTitle extends Component {

    constructor(props) {
        super(props);
        title = this.props.title;
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));
    }
    render() {
       return (
             <div className="headermargin">
                 <div className="barmargin"></div>
                 <span className="bartext">{title}</span>
             </div>

    )
    }
}
export default HeaderTitle;