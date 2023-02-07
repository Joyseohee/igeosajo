import React, {Component} from 'react';
import '../css/header.css'
import Container from 'react-bootstrap/Container';

import Headertitle from '../components/orderProgress/HeaderTitle'
import DateSetting from '../components/orderProgress/DateSetting'
import OrderSearch from '../components/orderProgress/OrderSearch'
import OrderView from '../components/orderProgress/OrderView'

let  defaultstate = 'allselect'
class OrderProgress extends Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let startdate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+"01"
        let day = new Date(now.getFullYear(),(now.getMonth()+1),0).getDate()
        let enddate = now.getFullYear() + "-" + (now.getMonth() + 1)+"-"+ day

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
        }
        this.ordernumdata = this.ordernumdata.bind(this)
        this.ordercntdata = this.ordercntdata.bind(this)

    }

    componentDidMount() {
        this.ordernumdata(this.state.orderstate,this.state.startdate,this.state.enddate)
        this.ordercntdata(this.state.startdate,this.state.enddate)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
         if (this.state.orderstate !== prevState.orderstate) {
            this.setState({orderstate : this.state.orderstate});
            console.log(this.state.orderstate)
        }
         if (this.state.ordernum !== prevState.ordernum) {
            this.setState({ordernum : this.state.ordernum});
            console.log(this.state.ordernum)
        }
    }

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
        //console.log(this.state.orderstate)
        this.ordernumdata(this.state.orderstate,strsdate,stredate)
        this.ordercntdata(strsdate,stredate)
    };

    ordersearchstate = (state) => {
        this.setState({orderstate: state});
        this.ordernumdata(state,this.state.startdate,this.state.enddate)
        this.ordercntdata(this.state.startdate,this.state.enddate)
    };

    ordernumdata (state,startdate,enddate){
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=' + state +'&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({ordernum: data})
                console.log(this.state.ordernum)
            });
    };
    ordercntdata (startdate,enddate){
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=allselect&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({allcnt: data.length})
            })
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=parchase&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({parchasecnt: data.length})
            })
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=deliver&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({delivercnt: data.length})
            });
        fetch('http://127.0.0.1:8000/api/order?func=distinctordernum&orderstate=finish&startdate='+startdate+'&enddate='+enddate)
            .then(res => res.json())
            .then(data => {
                this.setState({finishcnt: data.length})
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
                    <Headertitle title="구매 진행 현황"></Headertitle>
                    <DateSetting date={date} datesetting={this.datesetting}></DateSetting>
                    <OrderSearch orderstate={this.ordersearchstate} ordercnt={ordercnt} ></OrderSearch>
                    <OrderView ordernum={ordernum} ></OrderView>
                </Container>
            </div>
        );
    }
}
export default OrderProgress;