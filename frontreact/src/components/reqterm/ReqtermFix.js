import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import Api from "../../api/Api";

class ReqtermFix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "termyearmonth": null,
            "termstartdate": null,
            "termenddate": null,
            "termavailable": null,
            disabled: true,
        }
    }

    setValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        if(e.target.name === "termstartdate") {
            this.setState({
                disabled: false,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let termyearmonth = this.state.termstartdate.slice(0, 4);
        termyearmonth += this.state.termstartdate.slice(5, 7);
        const param = {
            "termyearmonth": termyearmonth,
            "termstartdate": this.state.termstartdate,
            "termenddate": this.state.termenddate,
            "termavailable": 0,
            "usernum": this.props.usernum,
        };
        new Api().create("reqterm", param, null).then((response)=>{
             if(response.status === 500) alert("이미 해당 월에 기록이 있습니다.");
             else if(response.status === 200) alert("새로운 신청기간이 등록됐습니다.");

        });
    }

    render() {
        return (
            <>
                <Form>
                    <br/>
                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>시작일</Form.Label>
                        <Form.Control type="date" name="termstartdate" onChange={(e) => this.setValue(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>마감일</Form.Label>
                        <Form.Control type="date" name="termenddate" onChange={(e) => this.setValue(e)} disabled={this.state.disabled}/>
                    </Form.Group>
                    <Button onClick={(e) => this.handleSubmit(e)}
                            style={{backgroundColor: "rgb(82, 150, 213)", borderColor: "rgb(82, 150, 213)"}}>
                        설정
                    </Button>
                </Form>
            </>
        );
    }
}

export default ReqtermFix;
