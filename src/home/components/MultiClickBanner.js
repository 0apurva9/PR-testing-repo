import React from "react";
import MultiClickProduct from "./MultiClickProduct";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
import styles from "./MultiClickBanner.css";
import { widgetsTracking } from "../../lib/adobeUtils.js";
import ImageFlexible from "../../general/components/ImageFlexible";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class MultiClickBanner extends React.Component {
  goToUrl(data) {
    widgetsTracking({
      widgetName: "MultiClick Banner",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      brandName: data.brandName
    });
    // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
    const isMatch = WEB_URL_REG_EX.test(data.url);

    if (data.url.includes("/que") || !isMatch) {
      window.open(data.url, "_blank");
      window.focus();
    } else {
      const urlSuffix = data.url.replace(TATA_CLIQ_ROOT, "$1");
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
          <div className={styles.imageHolder}>
            <ImageFlexible
              image={feedComponentData && feedComponentData.backgroundImage}
            />
            <div className={styles.content}>
              {feedComponentData &&
                feedComponentData.items &&
                feedComponentData.items.map((val, index) => {
                  return (
                    <div
                      className={styles.details}
                      style={{
                        top: `${val.YAxis}%`,
                        left: `${val.XAxis}%`
                      }}
                     key = {index}>
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
  ),
  postData: PropTypes.object,
  history: PropTypes.object,
  setClickedElementId: PropTypes.func,
  feedComponentData: PropTypes.object
};
