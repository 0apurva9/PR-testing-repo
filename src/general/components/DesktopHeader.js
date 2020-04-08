import React from "react";
import styles from "./DesktopHeader.css";
import PropTypes from "prop-types";
import {
  LOGGED_IN_USER_DETAILS,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PAGE,
  HELP_URL,
  RUPEE_SYMBOL,
  COSTUMER_ORDER_RELATED_QUERY_ROUTE
} from "../../../src/lib/constants";
import DropdownMenu from "./DropdownMenu.js";
import * as Cookie from "../../lib/Cookie";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import BrandImage from "./BrandImage";
import {
  setDataLayerForHeaderAndFooterDirectCalls,
  ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
  ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK,
  ADOBE_DIRECT_CALL_FOR_BRAND_CLICK,
  setDataLayerForMinibag,
  setDataLayerForFaqAndTc,
  SET_DATA_LAYER_CC
} from "../../lib/adobeUtils";
import { isBrowser } from "browser-or-node";
import ProductImage from "./ProductImage.js";
import Minibag from "./minibag.js";
const CATEGORY = "Categories";
const BRANDS = "Brands";
const NO_SIZE = "NO SIZE";

export default class DesktopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      hoverInType: null,
      bagHover: false
    };
  }
  // headerClicked() {
  //   setDataLayerForHeaderAndFooterDirectCalls(
  //     ADOBE_DIRECT_CALL_FOR_HEADER_CLICK
  //   );
  // }
  redirectToHome() {
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      "Tata CLiQ Logo"
    );
    if (this.props.redirectToHome) {
      this.props.redirectToHome();
    }
  }
  openSignUpPopUp(value) {
    if (this.props.openSignUp) {
      this.props.openSignUp();
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        value
      );
    }
  }
  handleSelect() {
    if (this.props.onSelect) {
      this.props.onSelect();
      setDataLayerForMinibag();
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        "Cart"
      );
    }
  }
  goToTrackOrders(value, event) {
    event.preventDefault();
    if (this.props.goToTrackOrders) {
      this.props.goToTrackOrders();
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        value
      );
    }
  }
  goToWishList() {
    if (this.props.goToWishList) {
      this.props.goToWishList();
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        "Wishlist"
      );
    }
  }
  goToMyAccount() {
    if (this.props.goToMyAccount) {
      this.props.goToMyAccount();
    }
  }

  onGiftCard(value, event) {
    event.preventDefault();
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`;
    this.props.history.push(url);
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
  }
  onCliqCash(value, event) {
    event.preventDefault();
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`;
    this.props.history.push(url);
    setDataLayerForHeaderAndFooterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
      value
    );
  }
  onHoverCategory(value) {
    const headerBrandAndCategoryDetails =
      this.props.headerBrandAndCategoryDetails &&
      this.props.headerBrandAndCategoryDetails.items &&
      this.props.headerBrandAndCategoryDetails.items[0];
    if (this.state.hoverInType === CATEGORY) {
      this.setState({
        hoverInType: null,
        hovered: null
      });
    } else {
      if (headerBrandAndCategoryDetails) {
        this.setState({
          hovered:
            headerBrandAndCategoryDetails &&
            headerBrandAndCategoryDetails.categoriesTabAZListComponent &&
            headerBrandAndCategoryDetails.categoriesTabAZListComponent[0]
              .category_name,
          hoverInType: value
        });
      }
    }
  }
  onHoverBrands(value) {
    const headerBrandAndCategoryDetails =
      this.props.headerBrandAndCategoryDetails &&
      this.props.headerBrandAndCategoryDetails.items &&
      this.props.headerBrandAndCategoryDetails.items[0];

    if (this.state.hoverInType === BRANDS) {
      this.setState({
        hoverInType: null,
        hovered: null
      });
    } else {
      if (headerBrandAndCategoryDetails) {
        this.setState({
          hovered:
            headerBrandAndCategoryDetails &&
            headerBrandAndCategoryDetails.brandsTabAZListComponent &&
            headerBrandAndCategoryDetails.brandsTabAZListComponent[0].subType,
          hoverInType: value
        });
      }
    }
    if (this.state.hoverInType === BRANDS) {
      this.setState({
        hoverInType: null,
        hovered: null
      });
    }
  }
  hoverIn(value) {
    this.setState({
      hovered: value
    });
  }
  hoverOut() {
    this.setState({
      hovered: null,
      hoverInType: null,
      bagHover: false
    });
  }
  renderToAnotherUrlForHelp(webURL, value, event) {
    event.preventDefault();
    setDataLayerForFaqAndTc(SET_DATA_LAYER_CC);
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`
    );
    // if (webURL) {
    //   const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
    //   this.props.history.push(urlSuffix);
    //   setDataLayerForHeaderAndFooterDirectCalls(
    //     ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
    //     value
    //   );
    }
  
  renderToAnotherURL(webURL, triggerDirectCall, value) {
    if (webURL) {
      let urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
      this.props.userSelectedOutOfStock();
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        ""
      );
      setDataLayerForHeaderAndFooterDirectCalls(triggerDirectCall, value);
    }
  }
  getLuxURL() {
    const hostName = isBrowser ? window.location.href : "";
    switch (hostName) {
      case "https://tmppprd.tataunistore.com/":
        return "https://luxtmppprd.tataunistore.com/";
        break;
      case "https://p2tmppprd.tataunistore.com/":
        return "https://luxtmppprd.tataunistore.com/";
        break;
      case "https://deskuat6-tcs.tataunistore.com":
        return "https://luxuat6-tcs.tataunistore.com";
        break;
      case "https://deskuat6-tcs.tataunistore.com/":
        return "https://luxuat6-tcs.tataunistore.com/";
        break;
      case "https://www.tatacliq.com/":
        return "https://luxury.tatacliq.com/";
        break;
      default:
        return "https://luxury.tatacliq.com/";
    }
  }
  onHoverBag() {
    this.setState({
      bagHover: true
    });
  }

  render() {
    //let hostName = window.location.origin;

    const headerBrandAndCategoryDetails =
      this.props.headerBrandAndCategoryDetails &&
      this.props.headerBrandAndCategoryDetails.items &&
      this.props.headerBrandAndCategoryDetails.items[0];
    let currentCategory =
      headerBrandAndCategoryDetails &&
      headerBrandAndCategoryDetails.categoriesTabAZListComponent &&
      headerBrandAndCategoryDetails.categoriesTabAZListComponent.find(
        categories => {
          return categories.category_name === this.state.hovered;
        }
      );
    let currentBrand =
      headerBrandAndCategoryDetails &&
      headerBrandAndCategoryDetails.brandsTabAZListComponent &&
      headerBrandAndCategoryDetails.brandsTabAZListComponent.find(brand => {
        return brand.subType === this.state.hovered;
      });
    let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    let className = styles.base;
    let logo = styles.logoHolder;
    if (this.props.isSticky) {
      className = styles.stickyBase;
      logo = styles.stickyLogo;
    } else {
      if (!this.props.isSearch) {
        className = `${styles.base} ${styles.CheckoutHeader}`;
      }
    }

    return (
      <div className={this.props.isSearch ? className : className}>
        {this.props.isSearch && <div className={styles.dummyColorHeader} />}
        <div
          className={styles.headerHolder}
          // onClick={() => this.headerClicked()}
        >
          <div className={logo} onClick={() => this.redirectToHome()} />
          {this.props.profileDetails && (
            <div className={styles.profileWonerHolder}>
              <div className={styles.signInAndLogout}>
                <div className={styles.nameAndContact}>
                  <div className={styles.logOutDropDown}>
                    <DropdownMenu {...this.props} />
                  </div>
                  <div className={styles.dropDownArrow} />
                  <div
                    className={styles.iconPersonHolder}
                    onClick={() => this.goToMyAccount()}
                  />
                  <span className={styles.nameSpan}>
                    {userCookie && userCookie.firstName && (
                      <span>{userCookie.firstName}</span>
                    )}
                  </span>
                  {userCookie &&
                    userCookie.firstName === " " &&
                    userCookie.lastName === " " &&
                    userCookie.userName && <span>{userCookie.userName}</span>}
                </div>
              </div>
            </div>
          )}
          {this.props.isSearch && (
            <div className={styles.headerFunctionality}>
              <div className={styles.upperHeader}>
                <a href={this.getLuxURL()} rel="nofollow" target="_blank">
                  {" "}
                  <div
                    className={styles.luxeryTab}
                    onClick={() =>
                      setDataLayerForHeaderAndFooterDirectCalls(
                        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
                        "Tata CLiQ Luxury"
                      )
                    }
                  >
                    Tata CLiQ Luxury
                  </div>
                </a>
                <div className={styles.loginAndTrackTab}>
                  <div className={styles.signInAndLogout}>
                    <div className={styles.logOutDropDown}>
                      <DropdownMenu {...this.props} />
                    </div>
                    {!userCookie && !userCookie && (
                      <div
                        className={styles.loginTab}
                        onClick={() =>
                          this.openSignUpPopUp("Sign in / Sign Up")
                        }
                      >
                        Sign in / Sign Up
                      </div>
                    )}
                    {userCookie && userCookie && (
                      <div className={styles.userDetails}>
                        <div className={styles.nameAndContact}>
                          <div className={styles.dropDownArrow} />
                          <div
                            className={styles.iconPersonHolder}
                            onClick={() => this.goToMyAccount()}
                          />
                          <span className={styles.nameSpan}>
                            {userCookie.firstName !== " " && (
                              <span>
                                {userCookie &&
                                  userCookie.firstName &&
                                  `${userCookie.firstName}`}
                              </span>
                            )}
                          </span>
                          {userCookie &&
                            userCookie.firstName === " " &&
                            userCookie.lastName === " " &&
                            userCookie.userName && <span>Hello</span>}
                        </div>
                      </div>
                    )}
                  </div>
                  <a href={""} target="_blank">
                    <div
                      className={styles.loginTab}
                      onClick={event =>
                        this.goToTrackOrders("Track Orders", event)
                      }
                    >
                      Track Orders
                    </div>
                  </a>
                  <a href={""} target="_blank">
                    <div
                      className={styles.loginTab}
                      onClick={event =>
                        this.renderToAnotherUrlForHelp(HELP_URL, "Help", event)
                      }
                    >
                      CLiQ Care
                    </div>
                  </a>
                  <a href={""} target="_blank">
                    <div
                      className={styles.loginTab}
                      onClick={event => this.onGiftCard("Gift Card", event)}
                    >
                      Gift Card
                    </div>
                  </a>
                  <a href={""} target="_blank">
                    <div
                      className={styles.loginTab}
                      onClick={event => this.onCliqCash("CLiQ Cash", event)}
                    >
                      CLiQ Cash
                    </div>
                  </a>
                </div>
              </div>
              <div className={styles.lowerHeader}>
                <div className={styles.leftTabHolder}>
                  {headerBrandAndCategoryDetails &&
                    headerBrandAndCategoryDetails.categoriesTabAZListComponent &&
                    headerBrandAndCategoryDetails.categoriesTabAZListComponent
                      .length > 0 && (
                      <div
                        className={
                          this.state.hoverInType === CATEGORY
                            ? styles.categoryAndBrandWithArrow
                            : styles.categoryAndBrand
                        }
                        onMouseEnter={() => this.onHoverCategory(CATEGORY)}
                        onMouseLeave={() => this.hoverOut()}
                      >
                        Categories
                        <div
                          className={
                            this.state.hoverInType === CATEGORY
                              ? styles.downArrow
                              : styles.arrow
                          }
                        />
                        {this.state.hoverInType === CATEGORY && (
                          <div className={styles.categoriesHolder}>
                            <div className={styles.categoryDetails}>
                              {headerBrandAndCategoryDetails.categoriesTabAZListComponent.map(
                                (categories, val) => {
                                  return (
                                    <React.Fragment>
                                      <div
                                        className={
                                          this.state.hovered ===
                                          categories.category_name
                                            ? styles.categoryDetailsValueWithArrow
                                            : styles.categoryDetailsValue
                                        }
                                        onMouseEnter={() =>
                                          this.hoverIn(categories.category_name)
                                        }
                                        onClick={() =>
                                          this.renderToAnotherURL(
                                            categories.webURL,
                                            ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK,
                                            categories.category_name
                                          )
                                        }
                                      >
                                        {categories.category_name}
                                        <div
                                          className={
                                            this.state.hovered ===
                                            categories.category_name
                                              ? styles.rightArrow
                                              : ""
                                          }
                                        />
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                            <div className={styles.subCategoryDetailsHolder}>
                              {currentCategory &&
                                currentCategory.subCategories &&
                                currentCategory.subCategories.map(
                                  (subCategoriesHeader, val) => {
                                    return (
                                      <React.Fragment>
                                        <div
                                          className={
                                            styles.subCategoryDetailsHeader
                                          }
                                          onClick={() =>
                                            this.renderToAnotherURL(
                                              subCategoriesHeader.webURL,
                                              ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK,
                                              subCategoriesHeader.category_name
                                            )
                                          }
                                        >
                                          {subCategoriesHeader.category_name}
                                        </div>
                                        {subCategoriesHeader &&
                                          subCategoriesHeader.subCategories &&
                                          subCategoriesHeader.subCategories.map(
                                            (subCategoryDetails, value) => {
                                              return (
                                                <div
                                                  className={
                                                    styles.subCategoryDetailsValues
                                                  }
                                                  onClick={() =>
                                                    this.renderToAnotherURL(
                                                      subCategoryDetails.webURL,
                                                      ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK,
                                                      subCategoryDetails.category_name
                                                    )
                                                  }
                                                >
                                                  {
                                                    subCategoryDetails.category_name
                                                  }
                                                </div>
                                              );
                                            }
                                          )}
                                      </React.Fragment>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  {headerBrandAndCategoryDetails &&
                    headerBrandAndCategoryDetails.brandsTabAZListComponent &&
                    headerBrandAndCategoryDetails.brandsTabAZListComponent
                      .length > 0 && (
                      <div
                        className={
                          this.state.hoverInType === BRANDS
                            ? styles.categoryAndBrandWithArrow
                            : styles.categoryAndBrand
                        }
                        onMouseEnter={() => this.onHoverBrands(BRANDS)}
                        onMouseLeave={() => this.hoverOut()}
                      >
                        Brands
                        <div
                          className={
                            this.state.hoverInType === BRANDS
                              ? styles.downArrow
                              : styles.arrow
                          }
                        />
                        {this.state.hoverInType === BRANDS && (
                          <div className={styles.brandDetailsHolder}>
                            <div className={styles.brandLeftDetails}>
                              {headerBrandAndCategoryDetails.brandsTabAZListComponent.map(
                                (brand, val) => {
                                  return (
                                    <React.Fragment>
                                      <div
                                        className={
                                          this.state.hovered === brand.subType
                                            ? styles.categoryDetailsValueWithArrow
                                            : styles.categoryDetailsValue
                                        }
                                        onMouseEnter={() =>
                                          this.hoverIn(brand.subType)
                                        }
                                      >
                                        {brand.subType}
                                        <div
                                          className={
                                            this.state.hovered === brand.subType
                                              ? styles.rightArrow
                                              : ""
                                          }
                                        />
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                            <div className={styles.subBrandsDetailsHolder}>
                              <React.Fragment>
                                {currentBrand && currentBrand.popularBrands && (
                                  <div className={styles.popularBrands}>
                                    <div className={styles.brandsHeader}>
                                      Popular brands
                                    </div>
                                    {currentBrand.popularBrands.map(
                                      popularBrands => {
                                        return (
                                          <div
                                            className={styles.brandsDetails}
                                            onClick={() =>
                                              this.renderToAnotherURL(
                                                popularBrands.webURL,
                                                ADOBE_DIRECT_CALL_FOR_BRAND_CLICK,
                                                popularBrands.brandName
                                              )
                                            }
                                          >
                                            {popularBrands.brandName}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                                {currentBrand && currentBrand.featuredBrands && (
                                  <div className={styles.featureBrands}>
                                    <div className={styles.brandsHeader}>
                                      Featured brands
                                    </div>
                                    {currentBrand.featuredBrands.map(
                                      featuredBrands => {
                                        return (
                                          <div
                                            className={styles.brandsDetails}
                                            onClick={() =>
                                              this.renderToAnotherURL(
                                                featuredBrands.webURL,
                                                ADOBE_DIRECT_CALL_FOR_BRAND_CLICK,
                                                featuredBrands.brandName
                                              )
                                            }
                                          >
                                            {featuredBrands.brandName}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </React.Fragment>
                            </div>
                            <div className={styles.subBrandsLogoHolder}>
                              <React.Fragment>
                                {currentBrand &&
                                  currentBrand.items &&
                                  currentBrand.items.map((brandLogo, i) => {
                                    return (
                                      <div className={styles.brandLogoDetails}>
                                        <BrandImage
                                          image={brandLogo.brandLogo}
                                          text={brandLogo.text}
                                          value={brandLogo.webURL}
                                          onClick={value =>
                                            this.renderToAnotherURL(
                                              brandLogo.webURL,
                                              ADOBE_DIRECT_CALL_FOR_BRAND_CLICK,
                                              ""
                                            )
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                              </React.Fragment>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
                <div className={styles.rightTabHolder}>
                  <div
                    className={styles.myBagShow}
                    onClick={() => this.handleSelect()}
                    onMouseEnter={() => this.onHoverBag()}
                    onMouseLeave={() => this.hoverOut()}
                  >
                    {this.props.bagCount !== null &&
                      this.props.bagCount > 0 && (
                        <span
                          className={styles.cartCount}
                        >{`${this.props.bagCount}`}</span>
                      )}
                    {this.props.minicart &&
                      this.props.minicart.products &&
                      this.state.bagHover && (
                        <Minibag
                          cart={this.props.minicart}
                          gotoCart={() => this.handleSelect()}
                        />
                      )}
                  </div>
                  <div
                    className={styles.mywishList}
                    onClick={() => this.goToWishList()}
                  >
                    {userCookie &&
                      this.props.wishListCount !== null &&
                      this.props.wishListCount > 0 && (
                        <div
                          className={styles.cartCount}
                        >{`${this.props.wishListCount}`}</div>
                      )}
                  </div>
                </div>
                {this.props.searchHolder && (
                  <div className={styles.searchHolder}>
                    <div className={styles.searchWrapper}>
                      {this.props.searchHolder}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
DesktopHeader.propTypes = {
  openSignUp: PropTypes.func,
  onSelect: PropTypes.func,
  goToTrackOrders: PropTypes.func,
  bagCount: PropTypes.number,
  isSearch: PropTypes.bool,
  goToWishList: PropTypes.func,
  isSticky: PropTypes.bool
};
DesktopHeader.defaultProps = {
  isSticky: false
};
