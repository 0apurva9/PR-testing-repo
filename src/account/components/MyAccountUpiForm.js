import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./MyAccountUpiForm.css";
import upi_opt from "../../cart/components/img/upi_opt.svg";
import loader from "./img/loader.gif";
import { setDataLayer, SET_DATA_LAYER_UID_SAVE } from "../../lib/adobeUtils";
const INVALID = `Invalid`;
const UPI_REGEX = /^[A-Za-z0-9.]+@[A-Za-z0-9]\w+$/;

export default class MyAccountUpiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upiId: "",
      upiPatternVerified: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      },
      savedUpi: [],
      error: ""
    };
  }

  verifyUpi = async ele => {
    this.setState({
      showUpiMsg: {
        upiId: ele
      }
    });
    if (this.props.addUPIDetails) {
      const response = await this.props.addUPIDetails(ele, "myaccount");
      if (
        response &&
        response.upiResponse &&
        response.upiResponse.status === "FAILURE" &&
        response.upiResponse.upiStatus === "VALID"
      ) {
        this.setState({
          showUpiMsg: {
            upiId: "",
            isVerified: true,
            text: ""
          }
        });
      } else if (
        response &&
        response.upiResponse &&
        response.upiResponse.status === "Success" &&
        response.upiResponse.upiStatus === "VALID"
      ) {
        this.setState({
          showUpiMsg: {
            upiId: "",
            isVerified: true,
            text: ""
          }
        });
        this.toggleForAddNewUpi(1);
        setDataLayer(SET_DATA_LAYER_UID_SAVE, "VALID");
      } else if (
        response &&
        response.upiResponse &&
        response.upiResponse.upiStatus === "INVALID"
      ) {
        this.setState({
          showUpiMsg: {
            upiId: ele,
            isVerified: false,
            text: response.upiResponse.error
          }
        });
        setDataLayer(SET_DATA_LAYER_UID_SAVE, "INVALID");
      }
    }
  };

  updateUpi = val => {
    this.setState({
      upiId: val,
      upiPatternVerified: UPI_REGEX.test(val),
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        text: ""
      }
    });
  };

  toggleForAddNewUpi = val => {
    if (this.props.toggleForAddNewUpi) {
      this.props.toggleForAddNewUpi(val);
    }
  };

  render() {
    let savedUpiVerificationCls = this.props.loading
      ? ""
      : this.state.showUpiMsg.isVerified
        ? styles.verifiedIcon
        : styles.invalidIcon;
    let verifiedStateHelperCls = this.props.loading
      ? ""
      : this.state.showUpiMsg.isVerified
        ? ""
        : styles.invalidFrm;
    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div
            className={
              styles.flexRow50 + " " + styles.mb20 + " " + styles.mainHed
            }
          >
            <b>Add a new UPI ID</b>
          </div>
          <div className={styles.flexRow50 + " " + styles.mb20}>
            <div className={styles.flexRow50Cols}>
              <img src={upi_opt} alt="imgg" />
            </div>
          </div>
          <div className={styles.upiHedTxt}>
            <p className={styles.upiHedTxt}>
              UPI ID is in the format of mobilenumber@upi or username@bank
            </p>
            <a
              id={styles.howPymntWork}
              href="/how-upi-works"
              target="_blank"
              rel="noopener noreferrer"
            >
              How UPI Payments work?
            </a>
          </div>
          <div className={styles.flexRow50NewCols}>
            <div className={styles.frmFeildRow}>
              <Input2
                placeholder="Enter your registered UPI ID*"
                value={this.state.upiId}
                boxy={true}
                onChange={val => this.updateUpi(val)}
                textStyle={{ fontSize: 14 }}
                height={45}
              />
              {this.state.showUpiMsg.upiId && (
                <React.Fragment>
                  <div
                    className={
                      styles.verifiedState + " " + verifiedStateHelperCls
                    }
                  >
                    {this.props.loading && (
                      <React.Fragment>
                        <span className={savedUpiVerificationCls} />{" "}
                        <img src={loader} alt="Loader" />
                      </React.Fragment>
                    )}
                  </div>
                  {!this.props.loading &&
                    !this.state.showUpiMsg.isVerified && (
                      <React.Fragment>
                        <div
                          className={
                            styles.verifiedState + " " + verifiedStateHelperCls
                          }
                        >
                          <span className={savedUpiVerificationCls} /> {INVALID}
                        </div>
                        <p className={styles.errorTxt}>
                          {this.state.showUpiMsg.text}
                        </p>
                      </React.Fragment>
                    )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className={styles.flexRow50NewCols}>
            <div className={styles.upiPayBtnSec}>
              <Button
                disabled={this.state.upiPatternVerified ? false : true}
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label="Verify & Save"
                width={152}
                borderRadius={20}
                float="left"
                textStyle={{
                  color: "#FFF",
                  fontSize: 14
                }}
                onClick={() => this.verifyUpi(this.state.upiId)}
              />
              <Button
                type="hollow"
                backgroundColor="#ff1744"
                height={35}
                label="Cancel"
                width={160}
                borderRadius={22}
                borderColor={``}
                border={``}
                textStyle={{
                  color: "#FFF",
                  fontSize: 14,
                  fontFamily: "regular"
                }}
                onClick={() => this.toggleForAddNewUpi(1)}
              />
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
MyAccountUpiForm.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  addUPIDetails: PropTypes.func,
  toggleForAddNewUpi: PropTypes.func,
  loading: PropTypes.bool
};
