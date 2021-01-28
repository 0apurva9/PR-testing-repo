import React from "react";
import styles from "./HelpDetails.css";
import faqIcon from "./img/faqred.svg";
import trackOrderIcon from "./img/tored.svg";
import returnIcon from "./img/returnred.svg";
import customerCareIcon from "./img/callred.svg";
import aboutUsIcon from "./img/aboutusred.svg";
import Icon from "../../xelpmoc-core/Icon";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
  MY_ACCOUNT_ORDERS_PAGE,
  ABOUT_US_URL,
  MY_ACCOUNT_PAGE,
  RETURN_URL,
  FAQ_URL,
  CONTACT_URL,
  HELP,
  COSTUMER_CLIQ_CARE_ROUTE
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  setDataLayer,
  ADOBE_HELP,
  SET_DATA_LAYER_FAQ,
  SET_DATA_LAYER_ABOUTUS,
  SET_DATA_LAYER_CC,
  SET_DATA_LAYER_CONTACTUS,
  ABOUT_US,
  FAQ,
  CONTACT_US,
  setDataLayerForFaqAndTc
} from "../../lib/adobeUtils";
export default class HelpDetails extends React.Component {
  componentDidMount() {
    this.props.setHeaderText(HELP);
    setDataLayer(ADOBE_HELP);
    window.scroll(0, 0);
  }

  componentDidUpdate() {
    this.props.setHeaderText(HELP);
  }

  onClickCustomerCare() {}

  onClick = (url, type) => {
    if (type === FAQ) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_FAQ);
    } else if (type === ABOUT_US) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_ABOUTUS);
    } else if (type === CONTACT_US) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_CONTACTUS);
    }
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };

  goToOrdersPage = () => {
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`;
    this.props.history.push(url);
  };

  redirectToOrderRelatedPage() {
    setDataLayerForFaqAndTc(SET_DATA_LAYER_CC);
    this.props.history.push(`${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`);
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.bannerHolder} />
        <div className={styles.helpListHolder}>
          <div
            className={styles.helpCard}
            onClick={() => this.onClick(FAQ_URL, FAQ)}
          >
            <div className={styles.helpCardWithIcon}>
              <div className={styles.faq}>
                <MobileOnly>
                  <div className={styles.iconHolder}>
                    <Icon image={faqIcon} size={25} />
                  </div>
                </MobileOnly>
                FAQ
              </div>
            </div>
          </div>
          <DesktopOnly>
            <div
              className={styles.helpCard}
              onClick={() => this.onClick(CONTACT_URL, CONTACT_US)}
            >
              <div className={styles.helpCardWithIcon}>
                <div className={styles.contactUs}>
                  <MobileOnly>
                    <div className={styles.iconHolder}>
                      <Icon image={faqIcon} size={25} />
                    </div>
                  </MobileOnly>
                  Contact us
                </div>
              </div>
            </div>
            <div
              className={styles.helpCard}
              onClick={() =>
                this.redirectToOrderRelatedPage(COSTUMER_CLIQ_CARE_ROUTE)
              }
            >
              <div className={styles.helpCardWithIcon}>
                <div className={styles.customerCare}>
                  <MobileOnly>
                    <div className={styles.iconHolder}>
                      <Icon image={customerCareIcon} size={25} />
                    </div>
                  </MobileOnly>
                  Customer care
                </div>
              </div>
            </div>
          </DesktopOnly>
          <MobileOnly>
            <div
              className={styles.helpCard}
              onClick={() => this.goToOrdersPage()}
            >
              <div className={styles.iconHolder}>
                <Icon image={trackOrderIcon} size={25} />
              </div>
              Track Order
            </div>
            <div
              className={styles.helpCard}
              onClick={() => this.onClick(RETURN_URL)}
            >
              <div className={styles.iconHolder}>
                <Icon image={returnIcon} size={25} />
              </div>
              Returns
            </div>
            <div
              className={styles.helpCard}
              onClick={() =>
                this.redirectToOrderRelatedPage(COSTUMER_CLIQ_CARE_ROUTE)
              }
            >
              <div className={styles.iconHolder}>
                <Icon image={customerCareIcon} size={25} />
              </div>
              Contact Tata CLiQ Care
            </div>
          </MobileOnly>
          <div
            className={styles.helpCard}
            onClick={() => this.onClick(ABOUT_US_URL, ABOUT_US)}
          >
            <div className={styles.helpCardWithIcon}>
              <div className={styles.aboutUs}>
                <MobileOnly>
                  <div className={styles.iconHolder}>
                    <Icon image={aboutUsIcon} size={25} />
                  </div>
                </MobileOnly>
                About us
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
