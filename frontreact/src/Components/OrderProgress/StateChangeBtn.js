import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import OrderView from "./OrderView";

class StateChangeBtn extends Component {
   constructor(props) {
        super(props);
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
        <div>
             <Row>
                     <div className="btndivmargin">
                         <button type="button" className="btn btn-success submitbutton">불출완료</button>
                         <button type="button" className="btn btn-primary deliverbutton">배송완료</button>
                     </div>
             </Row>
        </div>
    )
    }
}
export default StateChangeBtn;
