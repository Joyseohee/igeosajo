import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

let requestList = [];

class requestTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        fetch('http://127.0.0.1:8000/api/request?reqstate=승인')
            .then(response => response.json())
            .then(response => this.setState({items: response, isLoaded: true}))
    };

    choiceAll(){
        requestList = []

        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;

            if(selectAll[0].checked){
                requestList.push(checkbox.value);
            }
        })

        console.log(requestList);
    }

    choiceUnit(check, val) {
        if (check){
            requestList.push(val);
        }else{
            requestList.pop(val);
        }
        console.log(requestList)
    }

    render() {

        let {isLoaded} = this.state;
        if (!isLoaded) {
            return (<div>Loading...</div>);
        }

        const list = this.state.items.map((list, idx) => (
            <tbody>
            <tr key={list.reqnum}>
                <td>{idx + 1}</td>
                    <td><Form.Check aria-label="option 1" name={"select"} value={list.reqnum} onChange={(e) => {
                        this.choiceUnit(e.target.checked, e.target.value);
                    }}/></td>
                <td>{list.prodname}</td>
                <td>{list.reqcount}</td>
                <td>{list.reqapvdate}</td>
                <td>{list.username}</td>
            </tr>
            </tbody>
        ))

        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th><Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>요청일자</th>
                        <th>요청자</th>
                    </tr>
                    </thead>
                    {list}
                </Table>

            </div>
        );
    }
}

export default requestTable;