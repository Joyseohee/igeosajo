import React, {Component} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Api from "../../api/Api";
import CommonUtil from "../../util/CommonUtil";


class ReqtermFix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termstartdate: null,
            termenddate: null,
            termavailable: null,
            disabled: true,
        }
    }

    componentDidMount() {
        let date = this.props.today;
        date = new CommonUtil().convertDateType(date);
        this.setState({
            termstartdate: date,
        })
    }

    setValue = (e) => {
        let date = e.target.value;
        console.log(date);
        this.setState({
            [e.target.name]: date,
            disabled: e.target.name !== "termstartdate",
        })
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
        new Api().create("reqterm", param, null).then((response) => {
            if (response.status === 500) alert("이미 해당 월에 기록이 있습니다.");
            else if (response.status === 200) alert("새로운 신청기간이 등록됐습니다.");
        });
        this.props.getReqtermList();
    }

    render() {
        let defaultStart = new CommonUtil().convertDateType(this.props.today);
        let defaultEndDate = null;
        const disabled = this.props.createAvailable;
        if(!disabled) {
            defaultEndDate = this.props.presentTerm.termenddate;
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
                        <Form.Control type="date" defaultValue={defaultStart} name="termstartdate"
                                      onChange={(e) => this.setValue(e)} disabled={!disabled}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>마감일</Form.Label>
                        <Form.Control type="date" defaultValue={defaultEndDate} name="termenddate" onChange={(e) => this.setValue(e)}
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
