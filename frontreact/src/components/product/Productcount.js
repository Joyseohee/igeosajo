import React, {Component} from 'react';
import "../../styled/Product.css";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleIncrease = () => {
        this.props.callback1.handleIncrease(this.props.prodnum)
    }
    handleDecrease = () => {
        this.props.callback2.handleDecrease(this.props.prodnum)
    }

    render() {
        const {prodnum, count} = this.props;

        return (<div>
            <div className="inline">
                <button className='btn btn-outline-secondary button_updown' onClick={this.handleDecrease}><div className='textsize1'>-</div></button>
                 &nbsp;<div className='textsize1'>{count}</div> &nbsp;
                <button className='btn btn-outline-secondary button_updown' onClick={this.handleIncrease}><div className='textsize1'>+</div></button>
            </div>
            </div>
        );
    }
}

export default Counter;