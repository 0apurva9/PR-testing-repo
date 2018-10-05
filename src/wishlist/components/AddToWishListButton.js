import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import downloadIcon from "./img/download.svg";
import * as Cookie from "../../lib/Cookie";
import FooterButton from "../../general/components/FooterButton.js";
import saveIcon from "../../general/components/img/download.svg";
import styles from "./AddToWishListButton.css";
import downloadIconWhite from "../../general/components/img/downloadWhite.svg";
import {
  LOGIN_PATH,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants.js";
import queryString, { parse } from "query-string";
export const WISHLIST_FOOTER_BUTTON_TYPE = "wishlistFooter";
export const WISHLIST_FOOTER_ICON_TYPE = "wishlistIcon";
export const WISHLIST_BUTTON_TEXT_TYPE = "wishlistText";
export default class AddToWishListButton extends React.Component {
  onClick(e) {
    if (e) {
      e.stopPropagation();
    }

    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      if (this.props.isSizeSelectedForAddToWishlist) {
        this.props.showSizeSelector();
      } else {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        this.props.history.push(LOGIN_PATH);
      }
    } else {
      const { productListingId, winningUssID, wishlistItems } = this.props;
      const indexOfProduct = wishlistItems.findIndex(item => {
        return (
          item.productcode === productListingId || item.USSID === winningUssID
        );
      });
      if (this.props.isSizeSelectedForAddToWishlist) {
        this.props.showSizeSelector();
      } else {
        if (indexOfProduct < 0) {
          this.props.addProductToWishList({
            productListingId,
            winningUssID
          });
        } else {
          this.props.displayToast();
        }
      }
    }
  }

  componentDidMount() {
    const parsedQueryString = queryString.parse(this.props.location.search);

    //Make saveWish list Api Call or Login screen depending on user session
    if (parsedQueryString.saveToListAmp === "true") {
      this.onClick();
    }
  }
  render() {
    if (this.props.type === WISHLIST_FOOTER_BUTTON_TYPE) {
      return (
        <FooterButton
          backgroundColor="transparent"
          textAlign="left"
          icon={saveIcon}
          label="Save to Wishlist"
          onClick={e => this.onClick(e)}
        />
      );
    }

    if (this.props.type === WISHLIST_BUTTON_TEXT_TYPE) {
      return (
        <div className={styles.saveButton} onClick={e => this.onClick(e)}>
          <div className={styles.iconHolder}>
            <Icon image={saveIcon} size={24} />
          </div>
          <div className={styles.saveLabel}>Save</div>
        </div>
      );
    }
    return (
      <div onClick={e => this.onClick(e)}>
        <Icon
          image={this.props.isWhite ? downloadIconWhite : downloadIcon}
          size={this.props.size}
        />
      </div>
    );
  }
}
AddToWishListButton.propTypes = {
  productListingId: PropTypes.string.isRequired,
  winningUssID: PropTypes.string.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      productListingId: PropTypes.string,
      winningUssID: PropTypes.string
    })
  ),
  addProductToWishList: PropTypes.func,
  size: PropTypes.number
};
AddToWishListButton.defaultProps = {
  size: 20,
  isSizeSelectedForAddToWishlist: false,
  addProductToWishList: () => {},
  type: WISHLIST_FOOTER_ICON_TYPE
};
