import React from "react";
import SelectBox from "../../general/components/SelectBox";
import PropTypes from "prop-types";
import styles from "./EmiCard.css";
export default class EmiCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.options ? this.props.options[0].term : "",
      monthlyInstallment: this.props.options
        ? this.props.options[0].monthlyInstallment
        : "",
      interestPayable: this.props.options
        ? this.props.options[0].interestPayable
        : "",
      interestRate: this.props.options ? this.props.options[0].interestRate : ""
    };
  }
  handleChange(val) {
    const updatedValue = this.props.options.filter(option => {
      return option.term === val;
    })[0];

    this.setState(
      {
        term: updatedValue.term,
        monthlyInstallment: updatedValue.monthlyInstallment,
        interestPayable: updatedValue.interestPayable,
        interestRate: updatedValue.interestRate
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(updatedValue);
        }
      }
    );
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.row}>
          <div className={styles.label}>Tenure(Months)</div>
          <div className={styles.info}>
            <div className={styles.selectBox}>
              <SelectBox
                options={this.props.options.map(val => {
                  return { label: val.term, value: val.term };
                })}
                selected={this.state.term}
                onChange={val => this.handleChange(val)}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Interest Rate</div>
          <div className={styles.info}>{this.state.interestRate}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Monthly Installments</div>
          <div className={styles.amount}>{this.state.monthlyInstallment}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Total Interest paid to bank</div>
          <div className={styles.amount}>{this.state.interestPayable}</div>
        </div>
      </div>
    );
  }
}
EmiCard.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      interestRate: PropTypes.string,
      monthlyInstallment: PropTypes.monthlyInstallment,
      term: PropTypes.number,
      interestPayable: PropTypes.string
    })
  )
};
