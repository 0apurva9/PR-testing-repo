import React from "react";
import styles from "./TrustComponent.css";
import trustLogo from "../../general/components/img/tata-trust-icon.png";
import cliqAndPigLogo from "../../general/components/img/cli-q-piq-icon.png";
import brandLogo from "../../general/components/img/brands-icon.png";
import returnLogo from "../../general/components/img/return-icon.png";
import Icon from "../../xelpmoc-core/Icon";
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
