import React from "react";
import styles from "./OfferModal.css";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
import TimerCounter from "../../general/components/TimerCounter";
import {
  setDataLayer,
  ADOBE_OFFER_CARD_VIEW_MORE_TNC
} from "../../lib/adobeUtils";
export default class VoucherOfferModal extends React.Component {
  handleShowDetails = (selectedOffer, offers) => {
    // this.props.closeModal();
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
    // setDataLayer(ADOBE_OFFER_CARD_VIEM_MORE, this.props.productListings);
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
          return (
            <div key={index} className={styles.container}>
              <div
                className={styles.description}
                onClick={() => this.handleShowDetails(offer, this.props.offers)}
                dangerouslySetInnerHTML={{ __html: offer.name }}
              />
              <div
                className={styles.termsAndConditions}
                onClick={() => this.handleTnCDetails(offer, this.props.offers)}
              >
                T&C
              </div>
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
