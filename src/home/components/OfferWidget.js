import React from "react";
import styles from "./OfferWidget.css";
import Carousel from "../../general/components/Carousel";
import PropTypes from "prop-types";
import Offer from "./Offer.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class OfferWidget extends React.Component {
  handleClick = webUrl => {
    const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  render() {
    let { feedComponentData, rest } = this.props;
    const data = feedComponentData.items ? feedComponentData.items : false;
    return (
      <div className={styles.holder}>
        {data &&
          data.map((datum, i) => {
            return (
              <div className={styles.element} style={{ width: `${33.33}%` }}>
                <Offer
                  onClick={this.handleClick}
                  key={i}
                  datum={datum}
                  {...rest}
                />
              </div>
            );
          })}

        {/*
        <Carousel
          elementWidthMobile={90}
          elementWidthDesktop={33.33}
          header={this.props.feedComponentData.title}
        >

        </Carousel> */}
      </div>
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
  textLine: PropTypes.string
};
