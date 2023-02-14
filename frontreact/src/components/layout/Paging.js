import React, {Component} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import "../../styled/etcCss.css"

class Paging extends Component {
    state = {
        start: this.props.pageNum,
    };

    pageBtn = (pageNum, pageCount) => {

        let active = pageNum;
        let items = [];
        let start = this.state.start;
        let end = Math.min(start + 9, Math.ceil(pageCount / 10));

        for (let number = start; number <= end; number++) {
            items.push(
                <Pagination.Item
                    className={"pagingDiv"}
                    key={number}
                    active={number === active}
                    onClick={(e) => {
                        this.props.setPageNum(number);
                    }}

                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };

    handlePrevClick = (pageNum) => {
        if (pageNum > 1) {
            this.props.setPageNum(pageNum - 1);
        }
        this.setState({
            start: Math.max(1, this.state.start - 10),
        });
    };

    handleNextClick = (pageNum, pageCount) => {
        if (pageNum < Math.ceil(pageCount / 10)) {
            this.props.setPageNum(pageNum + 1);
        }

        if ((this.state.start + 10) < Math.ceil(pageCount / 10)) {
            this.setState({
                start: this.state.start + 10,
            });
        }
    };

    render() {
        let pageNum = this.props.pageNum;
        let pageCount = this.props.pageCount;

        return (
            <div className={"paginationDiv"}>
                <Pagination>
                    <Pagination.Prev onClick={() => this.handlePrevClick(pageNum)} style={{fontFamily:"Helvetica Nene"}}/>
                    {this.pageBtn(pageNum, pageCount)}
                    <Pagination.Next onClick={() => this.handleNextClick(pageNum, pageCount)}  style={{fontFamily:"Helvetica Nene"}}/>
                </Pagination>
            </div>
        );
    }
}

export default Paging;

