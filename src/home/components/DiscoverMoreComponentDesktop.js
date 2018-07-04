import React from "react";
import CircleProductDescriptionDesktop from "./CircleProductDescriptionDesktop";
import styles from "./DiscoverMoreComponentDesktop.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class DiscoverMoreComponentDesktop extends React.Component {
  goToLink = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };
  showSeeAll = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <CircleProductDescriptionDesktop
            onRedirect={() => this.showSeeAll(this.props.webURL)}
            image={this.props.imageURL}
          />
        </div>
        <div className={styles.descriptionHolder}>
          <div className={styles.heading}>{this.props.title}</div>
          {this.props.items && (
            <div className={styles.listHolder}>
              {this.props.items &&
                this.props.items.map((val, i) => {
                  return (
                    <div
                      className={styles.listLink}
                      onClick={() => this.goToLink(val.webURL)}
                    >
                      {val.title}
                    </div>
                  );
                })}
            </div>
          )}
          {this.props.btnText && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <UnderLinedButton
                  label={this.props.btnText}
                  color="#212121"
                  onClick={() => this.showSeeAll(this.props.webURL)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
DiscoverMoreComponentDesktop.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      webURL: PropTypes.string
    })
  )
};
