import React from "react";
import styles from "./EmiSectionDesktop.css";
import PropTypes from "prop-types";
import Accordion from "../../general/components/Accordion";
import Button from "../../general/components/Button";
export default class EmiSectionDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: 0
    };
  }
  tabChange(val) {
    this.setState({ isSelect: val });
  }
  handleConfirmPlan(value) {
    if (this.props.selectPlan) {
      this.props.selectPlan(value, this.state.isSelect);
    }
  }
  render() {
    const bankListData = this.props && this.props.emiData;
    const bankDetails =
      bankListData &&
      bankListData &&
      bankListData[this.state.isSelect].emitermsrate;

    return (
      <div className={styles.base}>
        {this.props.showHeader && (
          <div className={styles.header}>EMI details</div>
        )}
        <div className={styles.displayDataHolder}>
          <div className={styles.bankListHolder}>
            {bankListData &&
              bankListData &&
              bankListData.map((val, i) => {
                return (
                  <div
                    className={
                      this.state.isSelect === i
                        ? styles.textBold
                        : styles.bankList
                    }
                    onClick={() => this.tabChange(i)}
                  >
                    {val.emiBank}
                  </div>
                );
              })}
          </div>
          <div className={styles.bankListDataHolder}>
            {bankDetails &&
              bankDetails.map((val, i) => {
                const interestRate = Math.round(val.interestRate);
                return (
                  <div className={styles.dropdownDataHolder}>
                    <Accordion
                      text1={`${val.term} EMI @ ${interestRate} %`}
                      text2={`Rs ${val.monthlyInstallment} / Month`}
                      key={i}
                      offset={15}
                      activeBackground="#f9f9f9"
                    >
                      <div className={styles.tenureDataHolder}>
                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>Interest Rate</div>
                          <div className={styles.amountHolder}>{`Rs . ${
                            val.interestRate
                          }`}</div>
                        </div>
                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>
                            Monthly Installments
                          </div>
                          <div className={styles.amountHolder}>{`Rs . ${
                            val.monthlyInstallment
                          }`}</div>
                        </div>
                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>
                            Total Interest paid to bank
                          </div>
                          <div className={styles.amountHolder}>{`Rs . ${
                            val.interestPayable
                          }`}</div>
                        </div>
                        {this.props.showButton && (
                          <div className={styles.buttonHolder}>
                            <div className={styles.button}>
                              <Button
                                type="primary"
                                width={175}
                                height={40}
                                label="Select this plan"
                                onClick={bankData =>
                                  this.handleConfirmPlan(val)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Accordion>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
EmiSectionDesktop.propTypes = {
  bankListData: PropTypes.shape({
    bankList: PropTypes.arrayOf(
      PropTypes.shape({
        emiBank: PropTypes.string,
        emitermsrate: PropTypes.arrayOf(
          PropTypes.shape({
            interestPayable: PropTypes.string,
            interestRate: PropTypes.string,
            monthlyInstallment: PropTypes.string,
            term: PropTypes.string
          })
        )
      })
    )
  })
};
EmiSectionDesktop.defaultProps = {
  showHeader: true,
  showButton: false
};
