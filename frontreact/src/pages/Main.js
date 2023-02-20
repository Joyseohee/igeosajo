import React, {Component} from "react";
// import "../styled/Layouts.css"
import UserMain from "./UserMain";
import AdminMain from "./AdminMain";
import DocApproval from "./DocApproval";

let choice;

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        switch (this.props.user.userathority) {
            case 1 :
                this.props.setpagename("메인");
                choice = (<AdminMain user={this.props.user}/>);
                break;
            case 2 :
                this.props.setpagename("메인");
                choice = (<UserMain user={this.props.user}/>);
                break
            default :
                this.props.setpagename("전자 결재");
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
