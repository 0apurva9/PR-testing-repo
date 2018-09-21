import React from "react";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import PropTypes from "prop-types";
import styles from "./EmiCard.css";
export default class EmiCard extends React.Component {
  render() {
    if (this.props.options) {
      return (
        <div className={styles.base}>
          <div className={styles.row}>
            <div className={styles.header}>Months</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return <div className={styles.dataDetails}>{datum.term}</div>;
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.header}>Interest Rate</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails}>
                    {datum.interestRate}%
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.header}>EMI</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails}>
                    {datum.monthlyInstallment}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.header}>Overall Cost</div>
            <div className={styles.data}>
              {this.props.options.map((datum, i) => {
                return (
                  <div className={styles.dataDetails}>{datum.overallCost}</div>
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
