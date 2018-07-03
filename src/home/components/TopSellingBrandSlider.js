import React from "react";
import styles from "./TopSellingBrandSlider.css";
import PropTypes from "prop-types";
import Carousel from "../../general/components/Carousel";
import TopSellingBrandComponent from "../../general/components/TopSellingBrandComponent";
export default class TopSellingBrandSlider extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <Carousel header={this.props.title} elementWidthDesktop={25}>
          {this.props.data &&
            this.props.data.map((datum, i) => {
              return (
                <TopSellingBrandComponent
                  imageURL={datum.imageURL}
                  webURL={datum.webURL}
                  logoImageURL={datum.logoImageURL}
                  history={this.props.history}
                />
              );
            })}
        </Carousel>
      </div>
    );
  }
}
TopSellingBrandSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      logoImageURL: PropTypes.string,
      webURL: PropTypes.string
    })
  )
};
