import React from "react";
import Carousel from "../../general/components/Carousel";
import styles from "./DiscoverMoreL1ForDesktop.css";
import CircleProductImage from "../../general/components/CircleProductImage";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import Button from "../../general/components/Button.js";
import PropTypes from "prop-types";
export default class DiscoverMoreL1ForDesktop extends React.Component {
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
    const { feedComponentData } = this.props;
    return (
      <div className={styles.base}>
        <Carousel
          header={feedComponentData && feedComponentData.title}
          elementWidthDesktop={100}
        >
          {feedComponentData &&
            feedComponentData.items &&
            feedComponentData.items.map(feedData => {
              return (
                <div className={styles.sliderHolder}>
                  <div className={styles.slider}>
                    {feedData &&
                      feedData.data &&
                      feedData.data.map((val, i) => {
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
                    <div className={styles.heading}>{feedData.title}</div>
                    {feedData &&
                      feedData.subData && (
                        <div className={styles.listHolder}>
                          {feedData.subData.map((val, i) => {
                            return (
                              <div
                                className={styles.listLink}
                                onClick={() => this.onClick(val.webURL)}
                              >
                                {val.title}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    {feedData.btnText &&
                      feedData.webURL && (
                        <div className={styles.buttonHolder}>
                          <div className={styles.button}>
                            <Button
                              type="hollow"
                              color="#000"
                              label={feedData.btnText}
                              width={130}
                              onClick={() => this.onClick(feedData.webURL)}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div>
    );
  }
}
DiscoverMoreL1ForDesktop.propTypes = {
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
  )
};
