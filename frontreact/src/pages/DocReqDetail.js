import React, {Component} from 'react';

class DocReqDetail extends Component {

    constructor(props) {
        super(props);
        this.props.setpagename("전자 결재");
        this.state = {
            reqSend: false
        };
    }

    render() {
        return (
            <div>
                123
            </div>
        );
    }
}

export default DocReqDetail;