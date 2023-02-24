import React, { Component } from 'react';
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

    render() {

       const {startyear,startmonth,endyear,endmonth} = this.state
       return (
           <div>
                <div className="searchdatemarginreq">

                            <div className="searchdatemarginreq" style={{width:'100%'}}>
                            <div className="input-group" >
                                <Col xs={4}><span className="input-group-text" style={{backgroundColor: "#8EA6C0", border: "none", color:"white", borderRadius: "5px 0 0 5px"}}><span className="startdatetext" >귀속년월</span></span></Col>
                                <Col  className="spanaline spanalineright"><span className="startdatetext">{startyear}</span><span className="startdatetext">년</span></Col>
                                <Col  className="spanaline spanalineright spanborderend"><span className="startdatetext">{startmonth}</span><span className="startdatetext">월</span></Col>
                            </div>

                    </div>
                </div>
              
            </div>


    )
    }
}

export default OrderReqDate;