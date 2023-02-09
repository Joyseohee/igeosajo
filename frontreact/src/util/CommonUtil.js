import React, {Component} from "react";

export default class CommonUtil extends Component {

    convertDateToReqtermPk = (date) => {
        console.log(date);
        return date.getFullYear().toString() + ((date.getMonth()+1).toString().length === 2 ? (date.getMonth()+1).toString() : "0" + (date.getMonth()+1).toString());
    };

    convertDateType = (date) => {
        return date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-"+(date.getDate().toString().length===2?date.getDate().toString():"0"+date.getDate().toString());
    }

    convertCalenderDateToReqtermPK = (date) => {
        let StringDate = date.toString();
        console.log(StringDate);
        return StringDate.slice(0, 4)+ StringDate.slice(5, 7);
    }

    convertReqtermPkToYear = (termyearmonth) => {
        return termyearmonth.slice(0, 4);
    }

    convertReqtermPkToMonth = (termyearmonth) => {
        return termyearmonth.slice(4, 5) === "1"  ? termyearmonth.slice(4, 6): termyearmonth.slice(5, 6);
    }


    numberComma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}
