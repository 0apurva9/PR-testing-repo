import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import cardValidator from "simple-card-validator";
import styles from "./CreditCardForm.css";
import MobileOnly from "../../general/components/MobileOnly";
import { BANK_GATWAY_DOWN } from "../../lib/constants";
import {
  WHATSAPP_NOTIFICATION_CHECKED,
  WHATSAPP_NOTIFICATION_UNCHECKED,
  getWhatsAppNotification
} from "../../lib/adobeUtils";
const MINIMUM_YEARS_TO_SHOW = 0;
const MAXIMUM_YEARS_TO_SHOW = 19;
const REGX_FOR_WHITE_SPACE = /\W/gi;
const REGX_FOR_CARD_FORMATTER = /(.{4})/g;
const bankErrorMessage = `Your bank is currently unable to process payments due to a technical issue.`;

export default class CreditCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.expiryYearObject = [];
        const currentYear = new Date().getFullYear();
        for (let i = MINIMUM_YEARS_TO_SHOW; i <= MAXIMUM_YEARS_TO_SHOW; i++) {
            this.expiryYearObject.push({
                label: currentYear + i,
                value: currentYear + i,
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
            { label: "12", value: 12 },
        ];
        this.state = {
            selected: false,
            cardNumber:
                this.props.cardDetails && this.props.cardDetails.cardNumber ? this.props.cardDetails.cardNumber : "",
            cardName: this.props.cardDetails && this.props.cardDetails.cardName ? this.props.cardDetails.cardName : "",
            cvvNumber:
                this.props.cardDetails && this.props.cardDetails.cvvNumber ? this.props.cardDetails.cvvNumber : "",
            ExpiryMonth:
                this.props.cardDetails && this.props.cardDetails.monthValue ? this.props.cardDetails.monthValue : null,
            ExpiryYear:
                this.props.cardDetails && this.props.cardDetails.yearValue ? this.props.cardDetails.yearValue : null,
            value: this.props.cardDetails && this.props.cardDetails.value ? props.value : "",
            monthValue:
                this.props.cardDetails && this.props.cardDetails.monthValue ? this.props.cardDetails.monthValue : "",
            yearValue:
                this.props.cardDetails && this.props.cardDetails.yearValue ? this.props.cardDetails.yearValue : "",
            isCalledBinValidation: false,
            invalidCard: false,
            emiInvalidCardError: this.props.emiBinValidationErrorMessage ? this.props.emiBinValidationErrorMessage : "",
        };
	}

    onChangeCardNumber(val) {
        this.setState({ cardNumber: val });
        this.onChange({ cardNumber: val });
        // let allowEmiEligibleBin = false;
        // if (this.props.isDebitCard == undefined) {
        //   allowEmiEligibleBin = true;
        // }
        if (val.replace(/\s/g, "").length < 6) {
            this.setState({ isCalledBinValidation: false });
        }
        if (
            (val.replace(/\s/g, "").length >= 6 &&
                val.replace(/\s/g, "").length - this.state.cardNumber.replace(/\s/g, "").length > 1) ||
            (val.replace(/\s/g, "").length >= 6 &&
                val.replace(/\s/g, "").slice(0, 5) !== this.state.cardNumber.replace(/\s/g, "").slice(0, 5) &&
                this.state.cardNumber !== val)
        ) {
            this.setState({ isCalledBinValidation: true });
            this.props.binValidation(val.replace(/\s/g, "").substring(0, 6), this.props.isDebitCard);
        }
        if (val.replace(/\s/g, "").length >= 6) {
            this.setState({ isCalledBinValidation: true });
            if (!this.state.isCalledBinValidation) {
                this.props.binValidation(val.replace(/\s/g, "").substring(0, 6), this.props.isDebitCard);
            }
        }
    }

    getNumber() {
        return this.props.cardNumber && this.props.cardNumber.length > 0
            ? this.props.cardNumber
                  .replace(REGX_FOR_WHITE_SPACE, "")
                  .replace(REGX_FOR_CARD_FORMATTER, "$1 ")
                  .trim()
            : this.state.cardNumber
            ? this.state.cardNumber
                  .replace(REGX_FOR_WHITE_SPACE, "")
                  .replace(REGX_FOR_CARD_FORMATTER, "$1 ")
                  .trim()
            : "";
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
        if (nextProps.cardDetails && (!nextProps.cardDetails.cardNumber || nextProps.cardDetails.cardNumber === "")) {
            this.setState({
                selected: false,
                cardNumber: "",
                cardName: "",
                cvvNumber: "",
                ExpiryMonth: null,
                ExpiryYear: null,
                value: "",
                monthValue: "Expiry Month",
                yearValue: "Expiry year",
            });
        } else {
            this.setState({
                cardNumber: nextProps.cardDetails && nextProps.cardDetails.cardNumber,
                cardName: nextProps.cardDetails && nextProps.cardDetails.cardName,
                cvvNumber: nextProps.cardDetails && nextProps.cardDetails.cvvNumber,
                ExpiryMonth: nextProps.cardDetails && nextProps.cardDetails.monthValue,
                ExpiryYear: nextProps.cardDetails && nextProps.cardDetails.yearValue,
                monthValue: nextProps.cardDetails && nextProps.cardDetails.monthValue,
                yearValue: nextProps.cardDetails && nextProps.cardDetails.yearValue,
                emiInvalidCardError: nextProps.emiBinValidationErrorMessage,
            });
        }
    }

    handleCheckout = () => {
      if (this.props.onCheckout) {
        if (this.props.whatsappSelected) {
          getWhatsAppNotification(WHATSAPP_NOTIFICATION_CHECKED);
        } else if (!this.props.whatsappSelected) {
          getWhatsAppNotification(WHATSAPP_NOTIFICATION_UNCHECKED);
        }
        this.props.onCheckout();
      }
    };

  render() {
    return (
      <div className={styles.base}>
        {this.props.isDebitCard &&
          this.props.emiEligibiltyDetails &&
          this.props.emiEligibiltyDetails.DCEMIEligibleMessage && (
            <div className={styles.maskedNumber}>
              {`${this.props.emiEligibiltyDetails.DCEMIEligibleMessage}`}
            </div>
          )}
        <div className={styles.cardDetails}>
          <div className={styles.contentHolder}>
            <div className={styles.content}>
              <Input2
                placeholder="Card Number *"
                value={this.getNumber()}
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
              {this.state.invalidCard && !this.state.emiInvalidCardError && (
                <span className={styles.invalidCardText}>
                  Please enter a valid card number
                </span>
              )}
              {this.state.cardNumber &&
                this.props.bankGatewayStatus === BANK_GATWAY_DOWN && (
                  <span className={styles.invalidCardText}>
                    *{" "}
                    {this.props.bankError
                      ? this.props.bankError
                      : bankErrorMessage}
                  </span>
                )}
              {!this.props.bankGatewayStatus === BANK_GATWAY_DOWN &&
                this.state.invalidCard &&
                !this.state.emiInvalidCardError && (
                  <span className={styles.invalidCardText}>
                    Please enter a valid card number
                  </span>
                )}
              {this.state.emiInvalidCardError &&
                this.state.cardNumber.length > 6 && (
                  <span
                    className={styles.invalidCardText}
                    data-test="creditCardForm-err-msg"
                  >
                    {this.state.emiInvalidCardError}
                  </span>
                )}
            </div>
          </div>
          <MobileOnly>
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
          </MobileOnly>
          <DesktopOnly>
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
          </DesktopOnly>
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
                      rightChildSize="16px"
                    />
                  </div>
                </div>
              </div>
              <DesktopOnly>
                <div className={styles.buttonHolder}>
                  <Button
                    disabled={
                      this.props.bankGatewayStatus === BANK_GATWAY_DOWN
                        ? true
                        : this.props.buttonDisabled
                    }
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Pay now"
                    width={150}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={this.handleCheckout}
                  />
                </div>
				</DesktopOnly>
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
    options: PropTypes.string,
    cardDetails: PropTypes.object,
    value: PropTypes.string,
    emiBinValidationErrorMessage: PropTypes.string,
    binValidation: PropTypes.func,
    isDebitCard: PropTypes.bool,
    cardNumber: PropTypes.string,
    onChangeCardDetail: PropTypes.func,
    onFocusInput: PropTypes.func,
    onBlur: PropTypes.func,
    emiEligibiltyDetails: PropTypes.object,
    bankError: PropTypes.string,
    bankGatewayStatus: PropTypes.string,
    cardName: PropTypes.string,
    cvvNumber: PropTypes.string,
    buttonDisabled: PropTypes.bool,
    onCheckout: PropTypes.func,
    whatsappSelected: PropTypes.bool,
};