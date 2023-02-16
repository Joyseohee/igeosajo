import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Counter from "./Productcount";
import ProductPostEach from "./ProductPostEach";
import CommonUtil from "../../util/CommonUtil";
import "../../styled/Product.css"

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodnumList: [],
        }
        ;
        // this.cartcount = this.cartcount.bind(this);
        this.choiceAll = this.choiceAll.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);
    }
    ref = React.createRef();
    choiceAll() {
        let prodnumList = []

        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            if (checkbox.disabled) {
                checkbox.checked = false
            }
            if (selectAll[0].checked) {
                if (checkbox.checked) {
                    prodnumList.push(parseInt(checkbox.value));
                    this.setState({
                        prodnumList: prodnumList
                    }, () => {
                        this.props.func1(this.state.prodnumList)
                    })
                }
            } else {
                prodnumList = []
                this.setState({
                    prodnumList: prodnumList
                }, () => {
                    this.props.func1(this.state.prodnumList)
                })
            }
        })
    }

    choiceUnit(check, val) {

        const prodnumList = this.state.prodnumList

        if (check) {
            prodnumList.push(parseInt(val));
        } else {
            const prodnumList = this.state.prodnumList

            for (let i = 0; i < prodnumList.length; i++) {

                if (prodnumList[i] === parseInt(val)) {
                    prodnumList.splice(i, 1);
                    break;
                }
            }
        }

        this.setState({
            prodnumList: prodnumList
        }, () => {
            this.props.func1(this.state.prodnumList);
        })
    }

    checkcleanall = () => {

        const checkboxes = document.getElementsByName('select');
        const checkall = document.getElementsByName('selectAll');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })
        checkall.forEach((state) => {
            state.checked = false
        })
        let prodnumList = [];
        this.setState({
            prodnumList: prodnumList
        })
    }


    setList = (productItemList) => {
        return (
            productItemList.map((list, idx) => (
                <tbody key={list.prodnum}>
                <tr className='tr1' >
                    <td className='prdth2'><Form.Check aria-label="option 1" name={"select"}
                                    value={[list.prodnum]}
                                    onChange={(e) => {
                                        this.choiceUnit(e.target.checked, e.target.value);
                                    }} disabled={!list.ccount}/></td>
                    <td className='prdth2'>{idx + 1}</td>
                    <td className='prdth1'><img className='img1' src={list.prodimg}/></td>
                    <td className='prdth3' style={{textAlign: "left"}}>{list.prodname}<br/><br/>
                        <div style={{fontSize: "7px"}}> {list.category1name}>>{list.category2name}</div>
                    </td>
                    <td className='prdth1'>\ {new CommonUtil().numberComma(list.prodprice)}</td>
                    <td className='prdth1'>
                        <div className='inline'>
                            <Counter name="counter"
                                     func={this.cartcount}
                                     data={list.prodnum}
                                     count={list.ccount}
                                     prodnum={list.prodnum}
                                     callback1={this.props.callback1}
                                     callback2={this.props.callback2}/> &nbsp;
                            <ProductPostEach prodnum={list.prodnum} count={list.ccount} usernum={this.props.usernum}
                                             postcheck={this.props.postcheck} modalInfo={this.props.modalInfo}/>
                        </div>
                    </td>
                </tr>
                </tbody>
            ))
        )
    }

    render() {
        let list
        if (this.props.productItemList.length !== 0) {
            list = this.setList(this.props.productItemList)
        }

        return (
            <div>
                <Table bordered className='table1'>
                    <thead>
                    <tr className='doclistTh'>

                        <th ><Form.Check aria-label="option 1" name={"selectAll"}
                                                           onClick={this.choiceAll}/></th>
                        <th className='prdth2'>No</th>
                        <th className='prdth1'>이미지</th>
                        <th className='prdth3'>품목명</th>
                        <th className='prdth1'>가격</th>
                        <th className='prdth1'>수량</th>
                    </tr>
                    </thead>
                    {list}
                </Table>
                <div className='nonefoundmsg'>{this.props.message}<br/><br/></div>
            </div>
        )
    }
}

export default ProductDetail;