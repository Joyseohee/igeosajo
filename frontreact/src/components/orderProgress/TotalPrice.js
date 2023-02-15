import React, {Component} from 'react';
import CommonUtil from "../../util/CommonUtil";

let ordernum

class TotalPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum : this.props.ordernum,
            totalprice: 0,
        }

    }
    componentDidMount() {

         fetch('http://127.0.0.1:8000/api/order?ordernum=' + this.state.ordernum + '&func=reqdataget')
                .then(res => res.json())
                .then(data => {
                    let totalprice = 0
                    {data && data.map((num, i) => (
                        totalprice = totalprice + parseInt(num.reqprice)
                    ))}
                    this.setState({totalprice: totalprice})
    })
    }
    render() {
        const {totalprice} = this.state
        return (
            <div className={"totalprice"} >
                <span>총 결제금액 : </span>
                <span>{totalprice && new CommonUtil().numberComma(totalprice) + "원"}</span>
            </div>
        )
    }
}


export default TotalPrice;
