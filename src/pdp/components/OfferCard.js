import React from "react";
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
        potentialPromotions: { ...this.props.potentialPromotions },
        secondaryPromotions: { ...this.props.secondaryPromotions }
      });
    }
  };
  render() {
    if (this.props.potentialPromotions || this.props.secondaryPromotions) {
      return (
        <div className={styles.base} onClick={this.handleShowDetails}>
          {this.props.potentialPromotions && (
            <div className={styles.headingText}>
              {this.props.potentialPromotions.title}
            </div>
          )}
          {this.props.secondaryPromotions && (
            <div className={styles.headingText}>
              {this.props.secondaryPromotions.messageID}
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}
