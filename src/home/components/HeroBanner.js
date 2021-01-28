import React from "react";
import BannerImage from "../../general/components/BannerImage";
import Banner from "../../general/components/Banner";
import PropTypes from "prop-types";
import HomeSkeleton from "../../general/components/HomeSkeleton.js";
import styles from "./HeroBanner.css";
export default class HeroBanner extends React.Component {
  renderBanner = () => {
    const { feedComponentData, ...rest } = this.props;
    if (!this.props.loading) {
      if (feedComponentData.items && feedComponentData.items.length > 1) {
        return (
          <Banner {...feedComponentData}>
            {feedComponentData.items &&
              feedComponentData.items.map &&
              feedComponentData.items.map((datum, i) => {
                return (
                  <BannerImage
                    logo={datum.brandLogo}
                    title={datum.title}
                    ratio={feedComponentData.dimension}
                    subTitle={datum.subTitle}
                    buttonLabel={datum.buttonLabel}
                    image={datum.imageURL}
                    key={i}
                    url={datum.webURL}
                    {...rest}
                  />
                );
              })}
          </Banner>
        );
      } else {
        return (
          <div className={styles.monoBanner}>
            {feedComponentData.items &&
              feedComponentData.items.map &&
              feedComponentData.items.map((datum, i) => {
                return (
                  <BannerImage
                    logo={datum.brandLogo}
                    title={datum.title}
                    image={datum.imageURL}
                    subTitle={datum.subTitle}
                    ratio={feedComponentData.dimension}
                    key={i}
                    url={datum.webURL}
                    {...rest}
                  />
                );
              })}
          </div>
        );
      }
    } else {
      return <HomeSkeleton />;
    }
  };

  render() {
    return (
      <div
        className={
          this.props.positionInFeed === 0
            ? styles.base
            : styles.marginTopWithBase
        }
      >
        {this.renderBanner()}
      </div>
    );
  }
}
HeroBanner.propTypes = {
  loading: PropTypes.bool,
  positionInFeed: PropTypes.number,
  feedComponentData: PropTypes.shape({
    items: PropTypes.array,
    dimension: PropTypes.string,
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          brandLogo: PropTypes.string,
          title: PropTypes.string,
          imageURL: PropTypes.string
        })
      )
    })
  })
};
