import React from "react";
import styles from "./OfferCard.css";
import PropTypes from "prop-types";
import {
  setDataLayerForPdpDirectCalls,
  setDataLayerForCartDirectCalls,
  setDataLayer,
  ADOBE_DIRECT_CALL_FOR_PDP_OFFER,
  ADOBE_OFFERS_PDP,
  ADOBE_OFFER_CARD_PDP,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
  ADOBE_OFFER_CARD_TNC
} from "../../lib/adobeUtils.js";
import TimerCounter from "../../general/components/TimerCounter";
import { PRIMARY_OFFER } from "../../lib/constants";
import sortBy from "lodash.sortby";
import * as Cookie from "../../lib/Cookie";
import {
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SUCCESS,
  ERROR
} from "../../lib/constants";
import BundledProduct from "./BundledProduct";
// const bundledObject = {
//   channel: "ALL",
//   couponType: "PRODUCT_PROMOTION",
//   endDateAndTime: "2019-09-10 23:59:00",
//   name: "Special Discounted Price for Bundling*",
//   offerType: "Promotion",
//   priority: 1000,
//   promotionDisplayText:
//     "<a href=https://www.tatacliq.com/newpage?bundledProduct=true&bundledPromotionText=Hello$User&bundledProductCode=MP000000004656813&ussid=1242198904123052293&cartPromotionText=?Cart$Discounted?>Price inclusive of offer</a>",
//   startDateAndTime: "2019-08-13 13:00:00",
//   title: "Special Discounted Price*",
//   voucherIdentifier: "13AUG19GOOGLE1"
// };
export const BundledProductCode = "BundledProductCode";

export default class OfferCard extends React.Component {
  state = {
    offerToBeShown: [],
    bundledData: {}
  };
  handleClick(val) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleShowDetails = async (selectedOffer, offers) => {
    if (
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.rootCategory === "Electronics"
    ) {
      setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PDP_OFFER);
      let Title = selectedOffer.promotionDisplayText;
      if (Title.indexOf("bundledProduct") >= 0) {
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
    messageId: PropTypes.string,
    messageDetails: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string
  }),
  showDetails: PropTypes.func,
  theme: PropTypes.number
};
