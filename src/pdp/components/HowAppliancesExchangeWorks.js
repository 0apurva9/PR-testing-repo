import React from "react";
import styles from "./ExchangeModal.css";
import closeIcon from "../../general/components/img/closeIcon.svg";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";
import PropTypes from "prop-types";

export default class HowAppliancesExchangeWorks extends React.Component {
  hideHowAppliancesExchangeWorks() {
    this.props.hideHowAppliancesExchangeWorks();
  }

  closeAppliancesExchangeModal() {
    this.props.closeAppliancesExchangeModal();
  }

  render() {
    return (
      <div className={styles.appliancesExchangeBase}>
        {!this.props.showBackButton && (
          <img
            src={closeIcon}
            alt="closeIcon"
            className={styles.closeIcon}
            onClick={() => this.closeAppliancesExchangeModal()}
          />
        )}
        <div className={styles.topContainer}>
          <div className={styles.howExchangeWorksHeading}>
            How exchange works?
            {this.props.showBackButton && (
              <div
                className={styles.modalForwardArrowContainer}
                onClick={() => this.hideHowAppliancesExchangeWorks()}
              >
                Back <div className={styles.modalForwardArrow} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <img src={hew1} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              Exchange of your old device will be processed separately post
              delivery of your new product.
            </div>
          </div>
          <img src={hew2} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              Our CS agent will get in touch with you for confirming the
              acceptance of exchange order post you place an order for new
              product.
            </div>
          </div>
          <img src={hew3} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              For tracking the exchange process please connect with our CS team
              link.
            </div>
          </div>
          <img src={hew4} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              Cashback will be processed in your bank account, details of the
              same will be provided by our CS team.
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              Exchange request is serviceable only on selected pin codes of
              Delhi and Mumbai region.
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentDescriptionHEW}>
              If your pin code does not belong to the above list, Exchange
              request will not be processed.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HowAppliancesExchangeWorks.propTypes = {
  hideHowAppliancesExchangeWorks: PropTypes.func,
  closeAppliancesExchangeModal: PropTypes.func,
  showBackButton: PropTypes.bool
};
