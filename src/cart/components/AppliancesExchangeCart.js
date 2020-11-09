import React from "react";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
import closeIcon from "../../cart/components/img/exchangeCloseIcon.svg";
import styles from "./CartItemForDesktop.css";
import PropTypes from "prop-types";

export default class AppliancesExchangeCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeData: null
    };
  }

  componentDidMount() {
    let cartExchangeDetails = localStorage.getItem("acCartExchangeDetails");
    if (cartExchangeDetails) {
      let parsedExchangeDetails = JSON.parse(cartExchangeDetails);
      let exchangeDetails = parsedExchangeDetails.find(data => {
        return data.ussid === this.props.productUssid;
      });
      if (exchangeDetails) {
        this.setState({ exchangeData: exchangeDetails });
      }
    }
  }

  removeExchange() {
    // remove data from exchange
  }

  openAppliancesExchangeModal(data) {
    this.props.openAppliancesExchangeModal(data);
  }

  render() {
    if (!this.state.exchangeData) {
      return null;
    }

    return (
      <React.Fragment>
        <div
          className={
            this.props.pinCodeResponse &&
            this.props.pinCodeResponse.errorMessagePincode
              ? styles.exchangeDetailsPickupNotAvail
              : styles.exchangeDetails
          }
        >
          <div className={styles.exchangeDetailsSectionOne}>
            <img
              src={closeIcon}
              alt="exchange icon"
              className={styles.closeIcon}
              onClick={() => this.removeExchange()}
            />
            <img
              src={exchangeIconLight}
              alt="exchange icon"
              className={styles.exchangeIcon}
            />
            <div className={styles.exchangeDetailsHeading}>
              Exchange Cashback for{" "}
              <span className={styles.exchangeProductName}>
                {this.state.exchangeData && this.state.exchangeData.brandName}
              </span>
            </div>
          </div>
          <div className={styles.exchangeDetailsSectionTwo}>
            <div className={styles.exchangePriceNDetails}>
              <div className={styles.exchangePrice}>
                {this.state.exchangeData &&
                  this.state.exchangeData.totalExchangeAmount}
              </div>
              <div
                className={styles.exchangeViewDetails}
                onClick={() =>
                  this.openAppliancesExchangeModal({
                    showAppliancesExchangeWorks: true
                  })
                }
              >
                Know more
              </div>
            </div>
          </div>
        </div>
        {this.props.pinCodeResponse &&
          this.props.pinCodeResponse.errorMessagePincode && (
            <div className={styles.exchangeProductNotServiceable}>
              {this.props.pinCodeResponse.errorMessagePincode}
            </div>
          )}
        {!this.props.productIsServiceable && (
          <div className={styles.exchangeProductNotServiceable}>
            Cannot service Exchange since main product not serviceable
          </div>
        )}
      </React.Fragment>
    );
  }
}

AppliancesExchangeCart.propTypes = {
  productUssid: PropTypes.string,
  openAppliancesExchangeModal: PropTypes.func,
  pinCodeResponse: PropTypes.object,
  productIsServiceable: PropTypes.bool
};
