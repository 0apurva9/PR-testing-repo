import React from "react";
import styles from "./TrustComponent.css";
import Icon from "../../xelpmoc-core/Icon";
const trustLogo =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/tata_trust_1.png";
const cliqAndPigLogo =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/cliq_and_piq_icon.png";
const brandLogo =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/brands_icon.png";
const returnLogo =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/return_icon.png";

class TrustComponent extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.iconWithCenter}>
          <div className={styles.iconWithText}>
            <div className={styles.logo}>
              <Icon image={trustLogo} size={35} />
            </div>
            <div className={styles.text}>Tata Trust</div>
          </div>
          <div className={styles.iconWithText}>
            <div className={styles.logo}>
              <Icon image={cliqAndPigLogo} size={35} />
            </div>
            <div className={styles.text}>Cliq and piq</div>
          </div>
          <div className={styles.iconWithText}>
            <div className={styles.logo}>
              <Icon image={brandLogo} size={25} />
            </div>
            <div className={styles.text}>Authentic Brands</div>
          </div>
          <div className={styles.iconWithText}>
            <div className={styles.logo}>
              <Icon image={returnLogo} size={25} />
            </div>
            <div className={styles.text}>Easy Returns</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrustComponent;
