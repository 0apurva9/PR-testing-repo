import React from "react";
import styles from "./Offer.css";
import MediaQuery from "react-responsive";
import Button from "../../general/components/Button";
import Image from "../../xelpmoc-core/Image";

export default class OfferCard extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.datum.click_tracking_url);
    }
  };

  handleClickOnLink = event => {
    event.preventDefault();
  };

  render() {
    const { datum, key } = this.props;
    return (
      <a
        href={this.props.datum.click_tracking_url}
        target="_blank"
        rel="noreferrer"
        onClick={event => this.handleClickOnLink(event)}
      >
        <div className={styles.base} key={key} onClick={this.handleClick}>
          <div className={styles.imageHolder}>
            <Image image={datum.elements.image} key={key} />
          </div>
          <MediaQuery query="(max-device-width: 1024px)">
            {datum.elements.discountText &&
              datum.elements.discountText !== " " && (
                <div className={styles.ovalImage}>
                  <div className={styles.text} key={key}>
                    {datum.elements.discountText}
                  </div>
                </div>
              )}
          </MediaQuery>
          <div className={styles.textLine}>
            <MediaQuery query="(min-device-width: 1025px)">
              {datum.elements.discountText &&
                datum.elements.discountText !== " " && (
                  <div className={styles.ovalImage}>
                    <div className={styles.text} key={key}>
                      {datum.elements.discountText}
                    </div>
                  </div>
                )}
            </MediaQuery>
            <div className={styles.description}>{datum.elements.heading}</div>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.buttonHolder}>
                <Button
                  type="hollow"
                  color="#fff"
                  label={datum.elements.btnText}
                  width={130}
                />
              </div>
            </MediaQuery>
          </div>
        </div>
      </a>
    );
  }
}
