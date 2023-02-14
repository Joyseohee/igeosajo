import React, {Component} from "react";
import "../styled/Layouts.css"
import UserMain from "./UserMain";
import AdminMain from "./AdminMain";
import DocApproval from "./DocApproval";

let choice;

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setpagename("메인");

        switch (this.props.user.userathority) {
            case 1 :
                choice = (<AdminMain user={this.props.user}/>);
                break;
            case 2 :
                choice = (<UserMain user={this.props.user}/>);
                break
            default :
                choice = (<DocApproval user={this.props.user}/>);
        }
    }

    render() {
        return (
            <>
                <div className="page-top">
                    {choice}
                </div>
            </>
        );
    }
}

export default Main;
