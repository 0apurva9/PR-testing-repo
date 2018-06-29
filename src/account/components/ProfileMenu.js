import React from "react";
import styles from "./ProfileMenu.css";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ORDERS_PAGE,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_SAVED_CARDS_PAGE,
  MY_ACCOUNT_ADDRESS_PAGE,
  MY_ACCOUNT_BRANDS_PAGE,
  MY_ACCOUNT_UPDATE_PROFILE_PAGE,
  MY_ACCOUNT_ALERTS_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  SAVE_LIST_PAGE
} from "../../lib/constants";
import savedList from "../../general/components/img/Save.svg";
import addressBook from "./img/addressbook.svg";
import brands from "./img/brand.svg";
import orderHistory from "../../general/components/img/order-history.svg";
import savedPayments from "./img/card.svg";
import alertsCoupons from "./img/alert.svg";
import cliqCash from "./img/cliqCash.svg";
import giftCards from "./img/giftCards.svg";
import settings from "./img/settings.svg";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
export default class PofileMenuGridForDesktop extends React.Component {
  onSave(value) {
    if (value) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${value}`);
    }
  }
  render() {
    const data = [
      {
        image: savedList,
        text: "Saved List",
        url: SAVE_LIST_PAGE
      },
      {
        image: orderHistory,
        text: "Order History",
        url: MY_ACCOUNT_ORDERS_PAGE
      },
      {
        image: addressBook,
        text: "Address Book",
        url: MY_ACCOUNT_ADDRESS_PAGE
      },
      { image: brands, text: "Brands", url: MY_ACCOUNT_BRANDS_PAGE },

      {
        image: savedPayments,
        text: "Saved Payments",
        url: MY_ACCOUNT_SAVED_CARDS_PAGE
      },
      {
        image: alertsCoupons,
        text: "Alerts & Coupons",
        url: MY_ACCOUNT_ALERTS_PAGE
      },
      { image: giftCards, text: "Gift Card", url: MY_ACCOUNT_GIFT_CARD_PAGE },
      { image: cliqCash, text: "CLiQ Cash", url: MY_ACCOUNT_CLIQ_CASH_PAGE },
      { image: settings, text: "Settings", url: MY_ACCOUNT_UPDATE_PROFILE_PAGE }
    ];

    return (
      <div className={styles.base}>
        <div className={styles.header}>Menu</div>
        {data.map((datum, i) => {
          return (
            <div
              className={styles.holder}
              onClick={value => this.onSave(datum.url)}
            >
              <div className={styles.gridLogo}>
                <Icon image={datum.image} size={20} />
              </div>
              <div className={styles.gridText}>{datum.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
PofileMenuGridForDesktop.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  backgroundColor: PropTypes.string,
  logo: PropTypes.string,
  image: PropTypes.string,
  header: PropTypes.string,
  color: PropTypes.string
};
PofileMenuGridForDesktop.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744"
};
