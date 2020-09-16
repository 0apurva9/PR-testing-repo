import React, { Component } from "react";
import styles from "./AvailableOffersMyAcc.css";
import { Link } from "react-router-dom";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_GIFT_CARD_PURCHASE_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PURCHASE_PAGE
} from "../../lib/constants";
import PropTypes, { arrayOf, string, number, shape } from "prop-types";
const TOPUP = "TOPUP";

export default class AvailableOffersMyAcc extends Component {
  navigationToRespectivePages = offer => {
    console.log(offer);
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
                        <div className={styles.offerAvailHeading}>
                          {offer.offerDesc}
                          <span>
                            <Link to={"www.google.com"} target="_blank">
                              {" "}
                              View more
                            </Link>
                          </span>
                        </div>
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
  })
};
