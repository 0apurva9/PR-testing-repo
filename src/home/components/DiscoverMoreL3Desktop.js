import React from "react";
import Carousel from "../../general/components/Carousel";
import DiscoverMoreComponentDesktop from "./DiscoverMoreComponentDesktop";
import styles from "./DiscoverMoreL3Desktop.css";
import CommonCenter from "../../general/components/CommonCenter.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
export default class DiscoverMoreL3Desktop extends React.Component {
  render() {
    const { feedComponentData, title } = this.props;
    if (
      !feedComponentData ||
      !feedComponentData.data ||
      !feedComponentData.data[0]
    ) {
      return null;
    }
    return (
      <DesktopOnly>
        <CommonCenter>
          <div className={styles.base}>
            <Carousel
              header={feedComponentData && feedComponentData.title}
              elementWidthDesktop={33.33}
            >
              {feedComponentData &&
                feedComponentData.data &&
                feedComponentData.data.map((datum, i) => {
                  return (
                    <DiscoverMoreComponentDesktop
                      imageURL={datum.L1_metadata && datum.L1_metadata.imageURL}
                      title={datum.L1}
                      webURL={datum.L1_metadata && datum.L1_metadata.webURL}
                      btnText={datum.btnText}
                      items={datum.L3_list}
                      history={this.props.history}
                      setClickedElementId={this.props.setClickedElementId}
                    />
                  );
                })}
            </Carousel>
          </div>
        </CommonCenter>
      </DesktopOnly>
    );
  }
}
DiscoverMoreL3Desktop.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      title: PropTypes.string,
      webURL: PropTypes.string,
      btnText: PropTypes.string,
      items: PropTypes.string
    })
  )
};
