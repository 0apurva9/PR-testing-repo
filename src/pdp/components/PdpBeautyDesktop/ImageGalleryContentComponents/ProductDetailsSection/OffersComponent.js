import React from "react";
import sortBy from "lodash.sortby";

import styles from "./OffersComponent.css";

export default class OffersComponent extends React.Component {
  showVoucherOffersModal(e, offers) {
    e.preventDefault();
    this.props.showBeautyOfferDetails({
      offers: offers,
      showDetails: this.props.showTermsNConditions
    });
  }

  render() {
    let offers = [];
    let offersTobeShown = [];
    offers = [...(this.props && this.props.offers)];
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
    if (offers.length > 0) {
      return (
        <div className={styles["offers-component"]}>
          <div className={styles["offers-block"]}>
            <div className={styles["offers-heading"]}>OFFERS:</div>
            <div className={styles["offers-list-container"]}>
              <ul className={styles["offers-list-block"]}>
                {offersTobeShown.map((offer, i) => {
                  return (
                    <li
                      key={i}
                      className={styles["offers-list"]}
                      dangerouslySetInnerHTML={{ __html: offer.name }}
                      onClick={e => this.showVoucherOffersModal(e, offers)}
                    ></li>
                  );
                })}
              </ul>
              {offers.length > 2 && (
                <a
                  href={""}
                  onClick={e => this.showVoucherOffersModal(e, offers)}
                  className={styles["offers-list-link"]}
                >
                  See all
                </a>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
