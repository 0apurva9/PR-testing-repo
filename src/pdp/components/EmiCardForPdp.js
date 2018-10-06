import React from "react";
import PropTypes from "prop-types";
import styles from "./EmiCardForPdp.css";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class EmiCardForPdp extends React.Component {
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
                    {RUPEE_SYMBOL}
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
                let overallCost = datum.overallCost;
                if (this.props.options[i] && this.props.calculatePrice) {
                  overallCost =
                    parseInt(this.props.options[i].monthlyInstallment, 10) *
                    parseInt(this.props.options[i].term, 10);
                }
                return (
                  <div className={styles.dataDetails} key={i}>
                    {RUPEE_SYMBOL}
                    {overallCost}
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
EmiCardForPdp.propTypes = {
  calculatePrice: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      interestRate: PropTypes.string,
      monthlyInstallment: PropTypes.string,
      term: PropTypes.string,
      interestPayable: PropTypes.string
    })
  )
};
EmiCardForPdp.defaultProps = {
  calculatePrice: false,
  showInterestRate: true,
  width: 25
};
