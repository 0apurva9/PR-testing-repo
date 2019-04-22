import React from "react";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import styles from "./OfferCard.css";
import PropTypes from "prop-types";
import {
  setDataLayerForPdpDirectCalls,
  ADOBE_DIRECT_CALL_FOR_PDP_OFFER
} from "../../lib/adobeUtils.js";
export default class OfferCard extends React.Component {
  handleClick(val) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleShowDetails = () => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_PDP_OFFER);
    if (this.props.showDetails) {
      this.props.showDetails({
        potentialPromotions: this.props.potentialPromotions,
        secondaryPromotions: this.props.secondaryPromotions
      });
    }
  };
  render() {
    let getId =
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
    messageId: PropTypes.string,
    messageDetails: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string
  }),
  showDetails: PropTypes.func,
  theme: PropTypes.number
};
