import React, { Component } from 'react';

class SubTitle extends Component {
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
        <div></div>
    )
    }
}