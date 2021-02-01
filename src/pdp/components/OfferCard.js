import React from "react";
import styles from "./OfferCard.css";
import PropTypes from "prop-types";
import {
  setDataLayerForPdpDirectCalls,
  setDataLayer,
  ADOBE_DIRECT_CALL_FOR_PDP_OFFER,
  ADOBE_PRODUCT_BUNDLED_OFFER,
} from "../../lib/adobeUtils.js";
import TimerCounter from "../../general/components/TimerCounter";
import { PRIMARY_OFFER } from "../../lib/constants";
import sortBy from "lodash.sortby";
import {
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";

export const BundledProductCode = "BundledProductCode";

export default class OfferCard extends React.Component {
  state = {
    offerToBeShown: [],
    bundledData: {}
  };

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  handleShowDetails = async (selectedOffer, offers) => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PDP_OFFER);
    let Title = selectedOffer.promotionDisplayText;
    if (
      Title &&
      Title.indexOf("bundledProduct") >= 0 &&
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.rootCategory === "Electronics"
    ) {
      setDataLayer(ADOBE_PRODUCT_BUNDLED_OFFER);
      await this.getParams(Title)
        .then(data => {
          if (
            data !== false &&
            data.status !== "error" &&
            data.status !== "Failure"
          ) {
            this.props.showBundledProduct(this.state.bundledData);
          }
        })
        .catch(e => {
          throw Error(e);
        });
    } else {
      if (this.props.showDetails) {
        this.props.showDetails({
          potentialPromotions: this.props.potentialPromotions,
          secondaryPromotions: this.props.secondaryPromotions,
          offers: offers,
          selectedOffer: selectedOffer,
          showVoucherOffersModal: this.props.showVoucherOffersModal
        });
      }
    }
  };

  getBundleProductServibilty = async params => {
    return await this.props.getBundleProductPinCode(
      this.props.pincode && this.props.pincode.pinCode,
      params.bundledProductCode,
      params.ussid
    );
  };

  getParams = async Title => {
    let bundleProduct;
    var snippet = document.createElement("div");
    snippet.innerHTML = Title;
    var params = {};
    var parser = document.createElement("a");
    parser.href = Title;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    if (params) {
      this.setState({ bundledData: params });
      bundleProduct = await this.props.getBundleproduct(
        params.bundledProductCode
      );
      let cartPromotionText = params && params.cartPromotionText;
      if (cartPromotionText) {
        var replacedDollarInCartPromotionText = cartPromotionText
          .split("$")
          .join(" ");
        localStorage.setItem(
          "cartPromotionText",
          replacedDollarInCartPromotionText
        );
      }
      if (
        bundleProduct &&
        bundleProduct.status === "success" &&
        bundleProduct.data.rootCategory !== "Electronics"
      ) {
        return false;
      }
      if (bundleProduct.status === "success") {
        let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
          ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
          : "";
        bundleProduct = await this.props.getBundleProductPinCode(
          pinCode,
          params.bundledProductCode,
          params.ussid
        );
      }
    }
    return bundleProduct;
  };

  handleTerms = (selectedOffer, offers) => {
    if (this.props.showDetails) {
      this.props.showDetails({
        offers: offers,
        selectedOffer: selectedOffer
      });
    }
    //setDataLayer(ADOBE_OFFER_CARD_TNC, this.props.productListings);
  };

  showVoucherOffersModal = offers => {
    this.props.showVoucherOffersModal({
      ...this.props,
      offers: offers,
      showDetails: this.props.showDetails,
      potentialPromotions: this.props.potentialPromotions,
      secondaryPromotions: this.props.secondaryPromotions,
      productListings: this.props.productListings,
      getBundleproduct: this.props.getBundleproduct,
      getProductPinCode: this.props.getProductPinCode,
      defaultPinCode: this.props.defaultPinCode,
      showBundledProduct: this.props.showBundledProduct,
      bundlePincodeServicbilty: this.props.bundlePincodeServicbilty,
      displayToast: this.props.displayToast
    });
    //  setDataLayer(ADOBE_OFFERS_PDP, this.props.productListings);
  };

  createOffersForPdp(offers) {
    let i = 0;
    let offerToBeShown = [];
    while (i < 2 && offers && offers.length) {
      if (offers[i]) {
        offerToBeShown.push(offers[i]);
      }
      i++;
    }
    this.setState({ offerToBeShown: offerToBeShown });
  }

  checkTimer(timerStartTime, endDateTime, couponType) {
    if (couponType === PRIMARY_OFFER) {
      return null;
    } else {
      if (
        new Date() >= new Date(timerStartTime) &&
        new Date(timerStartTime) <= new Date(endDateTime)
      ) {
        return (
          <div className={styles.counter}>
            <div className={styles.offerEndsIn}>OFFER ENDS IN </div>
            <TimerCounter endTime={endDateTime} onComplete={this.onComplete} />
          </div>
        );
      } else {
        return null;
      }
    }
  }

  createMarkup = input => {
    return { __html: input };
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.offers &&
      this.props.offers.length === 0 &&
      nextProps.offers.length
    ) {
      this.createOffersForPdp(nextProps.offers);
    }
  }

  componentDidMount() {
    if (this.props.offers && this.props.offers.length) {
      this.createOffersForPdp(this.props.offers);
    }
  }

  render() {
    let offers = [];
    let offersTobeShown = [];
    let getId =
      this.props.secondaryPromotions &&
      this.props.secondaryPromotions.isNoCostEmi;
    let getMessage =
      this.props.secondaryPromotions &&
      this.props.secondaryPromotions.messageID;

    if (this.props.offers) {
      offers = [...this.props.offers];
    }
    // offers.push(bundledObject);
    offers &&
      offers.forEach(offer => {
        if (!offer.sequence) {
          offer.sequence = 0;
        }
      });
    offers = sortBy(offers, ["sequence"]);
    let i = 0;
    while (i < 2 && offers && offers.length) {
      if (offers[i]) {
        offersTobeShown.push(offers[i]);
      }
      i++;
    }
    if (offers.length) {
      return (
        <div className={styles.offers}>
          {offersTobeShown.map((offer, key) => {
            let mainDivClass = styles.mainDivWithoutBorder;
            if (offersTobeShown.length === 1) {
              mainDivClass = styles.mainDivWithoutBorder;
            } else if (key === 0) {
              mainDivClass = styles.mainDivWithoutBorder;
            } else {
              mainDivClass = styles.mainDivWithoutBorder;
            }
            return (
              <div key={key} className={mainDivClass}>
                <div className={styles.container}>
                  <ul className={styles.liHeader}>
                    <li
                      className={styles.headingTextNew}
                      dangerouslySetInnerHTML={{ __html: offer.name }}
                      onClick={() => this.handleShowDetails(offer, offers)}
                    />
                  </ul>
                </div>

                {/* {offer.offerEndTimerStartDateAndTime
                  ? this.checkTimer(
                      offer.offerEndTimerStartDateAndTime,
                      offer.endDateAndTime,
                      offer.couponType
                    )
                  : null} */}
              </div>
            );
          })}
          {offers.length > 2 ? (
            <div
              className={styles.viewMore}
              onClick={() => this.showVoucherOffersModal(offers)}
            >
              <span className={styles.viewMoreBorder}>View More</span>
              {/* <div className={styles.viewMoreArrow}>
              <Icon image={downArrowPink} size={10} />
            </div> */}
            </div>
          ) : null}

          <MobileOnly>
            {this.props.secondaryPromotions && (
              <div
                className={styles.headingText}
                onClick={this.handleShowDetails}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: this.props.secondaryPromotions.messageID
                  }}
                />
              </div>
            )}
          </MobileOnly>
          <DesktopOnly>
            {this.props.secondaryPromotions &&
              getId === "false" && (
                <div
                  className={styles.headingText}
                  onClick={this.handleShowDetails}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: this.props.secondaryPromotions.messageID
                    }}
                  />
                </div>
              )}

            {this.props.secondaryPromotions &&
              getId === "true" &&
              getMessage &&
              !getMessage.includes("No Cost EMI") && (
                <div
                  className={styles.headingText}
                  onClick={this.handleShowDetails}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: this.props.secondaryPromotions.messageID
                    }}
                  />
                </div>
              )}
          </DesktopOnly>
        </div>
      );
    } else {
      return null;
    }
  }
}
OfferCard.propTypes = {
  potentialPromotions: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string
  }),
  secondaryPromotions: PropTypes.shape({
    messageID: PropTypes.string,
    messageDetails: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    isNoCostEmi: PropTypes.bool,
  }),
  showDetails: PropTypes.func,
  theme: PropTypes.number,
  onClick: PropTypes.func,
  productDetails: PropTypes.object,
  showBundledProduct: PropTypes.func,
  getBundleProductPinCode: PropTypes.func,
  showVoucherOffersModal: PropTypes.func,
  getBundleproduct: PropTypes.func,
  productListings: PropTypes.array,
  getProductPinCode: PropTypes.func,
  bundlePincodeServicbilty: PropTypes.bool,
  displayToast: PropTypes.func,
  defaultPinCode: PropTypes.string,
  offers: PropTypes.array,
  pincode: PropTypes.object
};
