import React, {Component} from "react";
import Header from "./Header";
import "../../styled/Layouts.css"
import Sidebar from "./Sidebar";

class Layouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userdept: "",
            userposition: "",
            userathority: 3,
        }
    }

    async componentDidMount() {
        if (this.props.usernum !== "fakenum") {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + this.props.usernum);
                const data = await response.json();
                await this.setState({
                    username: data[0].username,
                    userdept: data[0].userdept,
                    userposition: data[0].userposition,
                    userathority: data[0].userathority,
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.usernum !== this.props.usernum && this.props.usernum !== "fakenum") {
            const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + this.props.usernum);
            const data = await response.json();
            await this.setState({
                username: data[0].username,
                userdept: data[0].userdept,
                userposition: data[0].userposition,
                userathority: data[0].userathority,
            });
        }
    }

    render() {
        const {usernum, pagename} = this.props;
        const userinfo = this.state;
        const {userathority} = this.state;
        console.log(userathority);
        return (
            <>
                <Header pagename={pagename} usernum={usernum} userinfo={userinfo}/>
                <div className="container-content">
                    {userathority !== 3 && <Sidebar userathority={userathority}/>}
                    <div className="container-main">{this.props.children}</div>
                </div>
            </>
        )
    }
}

export default Layouts;
// <div className="page-top">