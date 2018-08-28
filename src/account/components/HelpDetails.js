import React from "react";
import styles from "./HelpDetails.css";
import faqIcon from "./img/faqred.svg";
import trackOrderIcon from "./img/tored.svg";
import cancelIcon from "./img/cancelred.svg";
import returnIcon from "./img/returnred.svg";
import customerCareIcon from "./img/callred.svg";
import contactUsIcon from "./img/contactred.svg";
import aboutUsIcon from "./img/aboutusred.svg";
import Icon from "../../xelpmoc-core/Icon";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
  MY_ACCOUNT_ORDERS_PAGE,
  ABOUT_US_URL,
  MY_ACCOUNT_PAGE,
  CANCEL_URL,
  RETURN_URL,
  FAQ_URL,
  CONTACT_URL,
  HELP
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class HelpDetails extends React.Component {
  componentDidMount() {
    this.props.setHeaderText(HELP);
    window.scroll(0, 0);
  }
  componentDidUpdate() {
    this.props.setHeaderText(HELP);
  }
  onClickCustomerCare() {}
  onClick = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  goToOrdersPage = () => {
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`;
    this.props.history.push(url);
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.bannerHolder} />
        <div className={styles.helpListHolder}>
          <div
            className={styles.helpCard}
            onClick={() => this.onClick(FAQ_URL)}
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
              onClick={() => this.onClick(CONTACT_URL)}
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
              onClick={() => this.onClickCustomerCare()}
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
            <div className={styles.helpCard}>
              <div className={styles.iconHolder}>
                <a href="tel:9029108282">
                  <Icon image={customerCareIcon} size={25} />
                </a>
              </div>
              <a href="tel:9029108282">Call Tata CLiQ Care</a>
            </div>

            <div className={styles.helpCardCall}>
              <div className={styles.helpCardWithIcon}>
                <div className={styles.iconWithTextHolder}>
                  <div className={styles.iconHolder}>
                    <Icon image={customerCareIcon} size={25} />
                  </div>

                  <a href="tel:9029108282">Call Customer care</a>
                </div>
              </div>
            </div>
          </MobileOnly>
          <div
            className={styles.helpCard}
            onClick={() => this.onClick(ABOUT_US_URL)}
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
