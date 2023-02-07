import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import React, {Component} from 'react';
import Product from "../../pages/Product";
import Counter from "../common/cartcount";

class ProductDetail extends Component {

    ref = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            productItemList2: [{
                id: 0,
                count: 0
            }],
            prodnumList: []
        }
        ;
        this.cartcount = this.cartcount.bind(this);
        this.choiceAll = this.choiceAll.bind(this);
        this.choiceUnit = this.choiceUnit.bind(this);
    }

    choiceAll() {
        let prodnumList = this.state.prodnumList


        const checkboxes = document.getElementsByName('select');
        let selectAll = document.getElementsByName('selectAll');

        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAll[0].checked;
            if (selectAll[0].checked) {
                prodnumList.push(parseInt(checkbox.value));
                this.setState({
                    prodnumList: prodnumList
                })
            } else {
                console.log("else1")
                prodnumList = [];
                this.setState({
                    prodnumList: prodnumList
                })
            }
        })
        this.props.func1(prodnumList)
        console.log(prodnumList);
    }

    choiceUnit(check, val) {

        const prodnumList = this.state.prodnumList
        console.log("unit list2")

        if (check) {

            console.log("unit val")
            console.log(val);

            prodnumList.push(parseInt(val));
            //cartcountList.push(parseInt(returnValue.count));
            console.log(prodnumList)
            // console.log(cartcountList)

        } else {
            const prodnumList = this.state.prodnumList
            console.log('else1')
            for (let i = 0; i < prodnumList.length; i++) {
                console.log('else2')

                if (prodnumList[i] === parseInt(val)) {
                    console.log('else3')

                    prodnumList.splice(i, 1);
                    break;
                }
            }

            this.setState({
                prodnumList: prodnumList
            })
            console.log("1: " + prodnumList)

            // console.log("2"+pprodnumList)
        }

        console.log(prodnumList);
        this.props.func1(this.state.prodnumList);
    }

    cartcount = (res, res2) => {
        var {productItemList2} = this.state;
        console.log("cartfunc")
        console.log("count:" + res)
        console.log("prodnum:" + res2)
        console.log("빼기전")

        console.log("state1:" + JSON.stringify(this.state.productItemList2))
        var productItemList3 = productItemList2.filter((productItemList2) => productItemList2.id !== res2);

        productItemList3.push({
            id: res2,
            count: res,
        });
        console.log("뺸후")
        console.log(productItemList3)


        this.setState((prevState) => ({
            productItemList2: productItemList3
        }), () => {
            console.log("state2:" + JSON.stringify(this.state.productItemList2));
            this.props.func2(this.state.productItemList2);
        });

        console.log("뺸후")
        console.log(productItemList3)

        console.log("더한후")
        console.log(productItemList3[res2])
        console.log(productItemList3)

        console.log("state2:" + JSON.stringify(this.state.productItemList2))
        // return {
        //     productItemList2


        //
    }

    callcheck1 = (posted) => {
        console.log('callcheck1')
        console.log(posted)
        if (posted === false) {
            console.log('callcheck1 들어왔음')
            this.ref.current.countReset();
        }
        // })

    }

    render() {
        let list = this.props.productItemList.map((list, idx) => (

            <tbody>
            <tr key={list.prodnum}>
                <td>{idx + 1}</td>
                <td><Form.Check aria-label="option 1" name={"select"}
                                value={[list.prodnum]}
                                onChange={(e) => {
                                    this.choiceUnit(e.target.checked, e.target.value);
                                }}/></td>
                <td>{list.prodname}</td>
                <td>{list.prodnum}</td>
                <td><img src={list.prodimg}/></td>
                <td>{list.prodprice}</td>
                <td><Counter func={this.cartcount}
                             data={list.prodnum} ref={this.ref}></Counter>
                </td>
            </tr>


            </tbody>


        ))
        console.log("list")
        console.log(list);
        // console.log(list.prodnum);
        //console.log(list[0].count);
        return (
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th><Form.Check aria-label="option 1" name={"selectAll"} onClick={this.choiceAll}/></th>
                        <th>품목명</th>
                        <th>번호</th>
                        <th>이미지</th>
                        <th>가격</th>
                        <th>수량</th>
                    </tr>
                    </thead>
                    {list}
                </Table>

            </div>
        );
    }
}

export default ProductDetail;