import React from "react";
import styles from "./OfferWidget.css";
import Carousel from "../../general/components/Carousel";
import CommonCenter from "../../general/components/CommonCenter";
import PropTypes from "prop-types";
import Offer from "./Offer.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { WEB_URL_REG_EX } from "../../lib/constants";

export default class OfferWidget extends React.Component {
  handleClick = webUrl => {
    if (webUrl) {
      // Check if URL starts https://www.tatacliq.com or https://tatacliq.com
      const isMatch = WEB_URL_REG_EX.test(webUrl);
      const urlPath = new URL(webUrl).pathname;

      if (urlPath.indexOf("/que") > -1 || !isMatch) {
        window.open(webUrl, "_blank");
        window.focus();
      } else {
        const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1").trim();
        this.props.history.push(urlSuffix);
      }
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  render() {
    let { feedComponentData, rest } = this.props;
    const data = feedComponentData.items ? feedComponentData.items : false;
    return (
      <CommonCenter>
        <div
          className={
            this.props.positionInFeed === 1
              ? styles.firstItemHolder
              : styles.holder
          }
        >
          <Carousel
            elementWidthMobile={90}
            elementWidthDesktop={33.33}
            header={this.props.feedComponentData.title}
          >
            {data &&
              data.map((datum, i) => {
                return (
                  <Offer
                    onClick={this.handleClick}
                    key={i}
                    datum={datum}
                    {...rest}
                  />
                );
              })}
          </Carousel>
        </div>
      </CommonCenter>
    );
  }
}
OfferWidget.propTypes = {
  feedComponentData: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        imageURL: PropTypes.string,
        title: PropTypes.string,
        discountText: PropTypes.string,
        btnText: PropTypes.string
      })
    )
  }),
  onClick: PropTypes.func,
  textLine: PropTypes.string,
  history: PropTypes.object,
  setClickedElementId: PropTypes.func,
  rest: PropTypes.object,
  positionInFeed: PropTypes.number
};
