import React from "react";
import styles from "./CreditCardForm.css";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Icon from "../../xelpmoc-core/Icon";
import CircleButton from "../../xelpmoc-core/CircleButton";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import informationIcon from "../../general/components/img/Info-grey.svg";
import Button from "../../general/components/Button";
import CheckBox from "../../general/components/CheckBox.js";
import { DEFAULT_PIN_CODE_LOCAL_STORAGE } from "../../lib/constants.js";
import cardValidator from "simple-card-validator";

const INSUFFICIENT_DATA_ERROR_MESSAGE = "PLease enter valid card details";

const MERCHANT_ID = "tul_uat2";

const MINIMUM_YEARS_TO_SHOW = 0;
const MAXIMUM_YEARS_TO_SHOW = 9;
const REGX_FOR_WHITE_SPACE = /\W/gi;
const REGX_FOR_CARD_FORMATTER = /(.{4})/g;

export default class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.expiryYearObject = [];
    const currentYear = new Date().getFullYear();
    for (let i = MINIMUM_YEARS_TO_SHOW; i <= MAXIMUM_YEARS_TO_SHOW; i++) {
      this.expiryYearObject.push({
        label: currentYear + i,
        value: currentYear + i
      });
    }

    this.monthOptions = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "11", value: 11 },
      { label: "12", value: 12 }
    ];
    this.state = {
      selected: false,
      cardNumber:
        this.props.cardDetails && this.props.cardDetails.cardNumber
          ? this.props.cardDetails.cardNumber
          : "",
      cardName:
        this.props.cardDetails && this.props.cardDetails.cardName
          ? this.props.cardDetails.cardName
          : "",
      cvvNumber:
        this.props.cardDetails && this.props.cardDetails.cvvNumber
          ? this.props.cardDetails.cvvNumber
          : "",
      ExpiryMonth:
        this.props.cardDetails && this.props.cardDetails.monthValue
          ? this.props.cardDetails.monthValue
          : null,
      ExpiryYear:
        this.props.cardDetails && this.props.cardDetails.yearValue
          ? this.props.cardDetails.yearValue
          : null,
      value:
        this.props.cardDetails && this.props.cardDetails.value
          ? props.value
          : "",
      monthValue:
        this.props.cardDetails && this.props.cardDetails.monthValue
          ? this.props.cardDetails.monthValue
          : "",
      yearValue:
        this.props.cardDetails && this.props.cardDetails.yearValue
          ? this.props.cardDetails.yearValue
          : "",
      isCalledBinValidation: false,
      invalidCard: false
    };
  }

  onChangeCardNumber(val) {
    this.setState({ cardNumber: val });
    this.onChange({ cardNumber: val });
    if (val.replace(/\s/g, "").length < 6) {
      this.setState({ isCalledBinValidation: false });
    }
    if (val.replace(/\s/g, "").length >= 6) {
      this.setState({ isCalledBinValidation: true });
      if (!this.state.isCalledBinValidation) {
        this.props.binValidation(val.replace(/\s/g, "").substring(0, 6));
      }
    }
  }

  onChange(val) {
    this.setState(val);
    if (this.props.onChangeCardDetail) {
      this.props.onChangeCardDetail(val);
    }
  }
  onBlurOfCardInput() {
    const card = new cardValidator(this.state.cardNumber);
    if (this.state.cardNumber !== "") {
      if (card.validateCard()) {
        this.setState({ invalidCard: false });
      } else {
        this.setState({ invalidCard: true });
      }
    } else {
      this.setState({ invalidCard: false });
    }
    this.handleOnBlur();
  }
  handleOnFocusInput() {
    if (this.props.onFocusInput) {
      this.props.onFocusInput();
    }
  }
  handleOnBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.cardDetails &&
      (!nextProps.cardDetails.cardNumber ||
        nextProps.cardDetails.cardNumber === "")
    ) {
      this.setState({
        selected: false,
        cardNumber: "",
        cardName: "",
        cvvNumber: "",
        ExpiryMonth: null,
        ExpiryYear: null,
        value: "",
        monthValue: "Expiry Month",
        yearValue: "Expiry year"
      });
    } else {
      this.setState({
        cardNumber: nextProps.cardDetails && nextProps.cardDetails.cardNumber,
        cardName: nextProps.cardDetails && nextProps.cardDetails.cardName,
        cvvNumber: nextProps.cardDetails && nextProps.cardDetails.cvvNumber,
        ExpiryMonth: nextProps.cardDetails && nextProps.cardDetails.monthValue,
        ExpiryYear: nextProps.cardDetails && nextProps.cardDetails.yearValue,
        monthValue: nextProps.cardDetails && nextProps.cardDetails.monthValue,
        yearValue: nextProps.cardDetails && nextProps.cardDetails.yearValue
      });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.cardDetails}>
          <div className={styles.contentHolder}>
            <div className={styles.content}>
              <Input2
                placeholder="Card Number"
                value={
                  this.props.cardNumber && this.props.cardNumber.length > 0
                    ? this.props.cardNumber
                        .replace(REGX_FOR_WHITE_SPACE, "")
                        .replace(REGX_FOR_CARD_FORMATTER, "$1 ")
                        .trim()
                    : this.state.cardNumber
                      ? this.state.cardNumber
                          .replace(REGX_FOR_WHITE_SPACE, "")
                          .replace(REGX_FOR_CARD_FORMATTER, "$1 ")
                          .trim()
                      : ""
                }
                onFocus={() => {
                  this.handleOnFocusInput();
                }}
                boxy={true}
                onChange={val => this.onChangeCardNumber(val)}
                textStyle={{ fontSize: 14 }}
                height={33}
                maxLength="23"
                isCard={true}
                onBlur={() => this.onBlurOfCardInput()}
              />
              {this.state.invalidCard && (
                <span className={styles.invalidCardText}>
                  Please enter a valid card number
                </span>
              )}
            </div>
          </div>
          <div className={styles.contentHolder}>
            <div className={styles.content}>
              <Input2
                placeholder="Name on card*"
                boxy={true}
                value={
                  this.props.cardName
                    ? this.props.cardName
                    : this.state.cardName
                }
                onChange={cardName => this.onChange({ cardName })}
                textStyle={{ fontSize: 14 }}
                height={33}
                onFocus={() => {
                  this.handleOnFocusInput();
                }}
                onBlur={() => this.handleOnBlur()}
                onlyAlphabet={true}
              />
            </div>
          </div>
          <div className={styles.contentHolder}>
            <div className={styles.dropDownHolder}>
              <div className={styles.dropDownBox}>
                <SelectBoxMobile2
                  theme="hollowBox"
                  placeholder="Expiry Month"
                  onChange={monthValue =>
                    this.onChange({
                      monthValue: monthValue.value
                    })
                  }
                  options={this.monthOptions}
                  textStyle={{ fontSize: 14 }}
                  value={this.state.monthValue}
                  label={this.state.monthValue}
                />
              </div>
              <div className={styles.dropDownBox}>
                <SelectBoxMobile2
                  theme="hollowBox"
                  placeholder="Expiry year"
                  options={this.expiryYearObject}
                  onChange={yearValue =>
                    this.onChange({
                      yearValue: yearValue.value
                    })
                  }
                  value={this.state.yearValue}
                  label={this.state.yearValue}
                />
              </div>
            </div>
          </div>
          <div className={styles.contentHolder}>
            <div className={styles.payCardHolder}>
              <div className={styles.cardFooterText}>
                <div className={styles.cvvNumberTextHolder}>
                  <div className={styles.cardFooterInput}>
                    <Input2
                      boxy={true}
                      placeholder="CVV"
                      type="password"
                      onChange={cvvNumber => this.onChange({ cvvNumber })}
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      maxLength={"4"}
                      onlyNumber={true}
                      value={
                        this.props.cvvNumber
                          ? this.props.cvvNumber
                          : this.state.cvvNumber
                      }
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                      onBlur={() => this.handleOnBlur()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.saveCardText}>
            <div className={styles.saveText}>
              We will save your card details securely for a faster checkout; we
              don't store the CVV number. To remove your card details, visit My
              Account.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreditCardForm.propTypes = {
  placeholder: PropTypes.string,
  placeHolderCardName: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onSaveData: PropTypes.func,
  optionsYear: PropTypes.string,
  options: PropTypes.string
};
