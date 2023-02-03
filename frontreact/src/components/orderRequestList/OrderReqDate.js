import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



class OrderReqDate extends Component {
   constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            startyear: date.getFullYear(),
            startmonth: (date.getMonth()+1),
            endyear: date.getFullYear(),
            endmonth: (date.getMonth()+1)
        }
    }
    
    componentDidMount() {

    }
    onChangeDate = (e) => {
        console.log(e.target)
        e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }

    render() {

       const {startyear,startmonth,endyear,endmonth} = this.state
       return (
           <div>
                <div className="searchdatemargin">
                            <div className="dotmargin"></div>
                            <div className="searchdatemargin" style={{width:'100%'}}>
                            <div className="input-group">
                                <Col xs={4}><span className="input-group-text"><span className="startdatetext">귀속년월</span></span></Col>
                                <Col className="spanaline spanalineright"><span className="startdatetext">{startyear}</span></Col>
                                <Col className="spanaline"><span className="startdatetext">년</span></Col>
                                <Col className="spanaline"><span className="startdatetext">{startmonth}</span></Col>
                                <Col className="spanborderend"><span className="startdatetext">월</span></Col>
                            </div>

                    </div>
                </div>
              
            </div>


    )
    }
}

export default OrderReqDate;