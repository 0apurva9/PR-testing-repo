import React from "react";
import styles from "./FillupRating.css";
import PropTypes from "prop-types";
export default class FillupRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null
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
      if (this.state.rating >= i && this.state.rating !== null) {
        classStar = styles.ratingFillStar;
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
FillupRating.propTypes = {
  rating: PropTypes.number,
  onChange: PropTypes.func
};
