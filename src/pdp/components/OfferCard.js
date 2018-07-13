import React from "react";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import styles from "./OfferCard.css";
import PropTypes from "prop-types";

export default class OfferCard extends React.Component {
  handleClick(val) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleShowDetails = () => {
    if (this.props.showDetails) {
      this.props.showDetails({
        potentialPromotions: this.props.potentialPromotions,
        secondaryPromotions: this.props.secondaryPromotions
      });
    }
  };
  render() {
    if (this.props.potentialPromotions || this.props.secondaryPromotions) {
      return (
        <div
          className={
            this.props.theme === 2 ? styles.themeElectronics : styles.base
          }
          onClick={this.handleShowDetails}
        >
          <MobileOnly>
            <div className={styles.offerText}>Offer(s)</div>
          </MobileOnly>
          {this.props.potentialPromotions && (
            <div
              className={styles.headingText}
              dangerouslySetInnerHTML={{
                __html: this.props.potentialPromotions.title
              }}
              onClick={this.handleShowDetails}
            />
          )}
          {this.props.secondaryPromotions && (
            <div
              className={styles.headingText}
              dangerouslySetInnerHTML={{
                __html: this.props.secondaryPromotions.messageID
              }}
              onClick={this.handleShowDetails}
            />
          )}
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
