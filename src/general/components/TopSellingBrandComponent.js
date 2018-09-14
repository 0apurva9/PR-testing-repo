import React from "react";
import styles from "./TopSellingBrandComponent.css";
import PropTypes from "prop-types";
import Logo from "./Logo";
import Image from "../../xelpmoc-core/Image";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class TopSellingBrandComponent extends React.Component {
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
    return (
      <div
        className={styles.base}
        onClick={() => this.onClick(this.props.webURL)}
      >
        <div className={styles.imageHolder}>
          <Image image={this.props.imageURL} />
        </div>
        <div className={styles.logoHolder}>
          <div className={styles.logo}>
            <MobileOnly>
              <Logo image={this.props.logoImageURL} />
            </MobileOnly>
            <DesktopOnly>
              <Logo image={this.props.logoImageURL} height="50%" />
            </DesktopOnly>
          </div>
        </div>
      </div>
    );
  }
}
TopSellingBrandComponent.propTypes = {
  imageURL: PropTypes.string,
  logoImageURL: PropTypes.string,
  webURL: PropTypes.string
};
