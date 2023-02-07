import React, {Component} from 'react';

class RefuseModal extends Component {
    state = {
        counter: 0,
        data: ''
    };
    handleIncrease = () => {

        this.setState((state) => ({
            counter: state.counter + 1,
        }));
        console.log("carcount+: " + this.state.counter)

        this.props.func(this.state.counter + 1, this.props.data);
    };

    handleDecrease = () => {
        this.setState((state) => ({
            counter: state.counter - 1,
        }));
        if (this.state.counter < 1) {
            this.setState((state) => ({
                counter: 0
            }))
        }

        console.log("carcount-: " + this.state.counter)

        this.props.func(this.state.counter-1, this.props.data)
    };

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

export default RefuseModal;