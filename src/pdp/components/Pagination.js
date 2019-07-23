import React, { Component } from "react";
import styles from "./ProductReviewPage.css";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: this.props.pageNumbers,
      totalpagenumbers: Math.ceil(this.props.totalPost / this.props.postPerPage)
    };
  }
  handleClick(number) {
    let pageNumbers = [];
    if (this.state.totalpagenumbers > 10) {
      pageNumbers = this.pushdata(number - 4, number + 4);
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);

      this.setState({
        pageNumbers: pageNumbers
      });
    } else if (number < 10) {
      this.setState({ pageNumbers: this.pushdata(1, 10) });
    } else {
      let endNumbers =
        number + 4 > this.state.totalpagenumbers
          ? this.state.totalpagenumbers
          : this.state.totalpagenumbers - 4;
      let startnumbers =
        number + 4 > this.state.totalpagenumbers
          ? 4 + (number + 4 - this.state.totalpagenumbers)
          : number;
      pageNumbers = this.pushdata(startnumbers, endNumbers);
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
      this.setState({
        pageNumbers: pageNumbers
      });
    }

    this.props.handleClick(number);
  }

  prevClick(event) {
    let self = this;
    let state = this;
    let pageNumbers = [];
    this.props.prevClick(event, function(data) {
      if (data < 10) {
        state.setState({
          pageNumbers: self.pushdata(1, 10)
        });
      } else {
        if (data > 10) {
          pageNumbers = self.pushdata(data - 4, data + 4);
          pageNumbers.unshift("...");
          pageNumbers.unshift(1);
          state.setState({
            pageNumbers: pageNumbers
          });
        }
      }
    });
  }

  nextClick(event) {
    let pageNumbers = [];
    let self = this;
    let state = this;
    this.props.prevClick(event, function(data) {
      if (data >= 10) {
        pageNumbers = self.pushdata(data - 4, data + 4);
        pageNumbers.unshift("...");
        pageNumbers.unshift(1);
        state.setState({
          pageNumbers: pageNumbers
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
    let totalpagenumbers = Math.ceil(
      this.props.totalPost / this.props.postPerPage
    );
    for (let i = 1; i <= totalpagenumbers; i++) {
      if (i <= 10) {
        pageNumbers.push(i);
      }
    }
    this.setState({
      pageNumbers: pageNumbers
    });
  }
  render() {
    return (
      <div className={styles.pagination}>
        <div className={styles.pageInfo}>
          <div className={styles.pageInfoText}>
            {" "}
            Page {`${this.props.pageNumber} of  ${
              this.state.totalpagenumbers
            }`}{" "}
          </div>
        </div>
        <div className={styles.PreviousButtonHolder}>
          {" "}
          {this.props.pageNumber > 1 && (
            <div
              className={styles.previousbutton}
              onClick={() => this.prevClick(true, this.props.pageNumber)}
            />
          )}
        </div>
        <ul className={styles.listHolder}>
          {this.state.pageNumbers.map(number => {
            return (
              <l1
                id={number}
                key={number}
                className={
                  this.props.pageNumber === number
                    ? styles.activePageIteam
                    : styles.pageIteam
                }
                onClick={() => this.handleClick(number)}
              >
                {number}
              </l1>
            );
          })}
        </ul>
        {this.state.totalpagenumbers > this.props.pageNumber && (
          <div className={styles.continueButtonHolder}>
            <div
              className={styles.nextbutton}
              onClick={() => this.nextClick(false, this.props.pageNumber)}
            />
          </div>
        )}
      </div>
    );
  }
}
