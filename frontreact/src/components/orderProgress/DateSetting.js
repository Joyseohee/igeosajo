import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HeaderTitle from "./HeaderTitle";





class DateSetting extends Component {
   constructor(props) {
        super(props);
        this.state = {
            startyear: this.props.date[0],
            startmonth: this.props.date[1],
            endyear: this.props.date[2],
            endmonth: this.props.date[3]
        }

    }
    
    componentDidMount() {
       document.getElementById('startyear').value = this.props.date[0];
       document.getElementById('startmonth').value = this.props.date[1];
       document.getElementById('endyear').value = this.props.date[2];
       document.getElementById('endmonth').value = this.props.date[3];
    }

    onChangeDate = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
     onChangeDateSet=()=> {

         let startyear = document.getElementById("startyear").value
         let startmonth = document.getElementById("startmonth").value
         let endyear = document.getElementById("endyear").value
         let endmonth = document.getElementById("endmonth").value

         let now = new Date();
         if (startyear == "" | startmonth == ""|endyear == ""|endmonth == ""){this.props.handleshow(true,"시작일과 마감일을 정확하게 입력해주세요.")}
         if((startyear>endyear)|startmonth < 1 | startmonth>12 | endmonth < 1 | endmonth>12){this.props.handleshow(true,"시작일과 마감일을 정확하게 입력해주세요.")}
         else{
             this.setState({
                 startyear: startyear,
                 startmonth: startmonth,
                 endyear: endyear,
                 endmonth: endmonth
             });
             this.props.datesetting(startyear,startmonth,endyear,endmonth)
             this.props.handleshow(true,"조회기간이 정상적으로 설정되었습니다.")
         }
         // this.dateValueClear(startyeartar,startmonthtar,endyeartar,endmonthtar)
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
                            <Row style={{width:'100.5%'}}>
                                <div className="input-group">
                                    <Col xs={2}><span className="input-group-text" style={{backgroundColor:"dodgerblue",color:"white"}}><span className="startdatetext">시작일</span></span></Col>
                                    <Col><input type="text"  id="startyear" className="form-control " placeholder="ex)2021 - year"  maxLength='4' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col><input type="text" id="startmonth" className="form-control " placeholder="ex)01 - month" maxLength='2' onChange={(e) => {this.onChangeDate(e)}}/></Col>

                                    <Col xs={2}><span className="input-group-text" style={{backgroundColor:"dodgerblue",color:"white"}}><span className="enddatetext">마감일</span></span></Col>
                                    <Col><input type="text"  id="endyear"className="form-control" placeholder="ex)2021 - year" maxLength='4' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col><input type="text"  id="endmonth"className="form-control" placeholder="ex)01 - month" maxLength='2' onChange={(e) => {this.onChangeDate(e)}}/></Col>
                                    <Col xs={2}><Button className={"settingbtn"}  onClick={this.onChangeDateSet} >조회</Button></Col>
                                </div>
                            </Row>
                    </div>
            </div>


    )
    }
}

export default DateSetting;