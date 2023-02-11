import React, {Component} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Api from "../../api/Api";
import CommonUtil from "../../util/CommonUtil";


class ReqtermFix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termstartdate: '2023-01-01',
            termenddate: '2023-01-01',
        }
    }

    componentDidMount() {
        let date = this.props.today;
        date = new CommonUtil().convertDateType(date);
        this.setState({
            termstartdate: date,
            termenddate: date,
        })
    }

    setValue = (e) => {
        if (e.target.name === "termstartdate") {
            let date = e.target.value;
            this.setState({
                termstartdate: date,
                termenddate: date,
            });
        } else {
            let date = e.target.value;
            this.setState({
                termenddate: date,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let termyearmonth = new CommonUtil().convertCalenderDateToReqtermPK(this.state.termstartdate);
        const param = {
            "termyearmonth": termyearmonth,
            "termstartdate": this.state.termstartdate,
            "termenddate": this.state.termenddate,
            "termavailable": 0,
            "usernum": this.props.usernum,
        };
        new Api().create("reqterm", param, null)
            .then((response) => {
                if (response.status === 200) alert("새로운 신청기간이 등록됐습니다.");
            }).then(() => {
            this.props.getReqtermList();
        });
    }


    render() {
        const {today, presentTerm} = this.props;
        let defaultStart = today ? new CommonUtil().convertDateType(today): '2023-01-01';
        let defaultEndDate = this.state.termstartdate;
        const minEndDate = this.state.termstartdate;
        const maxDate = today && new CommonUtil().getLastDayInMonth(today);
        const disabled = presentTerm === undefined;
        if (!disabled) {
            console.log("여기탐");
            defaultStart = presentTerm.termstartdate;
            defaultEndDate = presentTerm.termenddate;
        }

        return (
            <>
                <Form>
                    <br/>
                    {!disabled &&
                        <Alert>이번 달 신청기간이 이미 등록돼있습니다.</Alert>
                    }
                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>시작일</Form.Label>
                        <Form.Control type="date" value={this.state.termstartdate} name="termstartdate"
                                      min={defaultStart}
                                      max={maxDate}
                                      onChange={(e) => this.setValue(e)}
                                      disabled={!disabled}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>마감일</Form.Label>
                        <Form.Control type="date" value={this.state.termenddate} name="termenddate"
                                      min={minEndDate}
                                      max={maxDate}
                                      onChange={(e) => this.setValue(e)}
                                      disabled={!disabled}/>
                    </Form.Group>
                    <Button onClick={(e) => this.handleSubmit(e)}
                            style={{backgroundColor: "rgb(82, 150, 213)", borderColor: "rgb(82, 150, 213)"}}
                            disabled={!disabled}>
                        설정
                    </Button>
                </Form>
            </>
        );
    }
}

export default ReqtermFix;
