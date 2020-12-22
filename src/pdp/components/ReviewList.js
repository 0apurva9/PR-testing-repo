import React from "react";
import styles from "./ReviewList.css";
import ReviewPage from "./ReviewPage";
import PropTypes from "prop-types";

export default class ReviewList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.base}>
          {this.props &&
            this.props.limit &&
            this.props.reviewList &&
            this.props.reviewList
              .filter((data, i) => {
                return i < 5;
              })
              .map((data, i) => {
                if (!data) return null;
                let userName = data.userName;
                let alias = data.alias;
                let name =
                  data &&
                  data.principal &&
                  data.principal.name &&
                  data.principal.name.trim();
                return (
                  <ReviewPage
                    fromBeautyPdp={this.props.fromBeautyPdp}
                    rating={data && data.rating}
                    heading={data && data.headline}
                    text={data && data.comment}
                    date={data && data.date}
                    isBuyer={data && data.isBuyer}
                    reviewAge={data && data.reviewAge}
                    name={userName ? userName : alias}
                    key={i}
                  />
                );
              })}
          {this.props &&
            !this.props.limit &&
            this.props.currentreviewList &&
            this.props.currentreviewList.map((data, i) => {
              if (!data) return null;
              let userName = data.userName;
              let alias = data.alias;
              /*  let name =
                data &&
                data.principal &&
                data.principal.name &&
                data.principal.name.trim(); */
              return (
                <ReviewPage
                  fromBeautyPdp={this.props.fromBeautyPdp}
                  rating={data && data.rating}
                  heading={data && data.headline}
                  text={data && data.comment}
                  date={data && data.date}
                  isBuyer={data && data.isBuyer}
                  reviewAge={data && data.reviewAge}
                  name={userName ? userName : alias}
                  key={i}
                />
              );
            })}
        </div>
      </React.Fragment>
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
