import React from "react";
import styles from "./SaveAndSecure.css";
import Icon from "../../xelpmoc-core/Icon";
import { FAQ_URL, CONTACT_URL } from "../../lib/constants";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_CART_FOOTER_LINK_CLICK
} from "../../lib/adobeUtils";
const sslLogo =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/cart_confidence_callout_4.png";

class SaveAndSecure extends React.Component {
  onClick = (url, linkName) => {
    setDataLayerForCartDirectCalls(
      ADOBE_DIRECT_CALL_FOR_CART_FOOTER_LINK_CLICK,
      "",
      linkName
    );
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.leftSection}>
          <div className={styles.AllLogoSectionWithSsl}>
            <div className={styles.logoSection}>
              <div className={styles.bankLogoHolder}>
                <div className={styles.bankLogo} />
              </div>
              <div className={styles.bankLogoHolder}>
                <div className={styles.cashLogo} />
              </div>
              <div className={styles.bankLogoHolderWithPadding}>
                <div className={styles.netBankingLogo} />
              </div>
            </div>
            <div className={styles.sslSection}>
              <div className={styles.sslLogo}>
                <Icon image={sslLogo} size={45} />
              </div>
              <div className={styles.sslTextWithInformation}>
                <div className={styles.sslTextHolder}>
                  <span className={styles.sslText}>SSL</span>
                  <span> SECURED PAYMENT</span>
                </div>
                <div className={styles.informationHolder}>
                  Your information is protected by 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          Need Help ?
          <span
            className={styles.contact}
            onClick={() => this.onClick(CONTACT_URL, "Contact Us")}
          >
            Contact Us
          </span>
          |
          <span
            className={styles.faq}
            onClick={() => this.onClick(FAQ_URL, "FAQ")}
          >
            FAQ
          </span>
        </div>
      </div>
    );
  }
}

export default SaveAndSecure;
