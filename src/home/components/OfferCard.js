import React from "react";
import styles from "./Offer.css";
import MediaQuery from "react-responsive";
import Button from "../../general/components/Button";
import Image from "../../xelpmoc-core/Image";

export default class OfferCard extends React.Component {
  handleClick = e => {
    if (this.props.onClick) {
      this.props.onClick(this.props.datum.destination_url);
    }
  };
  handleClickOnLink = event => {
    event.preventDefault();
  };
  render() {
    const { datum, key } = this.props;
    return (
      <a
        href={this.props.datum.destination_url}
        target="_blank"
        onClick={event => this.handleClickOnLink(event)}
      >
        <div className={styles.base} key={key} onClick={this.handleClick}>
          <div className={styles.imageHolder}>
            <Image image={datum.image} key={key} />
          </div>
          <MediaQuery query="(max-device-width: 1024px)">
            {datum.discountText &&
              datum.discountText !== " " && (
                <div className={styles.ovalImage}>
                  <div className={styles.text} key={key}>
                    {datum.discountText}
                  </div>
                </div>
              )}
          </MediaQuery>
          <div className={styles.textLine}>
            <MediaQuery query="(min-device-width: 1025px)">
              {datum.discountText &&
                datum.discountText !== " " && (
                  <div className={styles.ovalImage}>
                    <div className={styles.text} key={key}>
                      {datum.discountText}
                    </div>
                  </div>
                )}
            </MediaQuery>
            <div className={styles.description}>{datum.title}</div>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.buttonHolder}>
                <Button
                  type="hollow"
                  color="#fff"
                  label={datum.btnText}
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
