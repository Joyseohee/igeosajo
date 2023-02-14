import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Counter from "./Productcount";
import ProductPostEach from "./ProductPostEach";
import CommonUtil from "../../util/CommonUtil";
import "../../styled/Product.css"

class ProductDetail extends Component {

    ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            productItemList2: [{
                id: 0,
                count: 0
            }],
            prodnumList: this.props.prodnumList,
        }
        ;
        // this.cartcount = this.cartcount.bind(this);
        this.choiceAll = this.choiceAll.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);
    }

    choiceAll() {
        let prodnumList = this.state.prodnumList

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
        let prodnumList = this.state.prodnumList
        const checkboxes = document.getElementsByName('select');
        const checkall = document.getElementsByName('selectAll');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })
        checkall.forEach((state) => {
            state.checked = false
        })
        prodnumList = [];
        this.setState({
            prodnumList: prodnumList
        })
    }


    render() {
        let list = this.props.productItemList.map((list, idx) => (
            <tbody>
                <tr className='tr1' key={list.prodnum}>
                    <td><Form.Check aria-label="option 1" name={"select"}
                                    value={[list.prodnum]}
                                    onChange={(e) => {
                                        this.choiceUnit(e.target.checked, e.target.value);
                                    }} disabled={!list.ccount}/></td>
                    <td>{idx + 1}</td>
                    <td><img className='img1' src={list.prodimg}/></td>
                    <td>{list.prodname}</td>
                    <td>{new CommonUtil().numberComma(list.prodprice)} \</td>
                    <td className='td1'>
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
        return (
            <div>

                <Table className='table1'>
                    <thead>
                    <tr className='table-primary'>

                        <th className='th2'><Form.Check aria-label="option 1" name={"selectAll"}
                                                        onClick={this.choiceAll}/></th>
                        <th className='th2'>No</th>
                        <th className='th1'>이미지</th>
                        <th>품목명</th>
                        <th>가격</th>
                        <th className='th1'>수량</th>
                    </tr>
                    </thead>
                    {list}

                </Table>
                {list.length === 0 ? <div className='nonefoundmsg' >상품이 없습니다 <br/><br/></div>  : null}
            </div>
        );
    }
}

export default ProductDetail;