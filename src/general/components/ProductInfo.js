import React from "react";
import styles from "./ProductInfo.css";
import PropTypes from "prop-types";
import StarRating from "./StarRating.js";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
export default class ProductInfo extends React.Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.electronicView && (
                    <div className={styles.base}>
                        {this.props.bestDeliveryInfo && (
                            <div className={styles.bestDeliveryInfo}>
                                Get it by&nbsp;
                                <span className={styles.date}>{this.props.bestDeliveryInfo}</span>
                            </div>
                        )}
                        {this.props.offerText && <div className={styles.offerText}>{this.props.offerText}</div>}
                        {this.props.averageRating !== 0
                            ? this.props.averageRating &&
                              this.props.displayRatingReview && (
                                  <StarRating averageRating={this.props.averageRating} isPlp={this.props.isPlp}>
                                      {this.props.ratingCount && (
                                          <div className={styles.totalNoOfReviews}>{`(${this.props.ratingCount})`}</div>
                                      )}
                                  </StarRating>
                              )
                            : ""}
                        {this.props.maxExchangePrice &&
                            this.props.maxExchangePrice.formattedValueNoDecimal &&
                            this.props.maxExchangePrice.formattedValueNoDecimal !== "₹0" && (
                                <div className={styles.exchangeCashbackContainer}>
                                    <img
                                        src={exchangeIconLight}
                                        className={styles.exchangeIconLight}
                                        alt="exchange icon"
                                    />
                                    <div className={styles.exchangeCashback}>
                                        Upto {this.props.maxExchangePrice.formattedValueNoDecimal} Exchange Cashback
                                    </div>
                                </div>
                            )}
                    </div>
                )}
            </React.Fragment>
        );
    }
}
ProductInfo.propTypes = {
    bestDeliveryInfo: PropTypes.string,
    offerText: PropTypes.string,
    averageRating: PropTypes.number,
    ratingCount: PropTypes.string,
    isPlp: PropTypes.bool,
    electronicView: PropTypes.bool,
    maxExchangePrice: PropTypes.shape({
        currencyIso: PropTypes.string,
        currencySymbol: PropTypes.string,
        doubleValue: PropTypes.number,
        formattedValue: PropTypes.string,
        formattedValueNoDecimal: PropTypes.string,
    }),
    displayRatingReview: PropTypes.bool,
};
