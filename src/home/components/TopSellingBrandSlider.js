import React from "react";
import styles from "./TopSellingBrandSlider.css";
import PropTypes from "prop-types";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import TopSellingBrandComponent from "../../general/components/TopSellingBrandComponent";
export default class TopSellingBrandSlider extends React.Component {
  render() {
    let { feedComponentData } = this.props;
    return (
      <CommonCenter>
        <div className={styles.base}>
          <Carousel header={feedComponentData.title} elementWidthDesktop={25}>
            {feedComponentData.items &&
              feedComponentData.items.map((datum, i) => {
                return (
                  <TopSellingBrandComponent
                    imageURL={datum.imageURL}
                    webURL={datum.webURL}
                    logoImageURL={datum.logoImageURL}
                    history={this.props.history}
                    setClickedElementId={this.props.setClickedElementId}
                  />
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
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
