import React from "react";
import BrandImage from "../../general/components/BrandImage";
import Carousel from "../../general/components/Carousel";
import styles from "./FollowingBrands.css";
import PropTypes from "prop-types";
import { PRODUCT_LISTINGS } from "../../lib/constants";
export default class FollowingBrands extends React.Component {
  newFollow = () => {
    if (this.props.onFollow) {
      this.props.onFollow();
    }
  };

  handleClick() {
    console.log("HANDLE CLICK");
    console.log(this.props.feedComponentData);
  }

  render() {
    const followWidgetData = this.props.feedComponentData;
    return (
      <div className={styles.base}>
        <Carousel
          header={this.props.feedComponentData.title}
          buttonText="See All"
          seeAll={() => this.handleClick()}
        >
          {followWidgetData.data &&
            followWidgetData.data.map((datum, i) => {
              return (
                <BrandImage
                  key={i}
                  image={datum.imageURL}
                  value={datum.type}
                  fit={datum.type}
                  onClick={() => this.handleClick()}
                />
              );
            })}
        </Carousel>
      </div>
    );
  }
}
BrandImage.propTypes = {
  image: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      value: PropTypes.string
    })
  )
};
BrandImage.defaultProps = {
  header: "Following Brands"
};
