import React from "react";
import styles from "./StarRating.css";
import PropTypes from "prop-types";
import GreenFilledStar from "../../general/components/img/green-filled-star.svg";
import FilledStar from "../../general/components/img/star-fill.svg";
import EmptyStar from "../../general/components/img/empty-star.svg";
import Icon from "../../xelpmoc-core/Icon";
export default class StarRating extends React.Component {
  render() {
    const starSpans = [];
    const rating = this.props.averageRating;
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
        starSpans.push(
          <div key={i} className={styles.star}>
            <Icon image={EmptyStar} size={this.props.size} />
          </div>
        );
      }
    }
    return (
      <div className={styles.base}>
        <div className={styles.starHolder}>{starSpans}</div>
        {this.props.children && (
          <div className={styles.content}>{this.props.children}</div>
        )}
      </div>
    );
  }
}
StarRating.propTypes = {
  averageRating: PropTypes.number
};
StarRating.defaultProps = {
  size: 15
};
