import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0


        }

        // this.handleIncrease = this.handleIncrease.bind(this);

        this.handleDecrease = this.handleDecrease.bind(this);

    };

    handleIncrease = () => {
        this.props.callback1.handleIncrease(this.props.prodnum)



    }
      handleDecrease = () => {
        this.props.callback2.handleDecrease(this.props.prodnum)

    }
    // handleIncrease = () => {
    // if (this.props.data2 !== 0) {
    //     this.setState((prevState) => ({
    //         counter: prevState.counter + 1,
    //     }), () => {
    //         console.log("carcount+: " + this.state.counter);
    //         this.props.func(this.state.counter, this.props.data);
    //     });
    // } else {
    //     this.setState((prevState) => ({
    //         counter: 0,
    //     }), () => {
    //         console.log("carcount+: " + this.state.counter);
    //         this.props.func(this.state.counter, this.props.data);
    //     });
    //
    //
    // }





    countReset = () => {

            console.log('componentDidUpdate if')
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
        const {prodnum, count} = this.props;

        return (
            <div>
                <h1>{count}</h1>
                {/*<h1>{this.props.data}</h1>*/}
                {/*<h1>{this.props.data2}</h1>*/}

                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
            </div>
        );
    }
}

export default Counter;