import React, {Component} from "react";

class ProductOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: ''

        }
    }

    onRecent = () => {
        this.setState({
            order: 'recent'
        }, () => ( this.props.callbackOrder(this.state.order)))
    }
    onOld = () => {
        this.setState({
            order: 'old'
        }, () => ( this.props.callbackOrder(this.state.order)))
    }
    onExpen = () => {
        this.setState({
            order: 'expen'
        }, () => ( this.props.callbackOrder(this.state.order)))
    }
    onCheap = () => {
        this.setState({
            order: 'cheap'
        }, () => ( this.props.callbackOrder(this.state.order)))
    }


    render() {
        return (
            <div className='orderbind'>
                <span className='ordertxt' onClick={this.onRecent}>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span className='ordertxt' onClick={this.onOld}>오래된순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span className='ordertxt' onClick={this.onCheap}>가격낮은순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span className='ordertxt' onClick={this.onExpen}>가격높은순</span>
            </div>
        )
    }
}

export default ProductOrder