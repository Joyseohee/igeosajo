import React, {Component} from "react";

class UserMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false
        };
    }

    async componentDidMount() {
        // fetch('http://127.0.0.1:8000/api/document?state=요청상세&docDetail=' + this.props.location.document.detailDocNum)
        //     .then(response => response.json())
        //     .then(response => this.setState({items: response, isLoaded: true}))
        //     .then(response => this.printArr())

        let now = new Date();
        let nowYear = now.getFullYear();
        let nowMonth = now.getMonth();

        console.log(nowYear, " ", nowMonth)

    };

    render() {

        // let {isLoaded} = this.state;
        // if (!isLoaded) {
        //     return (<div>Loading...</div>);
        // }

        return (
            <>

            </>
        );
    }
}

export default UserMain;
