import React from "react";
import styles from "./MobileFooter.css";
import MobileFooterItem from "./MobileFooterItem";
import PropTypes from "prop-types";
import homeIcon from "./img/home_icon.png";
import categoriesIcon from "./img/categories_icon.png";
import brandsIcon from "./img/brands_icon.png";
import userIcon from "./img/myCliq_icon.png";
import myBagIcon from "./img/myBag_icon.png";
import homeIconRed from "./img/home_icon_red.png";
import categoriesIconRed from "./img/categories_icon_red.png";
import brandsIconRed from "./img/brands_icon_red.png";
import userIconRed from "./img/myCliq_icon_red.png";
import myBagIconRed from "./img/myBag_icon_red.png";
import { withRouter } from "react-router-dom";
import {
  HOME_ROUTER,
  PRODUCT_CART_ROUTER,
  DEFAULT_BRANDS_LANDING_PAGE,
  CATEGORIES_LANDING_PAGE,
  PRODUCT_CART_DELIVERY_MODES,
  ORDER_PAGE
} from "../../../src/lib/constants";
import { CATEGORY_REGEX } from "../../plp/components/PlpBrandCategoryWrapper";
const HOME = "home";
const CATEGORIES = "categories";
const BRANDS = "brands";
const PROFILE = "profile";
const BAG = "bag";

class MobileFooter extends React.Component {
  handleSelect(val) {
    if (this.props.history) {
      this.props.history.push(val);
    }
  }

  render() {
    const pathName = this.props.location.pathname;
    let selected = null;
    if (pathName === HOME_ROUTER) {
      selected = HOME;
    }
    if (pathName === CATEGORIES_LANDING_PAGE) {
      selected = CATEGORIES;
    }

    if (pathName === DEFAULT_BRANDS_LANDING_PAGE) {
      selected = BRANDS;
    }

    // if (pathName === PRODUCT_CART_ROUTER) {
    //   selected = BAG;
    // }

    if (selected === null) {
      return null;
    }

    return (
      <div className={styles.base}>
        <MobileFooterItem
          activeIcon={homeIconRed}
          basicIcon={homeIcon}
          value={HOME}
          text="Home"
          selected={selected}
          onSelect={() => this.handleSelect(HOME_ROUTER)}
        />
        <MobileFooterItem
          activeIcon={categoriesIconRed}
          basicIcon={categoriesIcon}
          value={CATEGORIES}
          text="Categories"
          selected={selected}
          onSelect={() => this.handleSelect(CATEGORIES_LANDING_PAGE)}
        />
        <MobileFooterItem
          activeIcon={brandsIconRed}
          basicIcon={brandsIcon}
          value={BRANDS}
          text="Brands"
          selected={selected}
          onSelect={() => this.handleSelect(DEFAULT_BRANDS_LANDING_PAGE)}
        />
        <MobileFooterItem
          activeIcon={userIconRed}
          basicIcon={userIcon}
          value={PROFILE}
          text="My Cliq"
          selected={selected}
          onSelect={() => this.handleSelect(ORDER_PAGE)}
        />
        <MobileFooterItem
          activeIcon={myBagIconRed}
          basicIcon={myBagIcon}
          value={BAG}
          text="My Bag"
          selected={selected}
          onSelect={val => this.handleSelect(PRODUCT_CART_ROUTER)}
        />
      </div>
    );
  }
}

export default withRouter(MobileFooter);

MobileFooter.propTypes = {
  selected: PropTypes.oneOf([HOME, CATEGORIES, BRANDS, PROFILE, BAG])
};
MobileFooter.defaultProps = {
  selected: HOME
};
