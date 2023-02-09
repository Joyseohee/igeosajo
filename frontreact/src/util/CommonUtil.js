import React, {Component} from "react";

export default class CommonUtil extends Component {

    convertDateToReqtermPk = (date) => {
        return date.getFullYear().toString() + ((date.getMonth()+1).toString().length === 2 ? (date.getMonth()+1).toString() : "0" + (date.getMonth()+1).toString());
    };

    numberComma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}
