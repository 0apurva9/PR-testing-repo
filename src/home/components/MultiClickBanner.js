import React from "react";
import MultiClickProduct from "./MultiClickProduct";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
import styles from "./MultiClickBanner.css";

export default class MultiClickBanner extends React.Component {
  goToUrl(url) {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    if (url.includes("/que")) {
      window.open(urlSuffix, "_blank");
      window.focus();
    }
    if (url.includes("/luxury.tatacliq.com")) {
      window.open(url, "_blank");
      window.focus();
    } else {
      this.props.history.push(urlSuffix);
      if (this.props.setClickedElementId) {
        this.props.setClickedElementId();
      }
    }
  }
  render() {
    const { feedComponentData } = this.props;
    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
        style={{
          backgroundColor:
            feedComponentData && feedComponentData.backgroundColor
              ? feedComponentData.backgroundColor
              : "",
          backgroundImage:
            feedComponentData && feedComponentData.backgroundImage
              ? `url(${feedComponentData.backgroundImage})`
              : ""
        }}
      >
        <div className={styles.imageHolder}>
          <div className={styles.content}>
            {feedComponentData &&
              feedComponentData.items &&
              feedComponentData.items.map(val => {
                return (
                  <div
                    className={styles.section}
                    style={{
                      backgroundColor: val.backgroundColor,
                      backgroundImage: `url(${val.backgroundImage})`
                    }}
                  >
                    <div
                      className={styles.details}
                      style={{
                        top: `${val.yAxis}%`,
                        left: `${val.xAxis}%`
                      }}
                    >
                      <MultiClickProduct
                        brandName={val.brandName}
                        description={val.description}
                        price={val.price}
                        onClick={() => this.goToUrl(val.url)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
MultiClickBanner.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  positionInFeed: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundImage: PropTypes.string,
      backgroundColor: PropTypes.string,
      yAxis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      xAxis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      brandName: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.string
    })
  )
};
