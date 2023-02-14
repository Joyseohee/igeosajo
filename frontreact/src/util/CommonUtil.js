import React, {Component} from "react";

export default class CommonUtil extends Component {

    convertDateToReqtermPk = (date) => {
        return date.getFullYear().toString() + ((date.getMonth()+1).toString().length === 2 ? (date.getMonth()+1).toString() : "0" + (date.getMonth()+1).toString());
    };

    convertDateType = (date) => {
        return date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-"+(date.getDate().toString().length===2?date.getDate().toString():"0"+date.getDate().toString());
    }
    getLocalDate = (date) => {
        return date.toString().slice(0, 4)+"년 "+(date.toString().slice(5)==='0'?date.toString().slice(6):date.toString().slice(5, 7))+'월 '+(date.toString().slice(8)===0?date.toString().slice(9):date.toString().slice(8,10))+'일';
    }
    getFirstDayInMonth = (date) => {
        return date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-01";
    }

    getLastDayInMonth = (date) => {
        return date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length===2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-"+(new Date(date.getFullYear(), date.getMonth()+1, 0).getDate());
    }

    convertCalenderDateToReqtermPK = (date) => {
        console.log(date);
        let StringDate = date.toString();
        return StringDate.slice(0, 4)+ StringDate.slice(5, 7);
    }

    convertReqtermPkToYear = (termyearmonth) => {
        return termyearmonth.toString().slice(0, 4);
    }

    convertReqtermPkToMonth = (termyearmonth) => {
        return termyearmonth.toString().slice(4, 5) === "1"  ? termyearmonth.toString().slice(4, 6): termyearmonth.toString().slice(5, 6);
    }

    numberComma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}
