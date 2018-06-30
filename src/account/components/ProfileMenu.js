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
  MY_ACCOUNT_COUPON_PAGE,
  SAVE_LIST_PAGE
} from "../../lib/constants";
import savedList from "../../general/components/img/download.svg";
import savedListRed from "./img/SaveListRed.png";
import addressBook from "./img/addressbook.svg";
import addressBookRed from "./img/addressbookRed.svg";
import brands from "./img/brand.svg";
import brandRed from "./img/brandRed.svg";
import orderHistory from "../../general/components/img/order-history.svg";
import orderHistoryRed from "./img/order-historyREd.svg";
import savedPayments from "./img/card.svg";
import savedPaymentsRed from "./img/cardRed.svg";
import alertsCoupons from "./img/alert.svg";
import alertsCouponsRed from "./img/alertRed.svg";
import cliqCash from "./img/cliqCash.svg";
import cliqCashRed from "./img/cliqCashRed.svg";
import giftCards from "./img/giftCards.svg";
import settings from "./img/settings.svg";
import settingsRed from "./img/settingsRed.svg";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
export default class PofileMenuGridForDesktop extends React.Component {
  onSave(value) {
    if (value) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${value}`);
    }
  }
  render() {
    const pathName = this.props.location.pathname;
    let selected = null;
    if (pathName === `${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`) {
      selected = "Saved List";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`) {
      selected = "Order History";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_PAGE}`) {
      selected = "Address Book";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_BRANDS_PAGE}`) {
      selected = "Brands";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_SAVED_CARDS_PAGE}`) {
      selected = "Saved Payments";
    }
    if (
      pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}` ||
      pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_COUPON_PAGE}`
    ) {
      selected = "Alerts & Coupons";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`) {
      selected = "CLiQ Cash";
    }
    if (pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_UPDATE_PROFILE_PAGE}`) {
      selected = "Settings";
    }
    const data = [
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`
            ? savedListRed
            : savedList,
        text: "Saved List",
        url: SAVE_LIST_PAGE
      },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`
            ? orderHistoryRed
            : orderHistory,
        text: "Order History",
        url: MY_ACCOUNT_ORDERS_PAGE
      },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_PAGE}`
            ? addressBookRed
            : addressBook,
        text: "Address Book",
        url: MY_ACCOUNT_ADDRESS_PAGE
      },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_BRANDS_PAGE}`
            ? brandRed
            : brands,
        text: "Brands",
        url: MY_ACCOUNT_BRANDS_PAGE
      },

      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_SAVED_CARDS_PAGE}`
            ? savedPaymentsRed
            : savedPayments,
        text: "Saved Payments",
        url: MY_ACCOUNT_SAVED_CARDS_PAGE
      },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}` ||
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_COUPON_PAGE}`
            ? alertsCouponsRed
            : alertsCoupons,
        text: "Alerts & Coupons",
        url: MY_ACCOUNT_ALERTS_PAGE
      },
      { image: giftCards, text: "Gift Card", url: MY_ACCOUNT_GIFT_CARD_PAGE },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`
            ? cliqCashRed
            : cliqCash,
        text: "CLiQ Cash",
        url: MY_ACCOUNT_CLIQ_CASH_PAGE
      },
      {
        image:
          pathName === `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_UPDATE_PROFILE_PAGE}`
            ? settingsRed
            : settings,
        text: "Settings",
        url: MY_ACCOUNT_UPDATE_PROFILE_PAGE
      }
    ];
    return (
      <div className={styles.base}>
        <div className={styles.header}>Menu</div>
        <div className={styles.profiledata}>
          {data.map((datum, i) => {
            return (
              <div
                className={styles.holder}
                onClick={value => this.onSave(datum.url)}
              >
                <div className={styles.gridLogo}>
                  <Icon image={datum.image} size={20} />
                </div>
                <div
                  className={
                    datum.text === selected
                      ? styles.textSelect
                      : styles.gridText
                  }
                >
                  {datum.text}
                </div>
              </div>
            );
          })}
        </div>
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
