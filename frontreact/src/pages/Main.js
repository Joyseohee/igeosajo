import React, {Component} from "react";
import "../styled/Layouts.css"
import UserMain from "./UserMain";
import AdminMain from "./AdminMain";

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
                // choice = ();
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
