import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./CreditCardForm.css";
import stylesx from "./UpiForm.css";
import MobileOnly from "../../general/components/MobileOnly";
import upi_opt from "./img/upi_opt.svg";
const bankErrorMessage = `Your bank is currently unable to process payments due to a technical issue.`;
const invalidUpi = `Your UPI no longer seems to exist. Try another option.`;
const VERIFIED = `Verified`;
const INVALID = `Invalid`;

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);
    // 'abcd@ybl','1234@ybl','8787989089@ksd','12124321290@okhdfc'
    this.state = {
      upiId: "",
      isVerified: false,
      isOfferAvailable: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      },
      savedUpi: [],
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

  /**
   * This functin will verify the status of the saved api
   */
  verifyUpi = ele => {
    this.setState({
      showUpiMsg: {
        upiId: ele,
        showLoader: true,
        text: "loader"
      }
    });
    setTimeout(() => {
      this.setState({
        showUpiMsg: {
          upiId: ele,
          isVerified: false,
          showLoader: false,
          text: INVALID
        }
      });
    }, 2000);
  };

  render() {
    let savedUpiVerificationCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.isVerified
        ? stylesx.verifiedIcon
        : stylesx.invalidIcon
      : "";
    let svdUpiLblHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.isVerified
        ? stylesx.verified
        : stylesx.svdUpErr
      : "";
    let verifiedStateHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.showLoader
        ? stylesx.invalidFrm
        : this.state.showUpiMsg.isVerified
          ? stylesx.verifiedFrm
          : stylesx.invalidFrm
      : "";
    return (
      <div className={styles.base}>
        {this.state.savedUpi.length !== 0 && (
          <React.Fragment>
            <div className={stylesx.upiSavedSec}>
              <div className={stylesx.svdUpiRow}>
                <div className={stylesx.svdUpiInfoCol}>
                  <h4 className={stylesx.svdUpiHedTxt}>
                    Select from your saved UPI ID’s
                  </h4>
                  <div className={stylesx.flexRow50 + " " + stylesx.flexWrap}>
                    {this.state.savedUpi &&
                      this.state.savedUpi.map(ele => (
                        <div className={stylesx.flexRow50Cols}>
                          <div className={stylesx.svdUpiLblBox}>
                            {this.state.showUpiMsg.upiId === ele ? (
                              <div
                                className={
                                  stylesx.svdUpiLbl + " " + svdUpiLblHelperCls
                                }
                                onClick={() => this.verifyUpi(ele)}
                              >
                                {ele}
                                <div
                                  className={
                                    stylesx.verifiedState +
                                    " " +
                                    verifiedStateHelperCls
                                  }
                                >
                                  <span className={savedUpiVerificationCls} />{" "}
                                  {this.state.showUpiMsg.text}
                                </div>
                              </div>
                            ) : (
                              <div
                                className={stylesx.svdUpiLbl}
                                onClick={() => this.verifyUpi(ele)}
                              >
                                {ele}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    <div className={stylesx.flexRow50Cols}>
                      <button type="button" className={stylesx.addNewUpiBtn}>
                        + Add new UPI ID
                      </button>
                    </div>
                  </div>
                </div>
                <div className={stylesx.svdUpiBtnCol}>
                  <button className={stylesx.upiPayBtn} type="button">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.state.savedUpi.length === 0 && (
          <React.Fragment>
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
                    boxy={true}
                    onChange={val => this.setState({ upiId: val })}
                    textStyle={{ fontSize: 14 }}
                    height={45}
                  />
                  {this.state.showUpiMsg.upiId === "" && (
                    <Button
                      type="primary"
                      isUpi={true}
                      backgroundColor="#ff1744"
                      height={35}
                      label="Verify"
                      width={77}
                      borderRadius={5}
                      position="absolute"
                      textStyle={{
                        color: "#FFF",
                        fontSize: 14
                      }}
                      onClick={val => this.verifyUpi(val)}
                    />
                  )}
                  {this.state.showUpiMsg.isVerified && (
                    <div
                      className={
                        stylesx.verifiedState + " " + verifiedStateHelperCls
                      }
                    >
                      <span className={savedUpiVerificationCls} />{" "}
                      {this.state.showUpiMsg.text}
                    </div>
                  )}
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
                We will save your UPI address for a faster checkout. To remove
                your details, visit my account.
              </p>
            </div>
          </React.Fragment>
        )}

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
