import React, {Component} from 'react';
import '../css/header.css';
import Container from 'react-bootstrap/Container';
import HeaderTitle from '../components/orderProgress/HeaderTitle';
import DateSetting from '../components/orderProgress/DateSetting';
import OrderReqSearch from '../components/orderRequestList/OrderReqSearch';
import OrderReqTable from "../components/orderRequestList/OrderReqTable";



let  defaultstate = 'prevparchase'

class OrderProgress extends Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let startdate = now.getFullYear() + "-" + now.getMonth() + 1+"-"+"01"
        let day = new Date(now.getFullYear(),now.getMonth()+1,0).getDate()
        let enddate = now.getFullYear() + "-" + now.getMonth() + 1+"-"+day

        this.state = {
            posts: [],
            orderdocstate: defaultstate,
            startyear: now.getFullYear(),
            startmonth: now.getMonth() + 1,
            endyear: now.getFullYear(),
            endmonth: now.getMonth() + 1,
            startdate: startdate,
            enddate: enddate,
        }
    }

    componentDidMount() {
        // fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
        //     .then(res => res.json())
        //     .then(data => this.setState({
        //         posts: data
        //     }));
    }

    orderdocsearchstate = (state) => {
        this.setState({orderdocstate: state});
        console.log(state)
        this.forceUpdate();
    };

    datesetting = (startyear, startmonth, endyear, endmonth) => {

        this.setState({startyear: startyear});
        this.setState({startmonth: startmonth});
        this.setState({endyear: endyear});
        this.setState({endmonth: endmonth});

        let syear, smonth, eyear, emonth
        if(startyear<10){
            syear = "000" + startyear
        }
        else if (startyear < 100) {
            syear = "00" + startyear
        } else if (startyear < 1000) {
            syear = "0" + startyear
        } else {
            syear = startyear
        }

        if (startmonth  < 10) {
            smonth = "0" + startmonth
        } else {
            smonth = startmonth
        }
        if(endyear<10){
            eyear = "000" + endyear
        }
        else if (endyear < 100) {
            eyear = "00" + endyear
        } else if (endyear < 1000) {
            eyear = "0" + endyear
        } else {
            eyear = endyear
        }

        if (endmonth  < 10) {
            emonth = "0" + endmonth
        } else {
            emonth = endmonth
        }

        const sdate = new Date(syear, smonth-1 , "01")
        const eday = new Date(eyear, emonth,0).getDate()
        const edate = new Date(eyear, emonth-1 , eday)

        if (startyear < 100) {
            sdate.setFullYear(startyear)
        }
        if (endyear < 100) {
            edate.setFullYear(endyear)
        }

        let strsdate = syear + "-" + smonth+"-"+"01"
        let stredate = eyear + "-" + emonth+"-"+eday

        edate.setHours(23, 59, 59)

        this.setState({startdate: strsdate});
        this.setState({enddate: stredate});

        this.forceUpdate();
    };

    render() {
        const {
            orderdocstate,
            startyear,
            startmonth,
            endyear,
            endmonth,
            startdate,
            enddate
        } = this.state;
        const date = [startyear, startmonth, endyear, endmonth]

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    <HeaderTitle title="구매 신청 목록"></HeaderTitle>
                    <DateSetting date={date} datesetting={this.datesetting}></DateSetting>
                    <OrderReqSearch orderdocsearchstate={this.orderdocsearchstate} startdate={startdate} enddate={enddate}></OrderReqSearch>
                    <OrderReqTable orderdocstate={orderdocstate} startdate={startdate} enddate={enddate}></OrderReqTable>
                </Container>
            </div>
        );
    }
}


export default OrderProgress;