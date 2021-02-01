import React from "react";
import styles from "./BannerLink.css";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
export default class BannerLink extends React.Component {
  showSeeAll() {
    if (this.props.showSeeAll) {
      this.props.showSeeAll();
    }
  }

  linkDetails = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.bannerImageHolder}>
          <div
            className={styles.imageHolder}
            style={{
              backgroundImage: `url(${this.props.image})`,
              backgroundSize: " 80%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
            onClick={() => this.showSeeAll()}
          />
        </div>
        <div className={styles.linkDetailsHolder}>
          <div className={styles.linkHeader}>
            <h3>{this.props.linkHeader}</h3>
          </div>
          <div className={styles.linkDetails}>
            {this.props.subItems &&
              this.props.subItems.map((val, i) => {
                return (
                  <div
                    className={styles.link}
                    key={i}
                    onClick={() => this.linkDetails(val.webURL)}
                  >
                    <h3> {val.title}</h3>
                  </div>
                );
              })}
          </div>
          <div className={styles.allListButtonHolder}>
            <UnderLinedButton
              label="See all"
              color="#212121"
              fontFamily="light"
              onClick={() => this.showSeeAll()}
            />
          </div>
        </div>
      </div>
    );
  }
}
BannerLink.propTypes = {
  image: PropTypes.string,
  linkHeader: PropTypes.string,
  showSeeAll: PropTypes.func,
  redirectToLink: PropTypes.func,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      webURL: PropTypes.string
    })
  ),
  history: PropTypes.object,
  setClickedElementId: PropTypes.func
};
