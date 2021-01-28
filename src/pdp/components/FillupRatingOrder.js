import React from "react";
import styles from "./FillupRatingOrder.css";
import PropTypes from "prop-types";
export default class FillupRatingOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    };
  }

  rate(rating) {
    this.setState(
      {
        rating
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.rating);
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetRating === true) {
      this.setState({ rating: null });
    }
  }

  render() {
    const starSpans = [];
    for (let i = 1; i <= 5; i++) {
      let classStar = styles.ratingStar;
      if (
        this.state.rating >= i &&
        this.state.rating < 3 &&
        this.state.rating !== null
      ) {
        classStar = styles.ratingFillStar;
      }
      if (
        this.state.rating >= i &&
        this.state.rating >= 3 &&
        this.state.rating !== null
      ) {
        classStar = styles.ratingFillGreenStar;
      }
      starSpans.push(
        <div className={styles.ratingHolder} key={i}>
          <div className={styles.startHolder}>
            <div className={classStar} onClick={() => this.rate(i)} />
          </div>
        </div>
      );
    }
    return <div className={styles.base}>{starSpans}</div>;
  }
}
FillupRatingOrder.propTypes = {
  rating: PropTypes.number,
  onChange: PropTypes.func,
  resetRating: PropTypes.bool
};
