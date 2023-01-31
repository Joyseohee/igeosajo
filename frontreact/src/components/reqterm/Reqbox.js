import React, {Component} from "react";
import "../../styled/Reqterm.css"
import {Form, Button} from "react-bootstrap";

class Reqbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            termyearmonth: "",
            termstartdate: "",
            termenddate: "",
            termavailable: 0,
            usernum: 2,
        };
    }

    setValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        let termyearmonth = this.state.termstartdate.slice(0, 4);
        termyearmonth += this.state.termstartdate.slice(5, 7);
        console.log(termyearmonth);
        fetch("http://127.0.0.1:8000/api/reqterm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "termyearmonth": termyearmonth,
                "termstartdate": this.state.termstartdate,
                "termenddate": this.state.termenddate,
                "termavailable": 0,
                "usernum": this.state.usernum,
            })
        })
            .then(res => {
                console.log(res)
                return res;
            })
            .then(res => {
                console.log(res.status);
            });
    }

    handleStart = (e) => {
        fetch("http://127.0.0.1:8000/api/reqterm/" + "202303", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "termavailable": 1,
                "usernum": this.state.usernum,
            })
        })
            .then(res => {
                console.log(res)
                return res;
            })
            .then(res => {
                console.log(res);
            });
    }

    handleEnd = (e) => {
        fetch("http://127.0.0.1:8000/api/reqterm/" + "202303", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "termavailable": 0,
                "usernum": this.state.usernum,
            })
        })
            .then(res => {
                console.log(res)
                return res;
            })
            .then(res => {
                console.log(res);
            });
    }

    async componentDidMount() {
        (this.props.type === "reqterm-fix") &&
        this.setState({
            menuname: "신청 기간 설정",
        });
        (this.props.type === "reqterm-set") &&
        this.setState({
            menuname: "신청 시작/마감",
        })
        const response = await fetch("http://127.0.0.1:8000/api/user?usernum=" + this.state.usernum, {
            method: "GET",
        });
        const data = await response.json();
        this.setState({
            termyearmonth: data[0].termyearmonth,
            termstartdate: data[0].termstartdate,
            termenddate: data[0].termenddate,
            termavailable: data[0].termavailable,
            usernum: data[0].usernum,
        });

        console.log(this.state.termyearmonth);
    }


    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.termavailable !== this.state.termavailable) {
    //         this.setState({
    //             termyearmonth: this.state.termyearmonth,
    //             termstartdate: this.state.termstartdate,
    //             termenddate: this.state.termenddate,
    //             termavailable: this.state.termavailable,
    //             usernum: this.state.usernum,
    //         })
    //     }
    // }

    render() {
        return (
            <div className="reqterm-box-wrapper">
                <div>
                    {this.state.menuname}
                    <div>
                        {this.state.type === "reqterm-fix" &&
                            // <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form>
                                <br/>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>시작일</Form.Label>
                                    <Form.Control type="date" name="termstartdate" onBlur={(e) => this.setValue(e)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>마감일</Form.Label>
                                    <Form.Control type="date" name="termenddate" onBlur={(e) => this.setValue(e)}/>
                                </Form.Group>
                                <Button onClick={(e) => this.handleSubmit(e)} style={{backgroundColor: "rgb(82, 150, 213)", borderColor:"rgb(82, 150, 213)"}}>
                                    설정
                                </Button>
                            </Form>
                        }
                        {this.state.type === "reqterm-set" &&
                            <>
                                <div></div>
                                <Form>
                                    <br/>
                                    <Button onClick={(e) => this.handleStart(e)} style={{backgroundColor: "rgb(82, 150, 213)", borderColor:"rgb(82, 150, 213)"}}>
                                        시작
                                    </Button><br/><br/>
                                    <Button onClick={(e) => this.handleEnd(e)} style={{backgroundColor: "rgb(82, 150, 213)", borderColor:"rgb(82, 150, 213)"}}>
                                        마감
                                    </Button>
                                </Form>
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Reqbox;
