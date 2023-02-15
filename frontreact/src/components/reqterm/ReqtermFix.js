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
        if (this.props.presentTerm !== null && this.props.presentTerm !== undefined) {
            this.setState({
                termstartdate: this.props.presentTerm.termstartdate,
                termenddate: this.props.presentTerm.termenddate,
            })
        } else {
            let date = this.props.today;
            date = new CommonUtil().convertDateType(date);
            this.setState({
                termstartdate: date,
                termenddate: date,
            })
        }
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
        let defaultStart = today ? new CommonUtil().convertDateType(today) : '2023-01-01';
        let defaultEndDate = this.state.termstartdate;
        const minEndDate = this.state.termstartdate;
        const maxDate = today && new CommonUtil().getLastDayInMonth(today);
        const disabled = presentTerm === undefined;
        if (!disabled) {
            defaultStart = presentTerm.termstartdate;
            defaultEndDate = presentTerm.termenddate;
        }

        return (
            <>
                    {!disabled &&
                        <div className="reqterm-alert">이번 달 신청기간이 이미 등록되어있습니다.</div>
                    }
                    <Form className="reqterm-input-wrapper">
                        <div className="reqterm-input-group">
                        <Form.Group className="reqterm-input mb-3" controlId="formStartDate">
                            <Form.Label className="reqterm-input-label">시작일</Form.Label>
                            <Form.Control className="reqterm-input-date"
                                          type="date" value={this.state.termstartdate} name="termstartdate"
                                          min={defaultStart}
                                          max={maxDate}
                                          onChange={(e) => this.setValue(e)}
                                          disabled={!disabled}/>
                        </Form.Group>
                        <Form.Group className="reqterm-input mb-3" controlId="formEndDate">
                            <Form.Label className="reqterm-input-label">마감일</Form.Label>
                            <Form.Control className="reqterm-input-date"
                                          type="date" value={this.state.termenddate} name="termenddate"
                                          min={minEndDate}
                                          max={maxDate}
                                          onChange={(e) => this.setValue(e)}
                                          disabled={!disabled}/>
                        </Form.Group>
</div>
                    <Button className="reqterm-button mb-3" onClick={(e) => this.handleSubmit(e)}
                            style={{backgroundColor: "#8EA6C0", borderColor:"#8EA6C0"}}
                            disabled={!disabled}>
                        설정
                    </Button>
                </Form>
            </>
        );
    }
}

export default ReqtermFix;
