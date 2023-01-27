import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import companyLogo from '../img/headerimage.png';
import all from '../img/allicon.png'
import deliver from '../img/iconsdeliver.png'
import finish from '../img/iconsfinish.png'
import parchase from '../img/iconsparchase.png'
import dot from '../img/icondot.png'
import '../css/header.css'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Headertitle from '../Components/OrderProgress/HeaderTitle'
import DateSetting from '../Components/OrderProgress/DateSetting'
import OrderSearch from '../Components/OrderProgress/OrderSearch'
import StateChangeBtn from '../Components/OrderProgress/StateChangeBtn'
import OrderView from '../Components/OrderProgress/OrderView'

let now = new Date();

class OrderProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            text: 0,
            startyear: now.getFullYear(),
            startmonth: now.getMonth() + 1,
            endyear: now.getFullYear(),
            endmonth: now.getMonth() + 1,


        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));
    }

    changetext = (abc) => {
        const a = abc
        this.setState({text: a});
        console.log(this.state)
        this.forceUpdate();
    };

    datesetting = (startyear, startmonth, endyear, endmonth) => {
        const a = startyear
        this.setState({text: a});
        console.log(this.state)
        this.forceUpdate();
    };

    render() {
        const {posts, text, startyear, startmonth, endyear, endmonth} = this.state;
        const date = [startyear, startmonth, endyear, endmonth]
        const postsList = posts.map((post) => (
            <div key={post.REQNUM} id={post.REQNUM}>
                <h4>{post.REQNUM}</h4>
            </div>
        ));
        return (
            <div>
                <Container fluid style={{margin:0, padding:0}}>
                    <Headertitle title="구매 진행 현황"></Headertitle>
                    <DateSetting date={date}></DateSetting>
                    <OrderSearch changetext={this.changetext}></OrderSearch>
                    <OrderView text={text}></OrderView>

                </Container>

                {postsList}
            </div>
        );
    }
}


export default OrderProgress;