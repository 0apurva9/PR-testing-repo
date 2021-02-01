import React from "react";
import cloneDeep from "lodash.clonedeep";
import CircleProductImage from "../../general/components/CircleProductImage";
import CommonCenter from "../../general/components/CommonCenter";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
import styles from "./DiscoverMoreL1ForDesktop.css";
export default class DiscoverMoreL1ForDesktopMsd extends React.Component {
  onClick = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  render() {
    const { feedComponentData } = cloneDeep(this.props);
    return (
      this.props.homeMsdData &&
      this.props.homeMsdData[0] && (
        <CommonCenter>
          <div className={styles.base}>
            <div className={styles.header}>
              <div className={styles.headingText}>
                {feedComponentData.title}
              </div>
            </div>
            <div className={styles.sliderHolder}>
              <div className={styles.slider}>
                {this.props.homeMsdData[0].splice(0, 3).map((val, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        className={styles.element}
                        style={{
                          width: "33.33%"
                        }}
                      >
                        <div className={styles.circleBrandesHolder}>
                          <CircleProductImage
                            label={val.title}
                            image={val.imageURL}
                            key={i}
                            value={val.webURL}
                            onClick={() => this.onClick(val.webURL)}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className={styles.descriptionHolder}>
                <div className={styles.heading}>Other top categories</div>
                <div className={styles.listHolder}>
                  {this.props.homeMsdData[0].map((val, i) => {
                    return (
                      <div
                        key={i}
                        className={styles.listLink}
                        onClick={() => this.onClick(val.webURL)}
                      >
                        {val.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CommonCenter>
      )
    );
  }
}
DiscoverMoreL1ForDesktopMsd.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      brands: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          webURL: PropTypes.string
        })
      )
    })
  ),
  setClickedElementId: PropTypes.func,
  history: PropTypes.object,
  homeMsdData: PropTypes.array
};
