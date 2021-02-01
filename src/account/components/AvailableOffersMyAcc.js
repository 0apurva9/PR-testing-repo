import React, { Component } from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./AvailableOffersMyAcc.css";
import { Link } from "react-router-dom";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE
} from "../../lib/constants";
import PropTypes, { arrayOf, string, number, shape } from "prop-types";
import moment from "moment";
const TOPUP = "TOPUP";

export default class AvailableOffersMyAcc extends Component {
  navigationToRespectivePages = offer => {
    if (window._satellite) {
      window._satellite.track("cliqCash_Offer_Click");
    }
    if (window && window.digitalData) {
      Object.assign(window.digitalData, {
        cliqcash: {
          offer: {
            name: offer.offerDesc
          }
        }
      });
    }
    if (offer.cashbackMode === TOPUP) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE}`,
        state: {
          offerDetails: offer
        }
      });
    } else {
      this.props.history.push({
        pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE}`,
        state: {
          offerDetails: offer
        }
      });
    }
  };

  popupBody = offer => {
    const expiryDate = moment(offer.offerEndDate).format("Do MMM, YYYY");
    const expiryTime = moment(offer.offerEndDate).format("h:mm A");
    return (
      <div className={styles.cashBackOfferLine}>
        <div
          className={styles.cashBackOfferLine1}
          dangerouslySetInnerHTML={{ __html: offer.offerDesc }}
        />
        <div className={styles.cashBackOfferLine2}>
          Maximum applicable cashback:{" "}
          <span className={styles.priceDate}>
            {offer.maxCashback && offer.maxCashback.formattedValueNoDecimal}
          </span>
        </div>
        <div className={styles.cashBackOfferLine3}>
          Offer valid till:{" "}
          <span className={styles.priceDate}>{expiryDate}</span> | {expiryTime}
        </div>
        <div className={styles.cashBackOfferLine4}>
          To know more about the cashback offer{" "}
          <Link
            to={"/cliqcashback-offers-tnc"}
            target="_blank"
            className={styles.viewTNC}
          >
            view T&C.
          </Link>
        </div>
      </div>
    );
  };

  showPopup = offer => {
    if (this.props.showCashBackDetailsPopup) {
      this.props.showCashBackDetailsPopup({
        heading: "Cashback Details",
        children: this.popupBody(offer)
      });
    }
  };

  render() {
    return (
      <div className={styles.offerBase}>
        <div className={styles.offerContainer}>
          <div className={styles.flexJustify}>
            <div className={styles.offerHeading}>Available Offers</div>
          </div>
          {this.props.cliqCashbackDetails &&
            this.props.cliqCashbackDetails.cashbackOffers &&
            this.props.cliqCashbackDetails.cashbackOffers.map(
              (offer, index) => {
                return (
                  <div
                    className={
                      this.props.cliqCashbackDetails.cashbackOffers.length !==
                        index + 1
                        ? [
                          styles.offerAvailContainer,
                          styles.borderBottom
                        ].join(" ")
                        : styles.offerAvailContainer
                    }
                    key={index}
                  >
                    <div className={styles.offerAvailIconHolder}>
                      <div className={styles.offerAvailIcon} />
                    </div>
                    <div className={styles.offerAvail}>
                      <div className={styles.offerAvailHeaderAndSubHeading}>
                        <span
                          className={styles.offerAvailHeading}
                          dangerouslySetInnerHTML={{ __html: offer.offerDesc }}
                        />
                        <span
                          className={styles.viewMore}
                          onClick={() => this.showPopup(offer)}
                        >
                          {" "}
                          view more
                        </span>
                      </div>
                      <div
                        className={styles.faqOptionArrow}
                        onClick={() => this.navigationToRespectivePages(offer)}
                      >
                        <div className={styles.arrowRight} />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    );
  }
}
AvailableOffersMyAcc.propTypes = {
  showCashBackDetailsPopup: PropTypes.func,
  cliqCashbackDetails: PropTypes.shape({
    cashbackOffers: arrayOf(
      PropTypes.shape({
        cashbackMode: string,
        cashbackType: string,
        offerValue: string,
        offerThreshold: shape({
          currencyIso: string,
          doubleValue: number,
          formattedValue: string,
          formattedValueNoDecimal: string,
          value: number
        }),
        offerDesc: string,
        offerStatus: string,
        maxCashback: shape({
          currencyIso: string,
          doubleValue: number,
          formattedValue: string,
          formattedValueNoDecimal: string,
          value: number
        }),
        offerStartDate: string,
        offerEndDate: string
      })
    )
  }),
  ...RouterPropTypes
};
