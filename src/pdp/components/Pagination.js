import React, { Component } from "react";
import styles from "./ProductReviewPage.css";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumbers: this.props.pageNumbers,
            totalpagenumbers: Math.ceil(this.props.totalPost / this.props.postPerPage),
        };
    }

    handleClick(number) {
        let total = Math.ceil(this.props.totalPost / this.props.postPerPage);
        let pageNumbers = [];
        let sum = number + 4 - total;
        let last = number + 4 >= 10 ? number + 4 : 10;
        let first = number + 4 > 10 ? (number + 4 > total ? number - 4 - sum : number - 4) : 2;
        if (number + 4 > 10 && number !== "...") {
            pageNumbers = this.pushdata(first, last);
            pageNumbers.unshift("...");
            pageNumbers.unshift(1);
            this.setState({
                pageNumbers: pageNumbers,
            });
        } else {
            pageNumbers = this.pushdata(1, last);
            this.setState({
                pageNumbers: pageNumbers,
            });
        }
        number === "..." ? this.props.handleClick(2) : this.props.handleClick(number);
    }

    prevClick(event) {
        let total = Math.ceil(this.props.totalPost / this.props.postPerPage);
        let self = this;
        let state = this;
        let pageNumbers = [];
        this.props.prevClick(event, function(data) {
            let sum = data + 4 - total;
            let last = data + 4 >= 10 ? data + 4 : 10;
            let first = data + 4 > 10 ? (data + 4 > total ? data - 4 - sum : data - 4) : 2;
            if (data + 4 > 10) {
                pageNumbers = self.pushdata(first, last);
                pageNumbers.unshift("...");
                pageNumbers.unshift(1);
                state.setState({
                    pageNumbers: pageNumbers,
                });
            } else {
                pageNumbers = self.pushdata(1, last);
                state.setState({
                    pageNumbers: pageNumbers,
                });
            }
        });
    }

    nextClick(event) {
        let total = Math.ceil(this.props.totalPost / this.props.postPerPage);
        let pageNumbers = [];
        let self = this;
        let state = this;
        this.props.prevClick(event, function(data) {
            let sum = data + 4 - total;
            let last = data + 4 >= 10 ? data + 4 : 10;
            let first = data + 4 > 10 ? (data + 4 > total ? data - 4 - sum : data - 4) : 2;
            if (data + 4 > 10) {
                pageNumbers = self.pushdata(first, last);
                pageNumbers.unshift("...");
                pageNumbers.unshift(1);
                state.setState({
                    pageNumbers: pageNumbers,
                });
            } else {
                pageNumbers = self.pushdata(1, last);
                state.setState({
                    pageNumbers: pageNumbers,
                });
            }
        });
    }

    pushdata(start, size) {
        let pageNumbers = [];
        for (let i = start; i <= size; i++) {
            if (this.state.totalpagenumbers >= i) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    }

    componentDidMount() {
        let pageNumbers = [];
        let totalpagenumbers = Math.ceil(this.props.totalPost / this.props.postPerPage);
        for (let i = 1; i <= totalpagenumbers; i++) {
            if (i <= 10) {
                pageNumbers.push(i);
            }
        }
        this.setState({
            pageNumbers: pageNumbers,
        });
    }

    render() {
        return (
            <div className={styles.pagination}>
                <div className={styles.pageInfo}>
                    <div className={styles.pageInfoText}>
                        {" "}
                        Page <span className={styles.currentPageNumber}>{this.props.pageNumber}</span> of{" "}
                        {this.state.totalpagenumbers}{" "}
                    </div>
                </div>
                <div className={styles.paginationHolder}>
                    <div
                        className={
                            this.props.pageNumber > 1 ? styles.continueButtonHolder : styles.continueHiddenButtonHolder
                        }
                    >
                        <div
                            className={styles.previousButton}
                            onClick={() => this.prevClick(true, this.props.pageNumber)}
                        >
                            PREVIOUS
                        </div>
                    </div>
                    {this.state.pageNumbers.length > 1 && (
                        <ul className={styles.listHolder}>
                            {this.state.pageNumbers.map(number => {
                                return (
                                    <l1
                                        id={number}
                                        key={number}
                                        className={
                                            this.props.pageNumber === number ? styles.activePageIteam : styles.pageIteam
                                        }
                                        onClick={() => this.handleClick(number)}
                                    >
                                        {number}
                                    </l1>
                                );
                            })}
                        </ul>
                    )}
                    <div
                        className={
                            this.state.totalpagenumbers > this.props.pageNumber
                                ? styles.continueButtonHolder
                                : styles.continueHiddenButtonHolder
                        }
                    >
                        <div className={styles.nextButton} onClick={() => this.nextClick(false, this.props.pageNumber)}>
                            NEXT
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
