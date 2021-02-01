import React from "react";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import * as Cookie from "../../lib/Cookie";
import FooterButton from "../../general/components/FooterButton.js";
import saveIcon from "../../general/components/img/download.svg";
import wishListBeautyIcon from "../../general/components/img/wishlistBeauty.svg";
import wishListBeautyFullFilledIcon from "../../general/components/img/wishlistBeautyFullfilled.svg";
import styles from "./AddToWishListButton.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import wishlistUnfilled from "./img/wishlist_unfilled.svg";
import wishlistFilled from "./img/wishlist_filled.svg";
import {
    LOGIN_PATH,
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST,
} from "../../lib/constants.js";
import * as UserAgent from "../../lib/UserAgent.js";
import queryString from "query-string";
import Button from "../../general/components/Button";
import {
    setDataLayer,
    ADOBE_WISHLIST_PLP_REMOVE,
    ADOBE_WISHLIST_PDP_REMOVE,
    ADOBE_ADD_TO_WISHLIST_PLP,
    ADOBE_ADD_TO_WISHLIST_PDP,
    ADOBE_MDE_CLICK_ON_SAVE_TO_WISHLIST,
} from "../../lib/adobeUtils";
import { RouterPropTypes } from "../../general/router-prop-types";
export const WISHLIST_FOOTER_BUTTON_TYPE = "wishlistFooter";
export const WISHLIST_FOOTER_ICON_TYPE = "wishlistIcon";
export const WISHLIST_BUTTON_TEXT_TYPE = "wishlistText";
export const WISHLIST_BUTTON_TEXT_TYPE_SMALL = "wishlistTextSmall";
export const ONLY_ICON = "wishlistIconForPdp";
const BEAUTY_PDP_ICON = "beautyIconForPdp";
const PRODUCT_CODE_REGEX = /p-mp(.*)/i;
const PRODUCT_REGEX_CART = /cart(.*)/i;

export default class AddToWishListButton extends React.Component {
    state = {
        foundInWishList: false,
    };

    onClick(e) {
        if (this.props && this.props.location && this.props.location.pathname) {
            let path = this.props.location.pathname;
            if (!PRODUCT_CODE_REGEX.test(path)) {
                if (!PRODUCT_REGEX_CART.test(path)) {
                    setDataLayer(ADOBE_ADD_TO_WISHLIST_PLP, this.props.productListings);
                }
            } else {
                setDataLayer(ADOBE_ADD_TO_WISHLIST_PDP, this.props.productListings);
            }
        }
        if (e) {
            e.stopPropagation();
        }
        if (this.props.exchangeDetails) {
            setDataLayer(ADOBE_MDE_CLICK_ON_SAVE_TO_WISHLIST);
        }
        const { productListingId, winningUssID, wishlistItems, index } = this.props;
        let addToWishListObj = Object.assign(
            {},
            {
                productListingId: productListingId,
                winningUssID: winningUssID,
                index: index,
            }
        );

        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (!userDetails || !customerCookie) {
            // const url = this.props.location.pathname;
            // const { productListingId, winningUssID } = this.props;
            // this.props.setUrlToRedirectToAfterAuth(url);
            // this.props.addProductToWishListAfterAuth({
            //   productListingId: productListingId,
            //   winningUssID: winningUssID
            // });
            // this.props.history.push(LOGIN_PATH);
            if (this.props.exchangeDetails) {
                let addToWlWithExchangeTrue = "addToWlWithExchangeTrue";
                let quoteId = this.props.exchangeDetails.quoteId;
                let IMEINumber = this.props.exchangeDetails.IMEINumber;
                let exchangeId = this.props.exchangeDetails.exchangeProductId;

                addToWishListObj.addToWlWithExchangeTrue = addToWlWithExchangeTrue;
                addToWishListObj.quoteId = quoteId;
                addToWishListObj.IMEINumber = IMEINumber;
                addToWishListObj.exchangeId = exchangeId;
            }
            localStorage.setItem(PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST, JSON.stringify(addToWishListObj));
            if (this.props.isSizeSelectedForAddToWishlist) {
                this.props.showSizeSelector();
            } else {
                const href = window.location.href;
                const protocol = window.location.protocol;
                const hostName = window.location.hostname;
                const port = window.location.port;
                let domainName;
                if (window.location.port) {
                    domainName = protocol + "//" + hostName + ":" + port;
                } else {
                    domainName = protocol + "//" + hostName;
                }

                const url = href.replace(domainName, "");
                this.props.setUrlToRedirectToAfterAuth(url);
                if (UserAgent.checkUserAgentIsMobile()) {
                    this.props.history.push(LOGIN_PATH);
                } else {
                    if (this.props.showAuthPopUp) {
                        this.props.showAuthPopUp();
                    }
                }
            }

            return null;
        } else {
            let indexOfProduct = wishlistItems.findIndex(item => {
                return item.productCode === productListingId && item.ussid === winningUssID;
            });
            // as per MDEQ-226 MDEQ-263 - done following change
            if (this.props.exchangeDetails) {
                indexOfProduct = -1;
            }
            if (this.props.isSizeSelectedForAddToWishlist) {
                this.props.showSizeSelector();
            } else {
                if (indexOfProduct < 0) {
                    // if product is having exchange details
                    if (this.props.exchangeDetails) {
                        let addToWlWithExchangeTrue = "addToWlWithExchangeTrue";
                        let quoteId = this.props.exchangeDetails.quoteId;
                        let IMEINumber = this.props.exchangeDetails.IMEINumber;
                        let exchangeId = this.props.exchangeDetails.exchangeProductId;
                        this.props.addProductToWishList({
                            productListingId,
                            winningUssID,
                            addToWlWithExchangeTrue,
                            quoteId,
                            IMEINumber,
                            exchangeId,
                        });
                    } else {
                        this.props.addProductToWishList({
                            productListingId,
                            winningUssID,
                        });
                    }
                    if (this.props.isFromCartPage) {
                        this.props.removeAppliancesExchange(this.props.winningUssID);
                    }
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
        this.checkInWishlist(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkInWishlist(nextProps);
    }

    // componentDidUpdate(prevProps) {
    //   if (this.props.wishlistItems !== prevProps.wishlistItems) {
    //     this.checkInWishlist(this.props);
    //   }
    // }
    checkInWishlist(props) {
        let loggedInUserDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        if (loggedInUserDetails && props.wishlistItems && Array.isArray(props.wishlistItems)) {
            let self = this;
            let foundWishListItem = props.wishlistItems.find(item => {
                if (item.ussid) return item.ussid === self.props.ussid;
                else if (item.USSID) return item.USSID === self.props.ussid;
            });
            if (typeof foundWishListItem === "object" && Object.keys(foundWishListItem).length) {
                this.setState({ foundInWishList: true });
            } else {
                this.setState({ foundInWishList: false });
            }
        } else {
            this.setState({ foundInWishList: false });
        }
    }

    removeProduct(e, ussid) {
        if (e) {
            e.stopPropagation();
        }
        const productDetails = {};
        productDetails.ussId = ussid;

        if (this.props.removeProductFromWishList) {
            this.props.removeProductFromWishList(productDetails);
        }
        if (this.props && this.props.location && this.props.location.pathname) {
            let path = this.props.location.pathname;
            if (!PRODUCT_CODE_REGEX.test(path)) {
                setDataLayer(ADOBE_WISHLIST_PLP_REMOVE, this.props.productListings);
            } else {
                setDataLayer(ADOBE_WISHLIST_PDP_REMOVE, this.props.productListings);
            }
        }
    }

    render() {
        //let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        // if (userCookie) {
        //   userCookie = JSON.parse(userCookie);
        //   this.checkInWishlist(this.props);
        // }
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

        if (this.props.type === WISHLIST_BUTTON_TEXT_TYPE || this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL) {
            return (
                <div className={styles.saveButton} onClick={e => this.onClick(e)}>
                    <div
                        className={
                            this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL
                                ? styles.iconHolderSmall
                                : styles.iconHolder
                        }
                    >
                        <Icon image={saveIcon} size={this.props.type === WISHLIST_BUTTON_TEXT_TYPE_SMALL ? 18 : 24} />
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
        if (this.props.type === "wishlistTextPDP") {
            return (
                <div className={styles.buttonAddToBag}>
                    <Button
                        type="primary"
                        height={45}
                        width={195}
                        label="Save To Wishlist"
                        onClick={e => this.onClick(e)}
                    />
                </div>
            );
        }

        if (this.state.foundInWishList && this.props.type === BEAUTY_PDP_ICON) {
            return (
                <div
                    className={styles.saveButtonBeautyPdp}
                    onClick={e => this.removeProduct(e, this.props.winningUssID)}
                >
                    <div className={styles.iconHolderForBeautyPdp}>
                        <Icon
                            image={this.props.isWhite ? wishListBeautyIcon : wishListBeautyFullFilledIcon}
                            width={20}
                            height={36}
                        />
                    </div>
                </div>
            );
        }

        if (this.state.foundInWishList) {
            return (
                <div onClick={e => this.removeProduct(e, this.props.winningUssID)}>
                    <Icon image={this.props.isWhite ? wishlistUnfilled : wishlistFilled} size={this.props.size} />
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

        if (this.props.type === BEAUTY_PDP_ICON) {
            return (
                <div className={styles.saveButtonBeautyPdp} onClick={e => this.onClick(e)}>
                    <div className={styles.iconHolderForBeautyPdp}>
                        <Icon image={wishListBeautyIcon} width={26} height={36} />
                    </div>
                </div>
            );
        }

        return (
            <div onClick={e => this.onClick(e)}>
                <Icon image={this.props.isWhite ? wishlistFilled : wishlistUnfilled} size={this.props.size} />
            </div>
        );
    }
}
AddToWishListButton.propTypes = {
    productListingId: PropTypes.string.isRequired,
    winningUssID: PropTypes.string.isRequired,
    wishlistItems: PropTypes.arrayOf(
        PropTypes.shape({
            productCode: PropTypes.string,
            ussid: PropTypes.string,
        })
    ),
    addProductToWishList: PropTypes.func,
    size: PropTypes.number,
    location: RouterPropTypes.location,
    match: RouterPropTypes.match,
    history: RouterPropTypes.history,
    isWhite: PropTypes.bool,
    type: PropTypes.string,
    removeProductFromWishList: PropTypes.func,
    productListings: PropTypes.object,
    setUrlToRedirectToAfterAuth: PropTypes.func,
    showAuthPopUp: PropTypes.func,
    isFromCartPage: PropTypes.bool,
    removeAppliancesExchange: PropTypes.func,
    displayToast: PropTypes.func,
    exchangeDetails: PropTypes.object,
    isSizeSelectedForAddToWishlist: PropTypes.bool,
    showSizeSelector: PropTypes.func,
    index: PropTypes.number,
};
AddToWishListButton.defaultProps = {
    size: 20,
    isSizeSelectedForAddToWishlist: false,
    addProductToWishList: () => {},
    type: WISHLIST_FOOTER_ICON_TYPE,
};
