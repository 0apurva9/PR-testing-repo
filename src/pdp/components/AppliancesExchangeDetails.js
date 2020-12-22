import React from "react";
import { AC_PDP_EXCHANGE_DETAILS } from "../../lib/constants";
import styles from "./ExchangeModal.css";
import closeIcon from "../../general/components/img/closeIcon.svg";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import exchangeCashback from "./img/exchangeCashback.svg";
import HowAppliancesExchangeWorksLessDetails from "./HowAppliancesExchangeWorksLessDetails";
import cashbackIcon from "../../general/components/img/infoCashback.svg";

export default class AppliancesExchangeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreedTnCState: false
    };
  }

  resetState(section) {
    this.props.resetState(section);
  }

  showHowAppliancesExchangeWorks() {
    this.props.showHowAppliancesExchangeWorks();
  }

  agreedTnC(e) {
    if (e.target.checked) {
      this.setState({ agreedTnCState: true });
    } else {
      this.setState({ agreedTnCState: false });
    }
  }

  openTnCModal() {
    this.props.openTnCModal();
  }

  saveAppliancesExchangeDetails() {
    let exchangeData = this.props.exchangeData;
    exchangeData.isExchangeSelected = true;
    localStorage.setItem(AC_PDP_EXCHANGE_DETAILS, JSON.stringify(exchangeData));
    this.props.closeAppliancesExchangeModal();
    this.props.updateAppliancesExchangeDetails(exchangeData);
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.deviceDetails}>
          <div className={styles.yourDeviceText}>Your Device</div>
          <div
            className={styles.changeDeviceText}
            onClick={() => this.resetState("all")}
          >
            Change Device
          </div>
          <div className={styles.exchangeDetailsContainer}>
            <div className={styles.aeDeviceName}>
              {this.props.exchangeData.brandName} {this.props.exchangeData.type}{" "}
              AC{" "}
            </div>
            <div className={styles.aeDeviceInfo}>
              {this.props.exchangeData.modelCapacity}
              <br />
              {this.props.exchangeData.state}
            </div>
            <div className={styles.exchangeCashbackText}>Exchange Cashback</div>
            <div className={styles.exchangePrice}>
              {this.props.exchangeData.totalExchangeAmount}
            </div>
            <div className={styles.cashbackIconContainer}>
              <Icon image={cashbackIcon} size={18} />
              <div className={styles.cashbackTooltip}>
                <span className={styles.cashbackDetailsHeading}>
                  Cashback Details
                </span>
                <span className={styles.leftSection}>Base Value</span>
                <span className={styles.rightSection}>
                  {this.props.exchangeData.exchangeAmount}
                </span>
                <span className={styles.leftSection}>
                  CLiQ Exclusive Cashback
                </span>
                <span className={styles.rightSection}>
                  {this.props.bonusExchangeAmount}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.exchangeCashbackContainer}>
            <Icon image={exchangeCashback} size={139} />
          </div>
        </div>
        <div className={styles.aeBottomContainer}>
          <div className={styles.aeSmallHeading}>How Exchange works?</div>
          <div
            className={styles.aeKnowMoreContainer}
            onClick={() => this.showHowAppliancesExchangeWorks()}
          >
            <span className={styles.aeKnowMoreText}>Know more</span>
          </div>
          <HowAppliancesExchangeWorksLessDetails />
          <div className={styles.aeBottomButtonLinkContainer}>
            <div className={styles.aeTncContainer}>
              <input
                type="checkbox"
                className={styles.tncCheckbox}
                onChange={e => this.agreedTnC(e)}
                checked={this.state.agreedTnCState}
              />
              <div className={styles.tnc}>
                I understand the{" "}
                <span
                  className={styles.tncText}
                  onClick={() => this.openTnCModal()}
                >
                  Terms & Conditions
                </span>{" "}
                of Exchange.
              </div>
            </div>
            <div className={styles.aeExchangeButtonContainer}>
              {this.state.agreedTnCState ? (
                <div
                  className={styles.exchangeButtonEnabled}
                  onClick={() => this.saveAppliancesExchangeDetails()}
                >
                  Apply Exchange
                </div>
              ) : (
                <div className={styles.exchangeButton}>Apply Exchange</div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AppliancesExchangeDetails.propTypes = {
  resetState: PropTypes.func,
  showHowAppliancesExchangeWorks: PropTypes.func,
  openTnCModal: PropTypes.func,
  exchangeData: PropTypes.object,
  closeAppliancesExchangeModal: PropTypes.func,
  updateAppliancesExchangeDetails: PropTypes.func,
  bonusExchangeAmount: PropTypes.string
};
