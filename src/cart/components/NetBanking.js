import React from "react";
import Icon from "../../xelpmoc-core/Icon";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import Grid from "../../general/components/Grid";
import BankSelect from "./BankSelect";
import styles from "./NetBanking.css";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
import axisBankIcon from "./img/pwa_NB_DUMMY.svg";
import hdfcBankIcon from "./img/pwa_NB_HDFC.svg";
import iciciBankIcon from "./img/pwa_NB_ICICI.svg";
import sbiBankIcon from "./img/pwa_NB_SBI.svg";
import induslandBankIcon from "./img/indusind.svg";
import kotakBankIcon from "./img/kotak.svg";
const axisBankCode = "NB_AXIS";
const hdfcBankCode = "NB_HDFC";
const hdfcBankCode1 = "HDFC Bank";
const iciciBankCode = "NB_ICICI";
const sbiBankCode = "NB_SBI";
const kotakBankCode = "NB_KOTAK";
const induslandBankCode = "NB_INDUS";
const axisBankCodeDummy = "Dummy Bank";
const SHOW_DEFAULT_BANK_LIST = [
  axisBankCode,
  hdfcBankCode,
  iciciBankCode,
  sbiBankCode,
  kotakBankCode,
  induslandBankCode
];
export default class NetBanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      bankCode: "",
      selectedFromDropDown: false
    };
  }
  handleSelectForIcon(bankCode, bankName) {
    this.setState({
      bankCode: bankCode,
      bankName: bankName,
      selectedFromDropDown: false
    });
    if (this.props.binValidationForNetBank) {
      this.props.binValidationForNetBank(bankName);
    }
    this.props.onSelectBankForNetBanking(bankCode, bankName);
  }
  handleSelect(val) {
    const bankCode = val.value;
    const bankName = val.label;
    this.setState({
      bankCode: bankCode,
      bankName: bankName,
      selectedFromDropDown: true
    });
    if (this.props.binValidationForNetBank) {
      this.props.binValidationForNetBank(bankName);
    }
    this.props.onSelectBankForNetBanking(bankCode, bankName);
  }
  handleCheckout = () => {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      !nextProps.bankCodeForNetBanking &&
      !nextProps.bankNameForNetBanking
    ) {
      this.setState({
        bankName: "",
        bankCode: ""
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.bankList && (
          <Grid
            limit={1}
            offset={30}
            elementWidthMobile={33.33}
            elementWidthDesktop={16.66}
          >
            {this.props.bankList.find(bank => {
              return bank.bankCode === axisBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(axisBankCode, "Axis Bank")
                }
                image={axisBankIcon}
                selected={this.state.bankCode === axisBankCode}
                name="Axis Bank"
              />
            ) : (
              <div />
            )}
            {this.props.bankList.find(bank => {
              return bank.bankCode === hdfcBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(hdfcBankCode, "HDFC BANK, LTD.")
                }
                image={hdfcBankIcon}
                selected={this.state.bankCode === hdfcBankCode}
                name="HDFC BANK, LTD."
              />
            ) : (
              <div />
            )}
            {this.props.bankList.find(bank => {
              return bank.bankCode === iciciBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(iciciBankCode, "ICICI Bank")
                }
                image={iciciBankIcon}
                selected={this.state.bankCode === iciciBankCode}
                name="ICICI Bank"
              />
            ) : (
              <div />
            )}
            {this.props.bankList.find(bank => {
              return bank.bankCode === sbiBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(sbiBankCode, "State Bank of India")
                }
                image={sbiBankIcon}
                selected={this.state.bankCode === sbiBankCode}
                name="State Bank of India"
              />
            ) : (
              <div />
            )}
            {this.props.bankList.find(bank => {
              return bank.bankCode === kotakBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(kotakBankCode, "Kotak Bank")
                }
                image={kotakBankIcon}
                selected={this.state.bankCode === kotakBankCode}
                name="Kotak Bank"
              />
            ) : (
              <div />
            )}
            {this.props.bankList.find(bank => {
              return bank.bankCode === induslandBankCode;
            }) ? (
              <BankSelect
                selectItem={() =>
                  this.handleSelectForIcon(induslandBankCode, "IndusInd Bank")
                }
                image={induslandBankIcon}
                selected={this.state.bankCode === induslandBankCode}
                name="IndusInd Bank"
              />
            ) : (
              <div />
            )}
          </Grid>
        )}
        <div className={styles.bankDropDown}>
          <div className={styles.contentHolder}>
            <SelectBoxMobile2
              height={33}
              placeholder={"Other Bank"}
              options={
                this.props.bankList &&
                this.props.bankList
                  .filter(
                    bank => !SHOW_DEFAULT_BANK_LIST.includes(bank.bankCode)
                  )
                  .map((val, i) => {
                    return {
                      value: val.bankCode,
                      label: val.bankName
                    };
                  })
              }
              isEnable={this.state.selectedFromDropDown}
              onChange={val => this.handleSelect(val)}
            />
          </div>
          <DesktopOnly>
            <div className={styles.contentHolder}>
              <div className={styles.buttonHolder}>
                <Button
                  disabled={this.props.validateNetBanking()}
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
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
NetBanking.propTypes = {
  bankList: PropTypes.arrayOf(
    PropTypes.shape({
      bankCode: PropTypes.string,
      bankName: PropTypes.string,
      isAvailable: PropTypes.string,
      priority: PropTypes.string
    })
  ),
  onSelect: PropTypes.func
};
