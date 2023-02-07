import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }

        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    };

    handleIncrease = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1,
        }), () => {
            console.log("carcount+: " + this.state.counter);
            this.props.func(this.state.counter, this.props.data);
        });


    }

    handleDecrease = () => {
        this.setState((prevState) => ({
            counter: prevState.counter - 1,
        }), () => {
            console.log("carcount+: " + this.state.counter);
            this.props.func(this.state.counter, this.props.data);
        });


    }

    countReset = () => {
        console.log('countreset')
        this.setState((prevState) => ({
            counter: 0,
        }), () => {
            console.log("carcountreset: " + this.state.counter);

        });
        console.log("carcountresert2: " + this.state.counter);
    }

    render() {
        // const {counter} = this.state;
        // console.log('여기')
        // console.log(counter)
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <h1>{this.props.data}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
            </div>
        );
    }
}

export default Counter;