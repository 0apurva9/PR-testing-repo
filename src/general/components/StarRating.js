import React from "react";
import styles from "./StarRating.css";
import PropTypes from "prop-types";
import EmptyStar from "./img/empty-star.svg";

import GreenFilledStar from "./img/green-filled-star.svg";
import Green25FilledStar from "./img/green-25-filled.svg";
import Green50FilledStar from "./img/green-50-filled.svg";
import Green75FilledStar from "./img/green-75-filled.svg";

import FilledStar from "./img/star-fill.svg";
import Orange25FilledStar from "./img/orange-25-filled.svg";
import Orange50FilledStar from "./img/orange-50-filled.svg";
import Orange75FilledStar from "./img/orange-75-filled.svg";
import Icon from "../../xelpmoc-core/Icon";

import starFillWhite from "../../general/components/img/star-fill-white.svg";
const GREEN = "Green";
const ORANGE = "Orange";

export default class StarRating extends React.Component {
  getPartiallyFilledStar(value, color) {
    switch (value) {
      case 2:
      case 3:
        return color === GREEN ? Green25FilledStar : Orange25FilledStar;
      case 4:
      case 5:
      case 6:
        return color === GREEN ? Green50FilledStar : Orange50FilledStar;
      case 7:
      case 8:
        return color === GREEN ? Green75FilledStar : Orange75FilledStar;
      case 9:
        return color === GREEN ? GreenFilledStar : FilledStar;
    }
  }

  render() {
    const starSpans = [];
    let isStarPartiallyFilled = false;
    let ratingCnt = this.props.averageRating;
    const rating = Math.floor(ratingCnt);
    const decimalPoint = Math.floor((ratingCnt - rating) * 10);

    for (let i = 1; i <= 5; i++) {
      if (rating >= i && rating < 3 && rating !== null) {
        starSpans.push(
          <div key={i} className={styles.star}>
            <Icon image={FilledStar} size={this.props.size} />
          </div>
        );
      } else if (rating >= i && rating >= 3 && rating !== null) {
        starSpans.push(
          <div key={i} className={styles.star}>
            <Icon image={GreenFilledStar} size={this.props.size} />
          </div>
        );
      } else {
        let imgSrc = EmptyStar;
        if (
          ratingCnt !== undefined &&
          decimalPoint !== 0 &&
          decimalPoint !== 1 &&
          !isStarPartiallyFilled
        ) {
          if (rating >= 3) {
            imgSrc = this.getPartiallyFilledStar(decimalPoint, GREEN);
          } else {
            imgSrc = this.getPartiallyFilledStar(decimalPoint, ORANGE);
          }
          isStarPartiallyFilled = true;
        }
        starSpans.push(
          <div key={i} className={styles.star}>
            <Icon image={imgSrc} size={this.props.size} />
          </div>
        );
      }
    }
    return (
      <div className={styles.base}>
        {this.props.isPlp ? (
          <div
            className={
              this.props.isFromProductBundling
                ? ratingCnt > 2.5
                  ? styles.starRatingHighProductBundling
                  : styles.starRatingLowProductBundling
                : ratingCnt > 2.5
                ? styles.starRatingHigh
                : styles.starRatingLow
            }
          >
            {Math.round(ratingCnt * 10) / 10}
            <img
              src={starFillWhite}
              className={
                this.props.isFromProductBundling
                  ? styles.starFillWhiteProductBundling
                  : styles.starFillWhite
              }
              alt="star icon"
            />
          </div>
        ) : (
          <div className={styles.starHolder}>{starSpans}</div>
        )}
        {this.props.children && (
          <div
            className={
              this.props.isFromProductBundling
                ? styles.contentProductBundling
                : styles.content
            }
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
StarRating.propTypes = {
  averageRating: PropTypes.number,
  isPlp: PropTypes.bool,
  isFromProductBundling: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.node,
};
StarRating.defaultProps = {
  size: 15
};
