import React from "react";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import styles from "./OfferCard.css";
import PropTypes from "prop-types";
import {
  setDataLayerForPdpDirectCalls,
  setDataLayer,
  ADOBE_DIRECT_CALL_FOR_PDP_OFFER,
  ADOBE_OFFERS_PDP,
  ADOBE_OFFER_CARD_PDP,
  ADOBE_OFFER_CARD_TNC
} from "../../lib/adobeUtils.js";
import TimerCounter from "../../general/components/TimerCounter";
import { PRIMARY_OFFER } from "../../lib/constants";
import voucherImage from "./img/voucherImage.svg";
import sortBy from "lodash.sortby";
export default class OfferCard extends React.Component {
  state = {
    offerToBeShown: []
  };
  handleClick(val) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleShowDetails = (selectedOffer, offers) => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PDP_OFFER);
    if (this.props.showDetails) {
      this.props.showDetails({
        potentialPromotions: this.props.potentialPromotions,
        secondaryPromotions: this.props.secondaryPromotions,
        offers: offers,
        selectedOffer: selectedOffer,
        showVoucherOffersModal: this.props.showVoucherOffersModal
      });
    }
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
      offers: offers,
      showDetails: this.props.showDetails,
      potentialPromotions: this.props.potentialPromotions,
      secondaryPromotions: this.props.secondaryPromotions,
      productListings: this.props.productListings
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
    /*let getId =
      this.props.secondaryPromotions &&
      this.props.secondaryPromotions.isNoCostEmi;
    let getMessage =
      this.props.secondaryPromotions &&
      this.props.secondaryPromotions.messageID;
    if (this.props.potentialPromotions || this.props.secondaryPromotions) {
      return (
        <div
          className={
            this.props.theme === 2 ? styles.themeElectronics : styles.base
          }
        >
          <MobileOnly>
            <div className={styles.offerText}>Offer(s)</div>
          </MobileOnly>
          {this.props.potentialPromotions && (
            <div
              className={styles.headingText}
              onClick={this.handleShowDetails}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: this.props.potentialPromotions.title
                }}
              />
            </div>
          )}
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
    }*/
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
