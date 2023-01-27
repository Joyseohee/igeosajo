import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HeaderTitle from "./HeaderTitle";





class DateSetting extends Component {
   constructor(props) {
        super(props);
        this.state = {
            posts: [],
            startyear: this.props.date[0],
            startmonth: this.props.date[1],
            endyear: this.props.date[2],
            endmonth: this.props.date[3]
        }
        this.onChangeDateSet = this.onChangeDateSet.bind(this);
        console.log(this.props.date[0])
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));
    }
    dateValueClear(startyeartar,startmonthtar,endyeartar,endmonthtar){
        startyeartar.value = ""
        startmonthtar.value = ""
        endyeartar.value = ""
        endmonthtar.value = ""
    }
    onChangeDate = (e) => {
        console.log(e.target)
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
     onChangeDateSet() {

         let startyeartar = document.getElementById("startyear")
         let startmonthtar = document.getElementById("startmonth")
         let endyeartar = document.getElementById("endyear")
         let endmonthtar = document.getElementById("endmonth")

         let startyear = document.getElementById("startyear").value
         let startmonth = document.getElementById("startmonth").value
         let endyear = document.getElementById("endyear").value
         let endmonth = document.getElementById("endmonth").value

         let now = new Date();

         if (startyear == "" | startmonth == ""|endyear == ""|endmonth == ""){console.log("시작일과 마감일을 정확하게 입력해주세요.")}
         else if((startyear>endyear)|startmonth < 1 | startmonth>12 | endmonth < 1 | endmonth>12){console.log("시작일과 마감일을 정확하게 입력해주세요.")}
         else{
             this.setState({startyear: startyear});
             this.setState({startmonth: startmonth});
             this.setState({endyear: endyear});
             this.setState({endmonth: endmonth});
             console.log("조회기간이 설정되었습니다.")
         }

         this.dateValueClear(startyeartar,startmonthtar,endyeartar,endmonthtar)

        console.log(startyear)
         console.log(startmonth)
         console.log(endyear)
         console.log(endmonth)

    }



    render() {

       const {startyear,startmonth,endyear,endmonth} = this.state
       return (
           <div>
                <div className="searchdatemargin">
                            <div className="dotmargin"></div>
                            <div className="dottext">조회기간</div>
                </div>
               <div className="searchdatemargin">
                        <Row style={{width:'100%'}}>
                            <div className="input-group">

                                <Col xs={3}><span className="input-group-text"><span className="startdatetext">시작일</span></span></Col>
                                <Col className="spanaline spanalineright"><span className="startdatetext">{startyear}</span></Col>
                                <Col className="spanaline"><span className="startdatetext">년</span></Col>
                                <Col className="spanaline"><span className="startdatetext">{startmonth}</span></Col>
                                <Col className="spanborderend"><span className="startdatetext">월</span></Col>

                                <Col  xs={3}><span className="input-group-text"><span className="enddatetext">마감일</span></span></Col>
                                <Col className="spanaline spanalineright"><span className="startdatetext">{endyear}</span></Col>
                                <Col className="spanaline"><span className="startdatetext">년</span></Col>
                                <Col className="spanaline"><span className="startdatetext">{endmonth}</span></Col>
                                <Col className="spanborderend"><span className="startdatetext">월</span></Col>

                            </div>
                        </Row>
                    </div>
                   <div className="searchdatemargin">
                                <div className="dotmargin"></div>
                                <div className="dottext">조회기간 설정</div>
                    </div>
                   <div className="searchdatemargin">
                            <Row style={{width:'100%'}}>
                                <div className="input-group">
                                    <Col xs={2}><span className="input-group-text"><span className="startdatetext">시작일</span></span></Col>
                                    <Col><input type="text"  id="startyear" className="form-control " placeholder="ex)2021 - year"  maxLength='4' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col><input type="text" id="startmonth" className="form-control " placeholder="ex)01 - month" maxLength='2' onChange={(e) => {this.onChangeDate(e)}}/></Col>

                                    <Col xs={2}><span className="input-group-text"><span className="enddatetext">마감일</span></span></Col>
                                    <Col><input type="text"  id="endyear"className="form-control" placeholder="ex)2021 - year" maxLength='4' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col><input type="text"  id="endmonth"className="form-control" placeholder="ex)01 - month" maxLength='2' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col xs={2}><Button className={"settingbtn"} onClick={this.onChangeDateSet} >설정</Button></Col>
                                </div>
                            </Row>
                    </div>
            </div>


    )
    }
}

export default DateSetting;