import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./CreditCardForm.css";
import stylesx from "./UpiForm.css";
import MobileOnly from "../../general/components/MobileOnly";
import upi_opt from "./img/upi_opt.png";
const bankErrorMessage = `Your bank is currently unable to process payments due to a technical issue.`;

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upiId: "",
      isVerified: false,
      isOfferAvailable: false,
      offerArray: [
        {
          discountText: "10% Instant Cashback on Google Pay transactions  T&C",
          discountValidity: "Offer valid till 12th January"
        },
        {
          discountText: "15% Cashback on Amazon Pay transactions  T&C",
          discountValidity: "This offer can be claimed only once per user"
        }
      ],
      error: ""
    };
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={stylesx.flexRow50 + " " + stylesx.mb20}>
          <div className={stylesx.flexRow50Cols + " " + stylesx.upiBrdRgt}>
            <img src={upi_opt} alt="imgg" />
          </div>
          <div className={stylesx.flexRow50Cols}>
            <div className={stylesx.upiHedTxt}>
              <p className={stylesx.upiHedTxt}>
                UPI ID is in the format of mobilenumber@upi or username@bank
              </p>
            </div>
          </div>
        </div>
        <div className={stylesx.flexRow50New + " " + stylesx.mb20}>
          <div className={stylesx.flexRow50NewCols}>
            <div className={stylesx.frmFeildRow}>
              {/* <input type="text" className={stylesx.frmFeild} placeholder="Enter your registered UPI ID*"/> */}
              <Input2
                placeholder="Enter your registered UPI ID*"
                value={this.state.upiId}
                // onFocus={() => {
                //   this.handleOnFocusInput();
                // }}
                boxy={true}
                onChange={val => this.setState({ upiId: val })}
                textStyle={{ fontSize: 14 }}
                height={45}
                // onBlur={() => this.onBlurOfCardInput()}
              />
              <div className={stylesx.verifiedState + " " + stylesx.invalidFrm}>
                <button className={stylesx.verifiedIcon} type="button">
                  Verifed
                </button>
              </div>
            </div>
            <p class={stylesx.errorTxt}>Please enter a valid UPI ID</p>
            {/* <br />
                        <div className={stylesx.frmFeildRow}>
                              <input type="text" className={stylesx.frmFeild} placeholder="Enter your registered UPI ID*" />
                              <div className={stylesx.verifiedState+""+ stylesx.verifiedFrm}>
                                    <span className={stylesx.verifiedIcon}></span> verified
                              </div>
                        </div>
                        <br />
                        <div className={stylesx.frmFeildRow}>
                              <input type="text" className={stylesx.frmFeild} placeholder="Enter your registered UPI ID*" />
                              <div className={stylesx.verifiedState +" "+ stylesx.invalidFrm}>
                                    <span className={stylesx.invalidIcon}></span> verified
                              </div>
                        </div> */}
          </div>
          <div className={stylesx.flexRow50NewCols}>
            <div className={stylesx.upiPayBtnSec}>
              <button className={stylesx.upiPayBtn} type="button">
                Verify
              </button>
            </div>
          </div>
        </div>
        <div className={stylesx.upiTandCRow}>
          <p className={stylesx.upiInfoTxt}>
            We will save your UPI address for a faster checkout. To remove your
            details, visit my account.
          </p>
        </div>
        {this.state.offerArray &&
          this.state.offerArray.map(offer => (
            <div className={stylesx.upiTandCRow}>
              <p className={stylesx.lblTxt}>{offer.discountText}</p>
              <p className={stylesx.upitncTxt}>{offer.discountValidity}</p>
            </div>
          ))}
      </div>
    );
  }
}
UpiForm.propTypes = {
  placeholder: PropTypes.string,
  placeHolderCardName: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onSaveData: PropTypes.func,
  optionsYear: PropTypes.string,
  options: PropTypes.string
};
