import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import downloadIcon from "./img/download.svg";
import * as Cookie from "../../lib/Cookie";
import FooterButton from "../../general/components/FooterButton.js";
import saveIcon from "../../general/components/img/download.svg";
import styles from "./AddToWishListButton.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import downloadIconWhite from "../../general/components/img/downloadWhite.svg";
import {
  LOGIN_PATH,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
} from "../../lib/constants.js";
import * as UserAgent from "../../lib/UserAgent.js";
import queryString, { parse } from "query-string";
export const WISHLIST_FOOTER_BUTTON_TYPE = "wishlistFooter";
export const WISHLIST_FOOTER_ICON_TYPE = "wishlistIcon";
export const WISHLIST_BUTTON_TEXT_TYPE = "wishlistText";
export const WISHLIST_BUTTON_TEXT_TYPE_SMALL = "wishlistTextSmall";
export const ONLY_ICON = "wishlistIconForPdp";
export default class AddToWishListButton extends React.Component {
  onClick(e) {
    if (e) {
      e.stopPropagation();
    }
    const { productListingId, winningUssID, wishlistItems, index } = this.props;
    let addToWishListObj = Object.assign(
      {},
      {
        productListingId: productListingId,
        winningUssID: winningUssID,
        index: index
      }
    );
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      localStorage.setItem(
        PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST,
        JSON.stringify(addToWishListObj)
      );
      if (this.props.isSizeSelectedForAddToWishlist) {
        this.props.showSizeSelector();
      } else {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        if (UserAgent.checkUserAgentIsMobile()) {
          this.props.history.push(LOGIN_PATH);
        } else {
          if (this.props.showAuthPopUp) {
            this.props.showAuthPopUp();
            return null;
          }
        }
      }
    } else {
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

    if (
      this.props.type === WISHLIST_BUTTON_TEXT_TYPE ||
      this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL
    ) {
      return (
        <div className={styles.saveButton} onClick={e => this.onClick(e)}>
          <div
            className={
              this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL
                ? styles.iconHolderSmall
                : styles.iconHolder
            }
          >
            <Icon
              image={saveIcon}
              size={
                this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL ? 18 : 24
              }
            />
          </div>
          <MobileOnly>
            <div className={styles.saveLabel}>Save</div>
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.saveLabel}>Save to wishlist</div>
          </DesktopOnly>
        </div>
      );
    }
    if (this.props.type === ONLY_ICON) {
      return (
        <div className={styles.saveButton} onClick={e => this.onClick(e)}>
          <div className={styles.iconHolderForPdp}>
            <Icon image={saveIcon} size={20} />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.iconButton} onClick={e => this.onClick(e)}>
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
