import React, { Component } from 'react';
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

import Headertitle from '../components/orderProgress/headerTitle'
import DateSetting from '../components/orderProgress/dateSetting'
import OrderSearch from '../components/orderProgress/orderSearch'
import OrderTable from '../components/orderProgress/OrderTable'
import OrderView from '../components/orderProgress/orderView'


class OrderProgress extends Component {
   constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/order/?func=REQNUMGET&ordernum=3')
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }));
    }
    render() {
        const { posts } = this.state;
        const postsList = posts.map((post) => (
            <div key={post.REQNUM} id={post.REQNUM}>
                <h4>{post.REQNUM}</h4>
            </div>
        ));
        return (
            <div>
                <Container>
                    <Headertitle title="구매 요청 목록"></Headertitle>
                    <DateSetting></DateSetting>
                    <OrderSearch></OrderSearch>
                    <OrderTable></OrderTable>
                    <OrderView></OrderView>
                    <OrderView></OrderView>
                </Container>

                {postsList}
            </div>
        );
    }
}




export default OrderProgress;