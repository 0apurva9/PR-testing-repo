import React from "react";
import styles from "./EmiSectionDesktop.css";
import PropTypes from "prop-types";
import Accordion from "../../general/components/Accordion";
import Button from "../../general/components/Button";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_EMI_BANK_EVENT
} from "../../lib/adobeUtils";
export default class EmiSectionDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: 0,
      isOpen: 0
    };
  }

  componentDidMount() {
    if (this.props.selectBank) {
      this.props.selectBank([this.props.emiData[0].code]);
    }
  }

  tabChange(val) {
    this.setState({ isSelect: val, isOpen: 0 });
    if (this.props.selectBank) {
      this.props.selectBank([this.props.emiData[val].code]);
    }
    setDataLayerForPdpDirectCalls(
      SET_DATA_LAYER_FOR_EMI_BANK_EVENT,
      this.props.emiData[val].emiBank
    );
    if (window && window.digitalData) {
      Object.assign(window.digitalData, {
        checkout: {
          ...window.digitalData.checkout,
          bank: {
            name: this.props.emiData[val].emiBank
          }
        }
      });
    }
  }

  handleConfirmPlan(value) {
    if (window && window.digitalData) {
      Object.assign(window.digitalData, {
        checkout: {
          ...window.digitalData.checkout,
          tenure: {
            value: value.term
          }
        }
      });
    }
    if (this.props.confirmPlan) {
      this.props.confirmPlan();
    }
  }

  handleSelectPlanForDesktop = (val, i) => {
    this.setState({ isOpen: i });
    if (this.props.selectPlan) {
      this.props.selectPlan(val);
    }
  };

  render() {
    const bankListData = this.props && this.props.emiData;
    const emiInfo = bankListData && bankListData[this.state.isSelect].emiInfo;
    const convenienceFeeValue =
      bankListData &&
      bankListData[this.state.isSelect].emitermsrate[0].emiConvCharge;
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
                    key={i}
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
                  <div className={styles.dropdownDataHolder} key = {i}>
                    <Accordion
                      text1={`${val.term} EMI @ ${interestRate} %`}
                      text2={`Rs ${val.monthlyInstallment} / Month`}
                      key={i}
                      offset={15}
                      activeBackground="#f9f9f9"
                      textAlign="left"
                      widthForText1="60%"
                      widthForText2="40%"
                      onOpen={() => this.handleSelectPlanForDesktop(val, i)}
                      isOpen={this.state.isOpen === i}
                    >
                      <div className={styles.tenureDataHolder}>
                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>Interest Rate</div>
                          <div
                            className={styles.amountHolder}
                          >{`${val.interestRate} %`}</div>
                        </div>
                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>
                            Monthly Installments
                          </div>
                          <div
                            className={styles.amountHolder}
                          >{`Rs . ${val.monthlyInstallment}`}</div>
                        </div>
                        {/* {convenienceFee &&
                          convenienceFee.value && (
                            <div className={styles.textAndAmountHolder}>
                              <div className={styles.textHolder}>
                                Bank Convenience Fees
                              </div>
                              <div className={styles.amountHolder}>{`Rs . ${
                                convenienceFee.value
                              }`}</div>
                            </div>
                          )} */}

                        <div className={styles.textAndAmountHolder}>
                          <div className={styles.textHolder}>
                            Total Interest paid to bank
                          </div>
                          <div
                            className={styles.amountHolder}
                          >{`Rs . ${val.interestPayable}`}</div>
                        </div>

                        {convenienceFeeValue && convenienceFeeValue > 0 && (
                          <div className={styles.textAndAmountHolder}>
                            <div className={styles.textHolder}>
                              Bank Convenience Fees
                            </div>
                            <div
                              className={styles.amountHolder}
                            >{`Rs . ${convenienceFeeValue}`}</div>
                          </div>
                        )}
                        {emiInfo && (
                          <div className={styles.convenienceFee}>{emiInfo}</div>
                        )}
                        {this.props.showButton && (
                          <div className={styles.buttonHolder}>
                            <div className={styles.button}>
                              <Button
                                type="primary"
                                width={175}
                                height={40}
                                label="Select this plan"
                                onClick={() =>
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
  }),
  selectBank: PropTypes.func,
  emiData: PropTypes.array,
  confirmPlan: PropTypes.func,
  selectPlan: PropTypes.func,
  showHeader: PropTypes.bool,
  showButton: PropTypes.bool
};
EmiSectionDesktop.defaultProps = {
  showHeader: true,
  showButton: false
};
