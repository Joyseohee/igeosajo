import React, {Component} from 'react';

class test1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/document')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
    };


    render() {
        let {isLoaded} = this.state;
        if (!isLoaded) {
            return (<div>Loading...</div>);
        }

        let lists = this.state.items

        const doclist = lists.map((list) => (
            <div key={list.DOCNUM}>
                <div>
                    <h4>{list.DOCNUM}, {list.REQNUM}</h4>
                </div>
            </div>
        ))

        return (
            <div>
                {console.log(doclist)}
                {doclist}
            </div>
        );
    }
}

export default test1;