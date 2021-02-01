import React from "react";
import styles from "./Offer.css";
import MediaQuery from "react-responsive";
import Button from "../../general/components/Button";
import Image from "../../xelpmoc-core/Image";

export default class Offer extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.datum.webURL);
    }
  };

  handleClickOnLink = event => {
    event.preventDefault();
  };

  render() {
    const { datum, key } = this.props;
    return (
      <a
        href={this.props.datum.webURL}
        target="_blank"
        rel="noreferrer"
        onClick={event => this.handleClickOnLink(event)}
      >
        <div className={styles.base} key={key} onClick={this.handleClick}>
          <div className={styles.imageHolder}>
            <Image image={datum.imageURL} key={key} />
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
