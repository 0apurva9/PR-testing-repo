import React from "react";
import styles from "./BeautyOfferModal.css";

export default class BeautyOfferModal extends React.Component {
  render() {
    return (
      <div className={styles["modal-content"]}>
        <div className={styles["modal-heading"]}>OFFERS</div>
        <div className={styles["modal-inner-content"]}>
          {this.props.offers.map((offer, i) => {
            return (
              <div className={styles["modal-offer-block"]} key={i}>
                <div
                  className={styles["modal-offers-list"]}
                  dangerouslySetInnerHTML={{ __html: offer.name }}
                ></div>
                <div className={styles["modal-offer-valid-details"]}>
                  <div className={styles["modal-valid-from"]}>
                    <span className={styles["modal-valid-from-txt"]}>
                      Valid From:
                    </span>
                    {offer.startDateAndTime}
                  </div>
                  <div className={styles["modal-valid-till"]}>
                    <span className={styles["modal-valid-till-txt"]}>
                      Valid Till:
                    </span>
                    {offer.endDateAndTime}
                  </div>
                </div>
                <div
                  className={styles["modal-offers-tnc"]}
                  dangerouslySetInnerHTML={{
                    __html: offer.promotionDisplayText
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
