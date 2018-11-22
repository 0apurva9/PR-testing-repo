import React from "react";
import styles from "./ReviewList.css";
import ReviewPage from "./ReviewPage";
import PropTypes from "prop-types";

export default class ReviewList extends React.Component {
  render() {
    let reviewList = this.props.reviewList;
    console.log(reviewList);
    console.log(this.props.limit);

    if (true) {
      reviewList.slice(0, 4);
    }
    return (
      <div className={styles.base}>
        {reviewList &&
          reviewList.map((data, i) => {
            if (!data) return null;
            let userName = data.userName;
            let name =
              data &&
              data.principal &&
              data.principal.name &&
              data.principal.name.trim();
            return (
              <ReviewPage
                rating={data && data.rating}
                heading={data && data.headline}
                text={data && data.comment}
                date={data && data.date}
                isBuyer={data && data.isBuyer}
                reviewAge={data && data.reviewAge}
                name={name ? name : userName}
              />
            );
          })}
      </div>
    );
  }
}

ReviewList.propTypes = {
  reviewList: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.String,
      heading: PropTypes.string,
      text: PropTypes.string,
      label: PropTypes.String
    })
  )
};
