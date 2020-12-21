import React from "react";
import {
  RUPEE_SYMBOL,
  AC_PDP_EXCHANGE_DETAILS,
  EXCHANGE_ADDED_MESSAGE,
  EXCHANGE_REMOVED_MESSAGE
} from "../../lib/constants";
import PropTypes from "prop-types";
import exchangeLogoLoader from "./img/exchangeLogoLoader.svg";
import Icon from "../../xelpmoc-core/Icon";
import exchangeCheck from "../../pdp/components/img/exchangeCheck.svg";
import exchangeUncheck from "../../pdp/components/img/exchangeUncheck.svg";
import styles from "./ExchangeDetailsPDPDesktop.css";
import {
  setDataLayer,
  ADOBE_TRACK_APPLIANCES_EXCHANGE_JOURNEY
} from "../../lib/adobeUtils";

export default class AppliancesExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeData: null,
      removeExchange: false
    };
  }

  componentDidMount() {
    let exchangeDetails = localStorage.getItem(AC_PDP_EXCHANGE_DETAILS);
    if (exchangeDetails) {
      let parsedExchangeDetails = JSON.parse(exchangeDetails);
      this.setState({ exchangeData: parsedExchangeDetails });
      if (
        parsedExchangeDetails.isExchangeSelected &&
        parsedExchangeDetails.ussid &&
        parsedExchangeDetails.ussid === this.props.ussid
      ) {
        this.setState({ removeExchange: true });
      } else {
        this.setState({ removeExchange: false });
      }
      if (
        parsedExchangeDetails.isExchangeSelected &&
        parsedExchangeDetails.ussid &&
        parsedExchangeDetails.ussid !== this.props.ussid
      ) {
        parsedExchangeDetails.isExchangeSelected = false;
      }
      //update ussid for every pdp
      parsedExchangeDetails.ussid = this.props.ussid;
      localStorage.setItem(
        AC_PDP_EXCHANGE_DETAILS,
        JSON.stringify(parsedExchangeDetails)
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updatedAppliancesExchangeDetails &&
      this.props.updatedAppliancesExchangeDetails !==
        prevProps.updatedAppliancesExchangeDetails
    ) {
      this.setState({
        exchangeData: this.props.updatedAppliancesExchangeDetails,
        removeExchange: true
      });
      this.props.displayToast(EXCHANGE_ADDED_MESSAGE);
    }
  }

  openAppliancesExchangeModal(data) {
    setDataLayer(ADOBE_TRACK_APPLIANCES_EXCHANGE_JOURNEY);
    this.props.openAppliancesExchangeModal(data);
  }

  trimProductName(productName) {
    if (productName && productName.length > 22) {
      return productName.substring(0, 21) + ".. ";
    } else {
      return productName;
    }
  }

  addOrRemoveExchange() {
    this.setState({ removeExchange: !this.state.removeExchange });
    if (!this.state.removeExchange) {
      this.props.displayToast(EXCHANGE_ADDED_MESSAGE);
      let acPdpExchangeDetails = this.state.exchangeData;
      if (acPdpExchangeDetails) {
        acPdpExchangeDetails.ussid = this.props.ussid;
        acPdpExchangeDetails.isExchangeSelected = true;
        localStorage.setItem(
          AC_PDP_EXCHANGE_DETAILS,
          JSON.stringify(acPdpExchangeDetails)
        );
        this.setState({ exchangeData: acPdpExchangeDetails });
      }
    } else {
      this.props.displayToast(EXCHANGE_REMOVED_MESSAGE);
      let acPdpExchangeDetails = this.state.exchangeData;
      if (acPdpExchangeDetails) {
        acPdpExchangeDetails.isExchangeSelected = false;
        localStorage.setItem(
          AC_PDP_EXCHANGE_DETAILS,
          JSON.stringify(acPdpExchangeDetails)
        );
        this.setState({ exchangeData: acPdpExchangeDetails });
      }
    }
  }

  render() {
    return (
      <div className={styles.appliancesExchangeMainContainer}>
        <div className={styles.exchangeLogoContainer}>
          <img
            src={exchangeLogoLoader}
            className={styles.exchangeLogoLoader}
            alt="exchangeLogoLoader"
          />
          <div className={styles.exchangeLogo} />
        </div>
        <div
          className={
            this.state.exchangeData
              ? styles.exchangeContainerNoMargin
              : styles.exchangeContainerAppliances
          }
        >
          <React.Fragment>
            {!this.state.exchangeData ? (
              <div className={styles.exchangeLink}>
                {this.props.appliancesExchangeDetails &&
                  this.props.appliancesExchangeDetails.desktopDescription}{" "}
                <span
                  className={styles.withExchangeLink}
                  onClick={() =>
                    this.openAppliancesExchangeModal({
                      ussid: this.props.ussid
                    })
                  }
                >
                  with Exchange
                </span>
              </div>
            ) : (
              <div className={styles.exchangeLink}>
                Get{" "}
                <span className={styles.fontRegular}>
                  {this.state.exchangeData.totalExchangeAmount}{" "}
                </span>
                cashback on your{" "}
                <span className={styles.fontRegular}>
                  {this.trimProductName(this.state.exchangeData.brandName)}-
                  {this.state.exchangeData.type} AC{" "}
                </span>
              </div>
            )}
            <div
              className={styles.appliancesExchangeDetails}
              onClick={() =>
                this.openAppliancesExchangeModal({
                  showAppliancesExchangeWorks: true
                })
              }
            >
              How Exchange works?
            </div>
            {this.state.exchangeData && (
              <span
                className={styles.changeDeviceLink}
                onClick={() =>
                  this.openAppliancesExchangeModal({
                    ussid: this.props.ussid
                  })
                }
              >
                Change Device
              </span>
            )}
          </React.Fragment>
        </div>
        {this.state.exchangeData && (
          <div
            className={styles.addRemoveExchangeIconHolder}
            onClick={() => this.addOrRemoveExchange()}
          >
            <Icon image={exchangeUncheck} size={24} />
            {this.state.removeExchange && (
              <div className={styles.exchangeCheckContainer}>
                <Icon image={exchangeCheck} size={14} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

AppliancesExchange.propTypes = {
  openAppliancesExchangeModal: PropTypes.func,
  appliancesExchangeDetails: PropTypes.object,
  productData: PropTypes.object,
  ussid: PropTypes.string
};
