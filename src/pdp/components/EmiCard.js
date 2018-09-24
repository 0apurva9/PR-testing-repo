import React from "react";
import PropTypes from "prop-types";
import styles from "./EmiCard.css";
export default class EmiCard extends React.Component {
  render() {
    if (this.props.options) {
      return (
        <div className={styles.base}>
          <div className={styles.row} style={{ width: `${this.props.width}%` }}>
            <div className={styles.header}>Months</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails} key={i}>
                    {datum.term}
                  </div>
                );
              })}
            </div>
          </div>
          {this.props.showInterestRate && (
            <div
              className={styles.row}
              style={{ width: `${this.props.width}%` }}
            >
              <div className={styles.header}>Interest Rate</div>
              <div className={styles.data}>
                {this.props.options.map((datum, i) => {
                  return (
                    <div className={styles.dataDetails} key={i}>
                      {datum.interestRate}%
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className={styles.row} style={{ width: `${this.props.width}%` }}>
            <div className={styles.header}>EMI</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails} key={i}>
                    {datum.monthlyInstallment}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.row} style={{ width: `${this.props.width}%` }}>
            <div className={styles.header}>Overall Cost</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails} key={i}>
                    {datum.overallCost}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
EmiCard.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      interestRate: PropTypes.string,
      monthlyInstallment: PropTypes.string,
      term: PropTypes.string,
      interestPayable: PropTypes.string
    })
  )
};
EmiCard.defaultProps = {
  showInterestRate: true,
  width: 25
};
