import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class DocListSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reqSend: false
        };
    }

    reqSendClick = (e) => {
        this.setState({reqSend: e});
    }

    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <Form.Control
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button id="button-addon2" style={{backgroundColor: "rgb(110, 117, 124)", border:"none"}}>
                        검색
                    </Button>
                </InputGroup>
            </div>
        );
    }
}

export default DocListSearch;