import React, {Component} from 'react';
import {Container, Row, Col, Button, Form} from "react-bootstrap";
import "../styled/LoginCss.css"
import {withRouter} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userPwd: "",
            logined: 'N',
        };
    }

    loginClick = () => {
        let data;
        if (!this.state.userId) {
            alert("아이디를 입력하세요")
        } else if (!this.state.userPwd) {
            alert("비밀번호를 입력하세요")
        } else {
            fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: this.state.userId,
                    userpwd: this.state.userPwd
                }),
            }).then((response) => {
                return response.json()
            }).then((response) => {
                let data = response["secretcode"];
                if (data === "0") {
                    alert("아이디 또는 비밀번호가 맞지 않습니다.")
                } else {
                    localStorage.setItem("secretcode", data);
                    this.setState({
                        logined: 'Y',
                    })
                }
            });
        }
    }

    componentDidMount() {
        this.props.setpagename("로그인");
    }

    componentDidUpdate(preState) {
        if (preState.logined !== this.state.logined && this.state.logined === 'Y') {
            this.props.changeLogined('Y');
            this.props.history.push('/main');
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.loginClick();
        }
    }

    render() {
        return (
            <div className={"loginDiv"}>
                <div className="login-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="rgb(150, 150, 150)"
                         className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                </div>
                <Container className="panel">

                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextId">
                            <Col sm>
                                <Form.Control className={"userid"} type="text" placeholder="UserID"
                                              onChange={(e) => {
                                                  this.setState({userId: e.target.value});
                                              }}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm>
                                <Form.Control className={"userpwd"} type="password" placeholder="Password"
                                              onChange={(e) => {
                                                  this.setState({userPwd: e.target.value});
                                              }}
                                              onKeyUp={(e) => {
                                                  this.handleKeyDown(e);
                                              }}
                                />
                            </Col>
                        </Form.Group>
                        <br/>

                        <div className="d-grid gap-1">
                            <Button style={{backgroundColor: "#1C91FB", border: "none"}}
                                    onClick={() => {
                                        this.loginClick();
                                    }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);