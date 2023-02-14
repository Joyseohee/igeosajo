import React, {Component} from 'react';
import '../css/header.css'
import Container from 'react-bootstrap/Container';

import Headertitle from '../components/orderProgress/HeaderTitle'
import DateSetting from '../components/orderProgress/DateSetting'
import OrderSearch from '../components/orderProgress/OrderSearch'
import OrderView from '../components/orderProgress/OrderView'
import Goal from "../components/Goal";
import { withRouter } from 'react-router-dom';


let  defaultstate = 'allselect'
class OrderProgress extends Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let startdate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+"01"
        let day = new Date(now.getFullYear(),(now.getMonth()+1),0).getDate()
        let enddate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+ day

        try {
            if(this.props.location.state.orderstate != null)
            {
                defaultstate = this.props.location.state.orderstate
            }
        } catch (e) {

        }

        this.state = {
            ordernum: [],
            orderstate: defaultstate,
            startyear: now.getFullYear(),
            startmonth: now.getMonth() + 1,
            endyear: now.getFullYear(),
            endmonth: now.getMonth() + 1,
            startdate: startdate,
            enddate: enddate,
            reqdata:[],
            allcnt:0,
            parchasecnt: 0,
            delivercnt: 0,
            finishcnt: 0,
            render:0,
        }
    }

    componentDidMount() {
        this.ordernumdata(this.state.orderstate,this.state.startdate,this.state.enddate)
        this.ordercntdata(this.state.startdate,this.state.enddate)
    }

    datesetting = (startyear, startmonth, endyear, endmonth) => {

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

        this.setState({
            startyear: startyear,
            startmonth: startmonth,
            endyear: endyear,
            endmonth: endmonth,
            startdate: strsdate,
            enddate: stredate
        });
        this.ordernumdata(this.state.orderstate,strsdate,stredate)
        this.ordercntdata(strsdate,stredate)
    };

    ordersearchstate = (state) => {
        this.setState({orderstate: state})
        this.ordernumdata(state,this.state.startdate,this.state.enddate)
        this.ordercntdata(this.state.startdate,this.state.enddate)
    };

    ordernumdata =(state,startdate,enddate)=>{

        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=' + state +'&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({ordernum: data,orderstate: state })
            });
    };
    ordercntdata =(startdate,enddate)=>{
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernumcnt&orderstate=finish&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    allcnt: data[0],
                    parchasecnt: data[1],
                    delivercnt: data[2],
                    finishcnt: data[3]
                })
            });
    };

    render() {
        const {
            ordernum,
            orderstate,
            startyear,
            startmonth,
            endyear,
            endmonth,
            startdate,
            enddate,
            allcnt,
            parchasecnt,
            delivercnt,
            finishcnt,
        } = this.state;
        const date = [startyear, startmonth, endyear, endmonth]
        const ordercnt = [allcnt, parchasecnt, delivercnt, finishcnt]

        return (
            <div>
                <Container fluid style={{margin: 0, padding: 0}}>
                    {/*<Headertitle title="구매 진행 현황"></Headertitle>*/}
                    <Goal comment={"구매 진행 현황"}/>
                    <DateSetting date={date} datesetting={this.datesetting}></DateSetting>
                    <OrderSearch orderstate={this.ordersearchstate} ordercnt={ordercnt} ></OrderSearch>
                    <OrderView ordernum={ordernum} ordercntdata={this.ordercntdata} startdate={startdate} enddate={enddate} ordernumdata={this.ordernumdata} ordersearchstate={this.ordersearchstate} ></OrderView>
                </Container>
            </div>
        );
    }
}
export default withRouter(OrderProgress);