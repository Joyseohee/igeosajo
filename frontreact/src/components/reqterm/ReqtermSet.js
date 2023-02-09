import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import Api from "../../api/Api";

class ReqtermSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termyearmonth: null,
            termyear: null,
            termmonth: null,
            inTerm: false,
            setreqtermstart: false,
            setreqtermend: false,
        }
        this.setBasicReqterm = this.setBasicReqterm.bind(this);
    }

    async componentDidMount() {
        this.setBasicReqterm();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.termyearmonth !== this.state.termyearmonth) {
            const termyear = this.state.termyearmonth.toString().slice(0, 4) + "년";
            const termmonth = this.state.termyearmonth.toString().slice(4, 7) + "월";
            this.setState((state) => ({
                termyear: termyear,
                termmonth: termmonth,
            }))
        }
    }

    async setBasicReqterm() {
        let date = new Date()
        const response = await new Api().read("reqterm", null, null);
        const data = await response.json();
        await this.setState({
            termyearmonth: data[0].termyearmonth,
        })
        data.map((dates) => {
            if (new Date(dates.termstartdate) < date && new Date(dates.termenddate) > date) {
                this.setState({
                    inTerm: true,
                    termyearmonth: dates.termyearmonth,
                })
            }
        })
    }

    handleStart = (e) => {
        const params = {
            "usernum": this.props.usernum,
            "termavailable": 1,
        }
        this.setState({
            setreqtermstart: true,
        })
        new Api().update("reqterm", params, this.state.termyearmonth);
    }

    handleEnd = (e) => {
        const params = {
            "usernum": this.props.usernum,
            "termavailable": 0,
        }
        this.setState({
            setreqtermstart: false,
        })
        new Api().update("reqterm", params, this.state.termyearmonth);
    }

    render() {
        const inTerm = this.state.inTerm;
        const setreqtermstart = this.state.setreqtermstart;
        const setreqtermend = this.state.setreqtermend;
        const termyear = this.state.termyear;
        const termmonth = this.state.termmonth;
        return (
            <>
                {termyear && <div>가장 가까운 신청기간은 {termyear + " " + termmonth}입니다.</div>}
                {inTerm === true ? <div>지금은 신청 기간입니다.</div> : <div>지금은 신청기간이 아닙니다.</div>}
                {inTerm && setreqtermstart ?
                    <div>신청을 받고 있습니다.</div> : setreqtermend ?
                        <div>마감 버튼을 눌러주시면 신청이 마감됩니다.</div> : <div>시작 버튼을 눌러주시면 신청이 가능해집니다.</div>}

                <Button onClick={(e) => this.handleStart(e)}
                        style={{backgroundColor: "rgb(82, 150, 213)", borderColor: "rgb(82, 150, 213)"}}>
                    시작
                </Button><br/><br/>
                <Button onClick={(e) => this.handleEnd(e)}
                        style={{backgroundColor: "rgb(82, 150, 213)", borderColor: "rgb(82, 150, 213)"}}>
                    마감
                </Button>
            </>
        );
    }
}

export default ReqtermSet;
