import React from "react";
import MultiClickProduct from "./MultiClickProduct";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
import styles from "./MultiClickBanner.css";
import { widgetsTracking } from "../../lib/adobeUtils.js";
export default class MultiClickBanner extends React.Component {
  goToUrl(data) {
    widgetsTracking({
      widgetName: "MultiClick Banner",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      brandName: data.brandName
    });
    const urlSuffix = data.url.replace(TATA_CLIQ_ROOT, "$1");
    if (data.url.includes("/que")) {
      window.open(urlSuffix, "_blank");
      window.focus();
    }
    if (data.url.includes("/luxury.tatacliq.com")) {
      window.open(data.url, "_blank");
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
      <React.Fragment>
        <div className={styles.headerHolder}>
          <div className={styles.header}>{feedComponentData.title}</div>
        </div>
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
          style={{
            backgroundColor:
              feedComponentData && feedComponentData.backgroundColor
                ? feedComponentData.backgroundColor
                : ""
          }}
        >
          <div
            className={styles.imageHolder}
            style={{
              backgroundImage:
                feedComponentData && feedComponentData.backgroundImage
                  ? `url(${feedComponentData.backgroundImage})`
                  : ""
            }}
          >
            <div className={styles.content}>
              {feedComponentData &&
                feedComponentData.items &&
                feedComponentData.items.map(val => {
                  return (
                    <div
                      className={styles.details}
                      style={{
                        top: `${val.YAxis}%`,
                        left: `${val.XAxis}%`
                      }}
                    >
                      <MultiClickProduct
                        brandName={val.brandName}
                        description={val.description}
                        price={val.price}
                        onClick={() =>
                          this.goToUrl({
                            url: val.url,
                            brandName: val.brandName
                          })
                        }
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </React.Fragment>
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
