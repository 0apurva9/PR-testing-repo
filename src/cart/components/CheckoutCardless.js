import React from "react";
import instacred from "./img/InstaCred.svg";
// import { SUCCESS, ERROR } from "../../lib/constants";
import Input from "../../general/components/Input";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button";
import { BANK_GATWAY_DOWN } from "../../lib/constants";

import styles from "./CheckoutCardless.css";
const env = process.env;

const PREAPPROVED_NUMBER = "Enter lender's pre-approved mobile number";
const NOT_APPROVED =
  "You are currently not eligible for InstaCred EMI, please proceed with other payment option.";

export default class CheckoutCardless extends React.Component {
  constructor() {
    super();
    this.state = {
      instacredEligible: null,
      instacredData: ""
    };
    //this.onChangePhoneDetail = this.onChangePhoneDetail.bind(this);
  }
  componentDidMount() {
    this.addScript("https://iccdn.in/smart-detect/v3/flexmoneySDK.min.js");
  }
  addScript(url) {
    var _loaded = {};
    var s = document.createElement("script");
    s.src = url;
    document.head.appendChild(s);
    _loaded[url] = true;
  }

  onChangePhoneDetail = val => {
    let self = this;
    var fm_api = new window.flexmoneyApi({
      environment: env.REACT_APP_FLEXMONEYAPI,
      merchantId: env.REACT_APP_MERCHANTID
    });
    if (val.length >= 10) {
      let amount = localStorage.getItem("amount");
      this.setState({ selected: false });
      localStorage.setItem("phone", val);
      console.log("fm_api", fm_api);
      fm_api
        .smartUserDetect(val, env.REACT_APP_MERCHANTID, amount)
        .done(function(data) {
          console.log("datadatadata", data);
          if (data.eligible === true) {
            self.setState({
              instacredEligible: true
            });
            self.props.instacredStatus(true);
          } else if (data.eligible === false) {
            self.setState({
              instacredEligible: false,
              message: data.message || ""
            });
            self.props.instacredStatus(false);
          } else {
            self.setState({ instacredEligible: false });
          }
        });
    } else if (val.length < 10) {
      self.props.instacredStatus(false);
      self.setState({ instacredEligible: null });
    }
  };

  handleCheckout = () => {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  };

  componentWillUnmount() {
    this.props.instacredStatus(false);
    this.setState({ instacredEligible: null });
    localStorage.removeItem("amount");
    localStorage.removeItem("phone");
  }

  render() {
    let inputClass = "";
    if (this.state.instacredEligible === true) {
      inputClass = "inputBoxShowIcon";
    } else if (this.state.instacredEligible === false) {
      inputClass = "inputBoxHideIcon";
    } else {
      inputClass = "inputBoxHideIcon";
    }

    return (
      <div className={styles.instacredComponent}>
        <img src={instacred} alt="" className={styles.instacredImg} />
        <div className={styles.inputHolderNButton}>
          <div className={styles.inputHolder}>
            <div>
              <Input
                placeholder={PREAPPROVED_NUMBER}
                onlyNumber={true}
                maxLength={"10"}
                onChange={phone => this.onChangePhoneDetail(phone)}
                inputClass={inputClass}
                onClick={phone => this.onChangePhoneDetail(phone)}
                onKeyUp={phone => this.onChangePhoneDetail(phone)}
              />
            </div>

            {this.state.message && (
              <div
                className={
                  this.state.instacredEligible === null ||
                  this.state.instacredEligible === true
                    ? styles.displayNone
                    : styles.errorText
                }
              >
                {this.state.message}
              </div>
            )}
            {this.state.message === "" && (
              <div
                className={
                  this.state.instacredEligible === null ||
                  this.state.instacredEligible === true
                    ? styles.displayNone
                    : styles.errorText
                }
              >
                {NOT_APPROVED}
              </div>
            )}
          </div>
          <DesktopOnly>
            <div className={styles.contentHolder}>
              <div className={styles.buttonHolderDiv}>
                <div className={styles.buttonHolder}>
                  <Button
                    disabled={
                      (this.props.bankBinFailedDetails &&
                        this.props.bankBinFailedDetails.bankGatewayStatus ===
                          BANK_GATWAY_DOWN) ||
                      (this.props.binValidationSucessDetails &&
                        this.props.binValidationSucessDetails
                          .bankGatewayStatus === BANK_GATWAY_DOWN)
                        ? true
                        : this.props.validateNetBanking()
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
              </div>
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
