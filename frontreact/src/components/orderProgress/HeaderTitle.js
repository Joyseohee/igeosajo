import React, { Component } from 'react';
import '../../styled/Order.css'


let title = ''
class HeaderTitle extends Component {

    constructor(props) {
        super(props);
        title = this.props.title;
        this.state = {

        }
    }
    componentDidMount() {

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