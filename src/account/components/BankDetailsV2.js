import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./BankDetailsV2.css";
import PropTypes from "prop-types";
import Input3 from "../../general/components/Input3.js";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_STORE_BANK_FORM
} from "../../lib/constants";

export default class BankDetailsV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      currentOrderId: ""
    };
    this.radioChange = this.radioChange.bind(this);
  }

  componentDidMount() {
    //update bankdetails state - used for validation
    if (
      this.props &&
      this.props.history &&
      this.props.history.location.state.bankData
    ) {
      let userBankDetails = this.props.history.location.state.bankData;
      userBankDetails.reEnterAccountNumber = userBankDetails.accountNumber;
      this.props.updateStateForBankDetails(userBankDetails);
    }
    //order id required for url formation
    if (
      this.props &&
      this.props.history &&
      this.props.history.location.state.orderId
    ) {
      this.setState({
        currentOrderId: this.props.history.location.state.orderId
      });
    }
  }

  radioChange(e) {
    this.setState({ selectedOption: e.currentTarget.value });
    this.props.onChange({ title: e.currentTarget.value });
  }

  onChange(val) {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }

  //clear form data
  clearFormData(orderId) {
    if (this.props.clearForm) {
      this.props.clearForm();
    }
    document.getElementsByTagName("input")[0].value = "";
    document.getElementsByTagName("input")[1].value = "";
    document.getElementsByTagName("input")[2].value = "";
    document.getElementsByTagName("input")[6].value = "";
    document.getElementsByTagName("input")[7].value = "";
    this.setState({
      selectedOption: ""
    });
    this.props.history.replace({
      pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
      state: {
        authorizedRequest: true,
        bankData: "",
        orderId: orderId
      }
    });
  }

  render() {
    let bankDetails = this.props.bankDetail;
    let orderId = this.state.currentOrderId;
    const title = [
      {
        label: "Mr.",
        value: "Mr"
      },
      {
        label: "Mrs.",
        value: "Mrs"
      },
      {
        label: "Ms.",
        value: "Ms"
      }
    ];

    return (
      <div className={styles.base}>
        <div className={styles.holder}>
          <div className={styles.header}>
            Add Bank Details
            <span
              className={styles.clearAll}
              onClick={() => this.clearFormData(orderId)}
            >
              Clear all
            </span>
          </div>
          <div className={styles.container}>
            <Input3
              placeholder={this.props.code}
              boxy={true}
              height={33}
              onChange={ifscCode => this.onChange({ ifscCode })}
              value={bankDetails.ifscCode || ""}
            />
          </div>
          <div className={styles.container}>
            <Input3
              placeholder={this.props.accountNumber}
              boxy={true}
              height={33}
              maxLength={"19"}
              onChange={accountNumber => this.onChange({ accountNumber })}
              onlyNumber={true}
              value={bankDetails.accountNumber || ""}
            />
          </div>
          <div className={styles.container}>
            <Input3
              placeholder={this.props.reEnterAccountNumber}
              boxy={true}
              height={33}
              maxLength={"19"}
              onChange={reEnterAccountNumber =>
                this.onChange({ reEnterAccountNumber })
              }
              onlyNumber={true}
              value={bankDetails.reEnterAccountNumber || ""}
            />
          </div>
          <div className={styles.container}>
            {title.map((data, index) => {
              return (
                <label className={styles.titleLabel} key={index}>
                  <input
                    className={styles.radioBtn}
                    type="radio"
                    value={data.value || ""}
                    checked={
                      this.state.selectedOption === data.value ||
                      bankDetails.title === data.value
                    }
                    onChange={this.radioChange}
                  />
                  {data.label}
                </label>
              );
            })}
          </div>
          <div className={styles.container}>
            <Input3
              placeholder={this.props.userName}
              boxy={true}
              height={33}
              onChange={accountHolderName =>
                this.onChange({ accountHolderName })
              }
              onlyAlphabet={true}
              value={bankDetails.accountHolderName || ""}
            />
          </div>
          <div className={styles.container}>
            <Input3
              placeholder={this.props.bankName}
              boxy={true}
              height={33}
              onChange={bankName => this.onChange({ bankName })}
              onlyAlphabet={true}
              value={bankDetails.bankName || ""}
            />
          </div>
        </div>
      </div>
    );
  }
}
BankDetailsV2.propTypes = {
  accountNumber: PropTypes.string,
  reEnterAccountNumber: PropTypes.string,
  userName: PropTypes.string,
  mode: PropTypes.string,
  bankName: PropTypes.string,
  code: PropTypes.string,
  updateStateForBankDetails: PropTypes.func,
  clearForm: PropTypes.func,
  bankDetails: PropTypes.shape({
    ifscCode: PropTypes.string,
    accountNumber: PropTypes.number,
    reEnterAccountNumber: PropTypes.string,
    title: PropTypes.string,
    accountHolderName: PropTypes.string,
    bankName: PropTypes.string
  }),
  refundModes: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
  onChange: PropTypes.func,
  ...RouterPropTypes
};
BankDetailsV2.defaultProps = {
  accountNumber: "Account number",
  reEnterAccountNumber: "Re-enter account number",
  userName: "Customer name",
  mode: "Refund mode",
  bankName: "Bank name",
  code: "Bank's IFSC code"
};
