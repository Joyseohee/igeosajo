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

        // fetch('http://127.0.0.1:8000/api/order?func=reqnumget&ordernum=' + ordernum)
        //     .then(res => res.json())
        //     .then(data => {
        //         {
        //             let totalprice = 0
        //             data && data.map((num, i) => (
        //                 fetch('http://127.0.0.1:8000/api/request/' + num.reqnum)
        //                     .then(res => res.json())
        //                     .then(data => {
        //                             this.setState({reqnum: this.state.reqnum.concat(...data)})
        //                             {data && data.map((num, i) => (
        //                                 totalprice = totalprice + parseInt(num.reqprice)
        //                             ))}
        //                             this.setState({totalprice: totalprice})
        //                         }
        //                     )))
        //         }
        //         })

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
            <div>
                <span>Total Price : </span>
                <span>{totalprice && new CommonUtil().numberComma(totalprice)}</span>
            </div>
        )
    }
}


export default TotalPrice;
