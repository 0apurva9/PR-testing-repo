import React from "react";
import styles from "./OfferModal.css";
import TimerCounter from "../../general/components/TimerCounter";
import {
  setDataLayer,
  ADOBE_PRODUCT_BUNDLED_OFFER
} from "../../lib/adobeUtils";
import { DEFAULT_PIN_CODE_LOCAL_STORAGE } from "../../lib/constants";
export default class VoucherOfferModal extends React.Component {
  state = {
    addBundledProduct: [],
    bundledData: {}
  };

  handleShowDetails = async (selectedOffer, offers) => {
    let Title = selectedOffer.promotionDisplayText;
    if (Title && Title.indexOf("bundledProduct") >= 0) {
      setDataLayer(ADOBE_PRODUCT_BUNDLED_OFFER);
      await this.getParams(Title)
        .then(data => {
          if (data.status !== "error" && data.status !== "Failure") {
            this.props.showBundledProduct(this.state.bundledData);
          }
        })
        .catch(e => {
          throw Error(e);
        });
    } else {
      if (this.props.showDetails) {
        this.props.showDetails({
          offers: offers,
          selectedOffer: selectedOffer,
          showVoucherModal: true,
          showDetails: this.props.showDetails,
          potentialPromotions: this.props.potentialPromotions,
          productListings: this.props.productListings
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
      if (
        bundleProduct &&
        bundleProduct.status === "success" &&
        bundleProduct.data.rootCategory !== "Electronics"
      ) {
        return false;
      }
      let cartPromotionText = params && params.cartPromotionText;
      var replacedDollarInCartPromotionText = cartPromotionText
        .split("$")
        .join(" ");
      localStorage.setItem(
        "cartPromotionText",
        replacedDollarInCartPromotionText
      );
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

  handleTnCDetails = (selectedOffer, offers) => {
    if (this.props.showDetails) {
      this.props.showDetails({
        offers: offers,
        selectedOffer: selectedOffer,
        showVoucherModal: true,
        showDetails: this.props.showDetails,
        potentialPromotions: this.props.potentialPromotions,
        productListings: this.props.productListings
      });
    }
    // setDataLayer(ADOBE_OFFER_CARD_VIEW_MORE_TNC, this.props.productListings);
  };

  checkTimerForPotential() {
    let endDateTime;
    let timerStartTime;
    if (
      this.props.potentialPromotions &&
      this.props.potentialPromotions.endDate &&
      this.props.potentialPromotions.timerStartTime
    ) {
      endDateTime = this.props.potentialPromotions.endDate.split(" ");

      let time = endDateTime[3];
      let year = endDateTime[5];

      endDateTime[3] = year;
      endDateTime[4] = time;
      endDateTime.splice(5, 1);
      endDateTime = new Date(endDateTime.join().replace(",", " "));

      timerStartTime = this.props.potentialPromotions.timerStartTime.split(" ");
      time = timerStartTime[3];
      year = timerStartTime[5];

      timerStartTime[3] = year;
      timerStartTime[4] = time;
      timerStartTime.splice(5, 1);
      timerStartTime = new Date(timerStartTime.join().replace(",", " "));

      if (new Date() >= timerStartTime && timerStartTime <= endDateTime) {
        return (
          <div className={styles.counterModal}>
            <span className={styles.offerEndsIn}>OFFER ENDS IN</span>
            <TimerCounter endTime={endDateTime} onComplete={this.onComplete} />
          </div>
        );
      }
    }
  }

  checkTimer(timerStartTime, endDateTime, isPotential) {
    if (isPotential) {
      return this.checkTimerForPotential();
    }
    if (
      new Date() >= new Date(timerStartTime) &&
      new Date(timerStartTime) <= new Date(endDateTime)
    ) {
      return (
        <div className={styles.counter}>
          <span className={styles.offerEndsIn}>OFFER ENDS IN</span>
          <TimerCounter endTime={endDateTime} onComplete={this.onComplete} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>Offers</div>
        {this.props.offers.map((offer, index) => {
          let bundleItem = offer.promotionDisplayText;
          return (
            <div key={index} className={styles.container}>
              <div
                className={styles.description}
                onClick={() => this.handleShowDetails(offer, this.props.offers)}
                dangerouslySetInnerHTML={{ __html: offer.name }}
              />
              {bundleItem && bundleItem.indexOf("bundledProduct") ? (
                <div
                  className={styles.termsAndConditions}
                  onClick={() =>
                    this.handleShowDetails(offer, this.props.offers)
                  }
                >
                  T&C
                </div>
              ) : (
                <div
                  className={styles.termsAndConditions}
                  onClick={() =>
                    this.handleTnCDetails(offer, this.props.offers)
                  }
                >
                  T&C
                </div>
              )}

              {offer.offerEndTimerStartDateAndTime
                ? this.checkTimer(
                    offer.offerEndTimerStartDateAndTime,
                    offer.endDateAndTime,
                    offer.isPotential
                  )
                : null}
            </div>
          );
        })}
      </div>
    );
  }
}
