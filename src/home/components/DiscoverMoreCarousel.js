import React from "react";
import Carousel from "../../general/components/Carousel";
import CircleProductImage from "../../general/components/CircleProductImage";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { withRouter } from "react-router";
import CommonCenter from "../../general/components/CommonCenter";
import styles from "./DiscoverMoreCarousel.css";
import { widgetsTracking } from "../../lib/adobeUtils";

class DiscoverMoreCarousel extends React.Component {
  handleClick = (webUrl, categoryName, i) => {
    widgetsTracking({
      widgetName:
        this.props.feedComponentData && this.props.feedComponentData.title,
      sourceOfWidget:
        this.props.feedComponentData &&
        this.props.feedComponentData.postParams &&
        this.props.feedComponentData.postParams.widgetPlatform,
      categoryName,
      type: "Category",
      PositionOfProduct: i,
      widgetId: 110
    });
    const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  render() {
    const discoverMoreCarouselData = this.props.feedComponentData;
    return (
      <CommonCenter>
        <div className={styles.base}>
          <Carousel header={discoverMoreCarouselData.title}>
            {discoverMoreCarouselData.data &&
              discoverMoreCarouselData.data.map &&
              discoverMoreCarouselData.data.map((datum, i) => {
                return (
                  <CircleProductImage
                    image={datum.imageURL}
                    label={datum.title}
                    key={i}
                    value={datum.webURL}
                    onClick={(webUrl, categoryName) =>
                      this.handleClick(webUrl, categoryName, i)
                    }
                  />
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
    );
  }
}

export default withRouter(DiscoverMoreCarousel);
DiscoverMoreCarousel.propTypes = {
  header: PropTypes.string,
  discoverMoreCarouselData: PropTypes.object,
  feedComponentData: PropTypes.object,
  history: PropTypes.object,
  setClickedElementId: PropTypes.func
};
DiscoverMoreCarousel.defaultProps = {
  header: "Discover more from Tata Cliq"
};
