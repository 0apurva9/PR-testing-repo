import React from "react";
import styles from "./TrustComponent.css";
import Icon from "../../xelpmoc-core/Icon";
const trustLogo =
  "https://res.cloudinary.com/sid1512/image/upload/v1536237751/footer/Tata_Trust_1.png";
const cliqAndPigLogo =
  "https://res.cloudinary.com/sid1512/image/upload/v1536237750/footer/CliQ_PIQ_Icon.png";
const brandLogo =
  "https://res.cloudinary.com/sid1512/image/upload/v1536237750/footer/Brands_Icon.png";
const returnLogo =
  "https://res.cloudinary.com/sid1512/image/upload/v1536237751/footer/Return_icon.png";

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
