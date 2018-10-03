import React from "react";
import styles from "./AllQuickLinks.css";
import QuickLinks from "./QuickLinks";
import Carousel from "../../general/components/Carousel";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class AllQuickLinks extends React.Component {
  onClick = webUrl => {
    if (webUrl) {
      const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={styles.base}>
          <div className={styles.carouselHolder}>
            <Carousel elementWidthMobile={28} padding="0px 5px">
              {this.props &&
                this.props.feedComponentData &&
                this.props.feedComponentData.items &&
                this.props.feedComponentData.items.map((val, i) => {
                  return (
                    <QuickLinks
                      key={i}
                      imageURL={val.imageURL}
                      onClick={data => this.onClick(val.webURL)}
                    />
                  );
                })}
            </Carousel>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
