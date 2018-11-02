import React from "react";
import styles from "./ReviewList.css";
import ReviewPage from "./ReviewPage";
import PropTypes from "prop-types";
function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function protect_email(user_email) {
  var avg, splitted, part1, part2;
  splitted = user_email.split("@");
  part1 = splitted[0];
  avg = part1.length / 2;
  part1 = part1.substring(0, part1.length - avg);
  part2 = splitted[1];
  return part1 + "***@" + part2;
}
export default class ReviewList extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props &&
          this.props.reviewList &&
          this.props.reviewList.map((data, i) => {
            if (!data) return null;
            let userName = data.userName;
            let name =
              data &&
              data.principal &&
              data.principal.name &&
              data.principal.name.trim();
            if (validateEmail(userName)) {
              userName = protect_email(userName);
            }
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
