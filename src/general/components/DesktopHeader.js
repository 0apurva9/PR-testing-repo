import React from "react";
import styles from "./DesktopHeader.css";
import PropTypes from "prop-types";
import {
  LOGGED_IN_USER_DETAILS,
  CONTACT_URL,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_CLIQ_CASH_PAGE
} from "../../../src/lib/constants";
import DropdownMenu from "./DropdownMenu.js";
import LogoutButtonContainer from "../../account/containers/LogoutButtonContainer";
import * as Cookie from "../../lib/Cookie";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import BrandImage from "./BrandImage";
const CATEGORY = "Categories";
const BRANDS = "Brands";

export default class DesktopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: null,
      hoverInType: null
    };
  }
  redirectToHome() {
    if (this.props.redirectToHome) {
      this.props.redirectToHome();
    }
  }
  openSignUpPopUp() {
    if (this.props.openSignUp) {
      this.props.openSignUp();
    }
  }
  handleSelect() {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }
  goToTrackOrders() {
    if (this.props.goToTrackOrders) {
      this.props.goToTrackOrders();
    }
  }
  goToWishList() {
    if (this.props.goToWishList) {
      this.props.goToWishList();
    }
  }
  goToMyAccount() {
    if (this.props.goToMyAccount) {
      this.props.goToMyAccount();
    }
  }

  onGiftCard() {
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`;
    this.props.history.push(url);
  }
  onCliqCash() {
    const url = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_CLIQ_CASH_PAGE}`;
    this.props.history.push(url);
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
      hoverInType: null
    });
  }
  renderToAnotherURL(webURL) {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  }
  render() {
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
    }
    return (
      <div className={this.props.isSearch ? className : styles.CheckoutHeader}>
        {this.props.isSearch && <div className={styles.dummyColorHeader} />}
        <div className={styles.headerHolder}>
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
                    {userCookie &&
                      userCookie.firstName && (
                        <span>{userCookie.firstName}</span>
                      )}
                    {userCookie &&
                      userCookie.lastName && <span>{userCookie.lastName}</span>}
                  </span>
                  {userCookie &&
                    userCookie.userName && <span>{userCookie.userName}</span>}
                </div>
              </div>
            </div>
          )}
          {this.props.isSearch && (
            <div className={styles.headerFunctionality}>
              <div className={styles.upperHeader}>
                <a href="https://luxury.tatacliq.com/" target="_blank">
                  {" "}
                  <div className={styles.luxeryTab}>Visit Luxury Store</div>
                </a>
                <div className={styles.loginAndTrackTab}>
                  <div className={styles.signInAndLogout}>
                    <div className={styles.logOutDropDown}>
                      <DropdownMenu {...this.props} />
                    </div>
                    {!userCookie &&
                      !userCookie && (
                        <div
                          className={styles.loginTab}
                          onClick={() => this.openSignUpPopUp()}
                        >
                          Sign in / Sign Up
                        </div>
                      )}
                    {userCookie &&
                      userCookie && (
                        <div className={styles.userDetails}>
                          <div className={styles.nameAndContact}>
                            <div className={styles.dropDownArrow} />
                            <div
                              className={styles.iconPersonHolder}
                              onClick={() => this.goToMyAccount()}
                            />
                            <span className={styles.nameSpan}>
                              <span>
                                {userCookie &&
                                  userCookie.firstName &&
                                  `${userCookie.firstName} `}
                              </span>
                              <span>
                                {userCookie &&
                                  userCookie.lastName &&
                                  `${userCookie.lastName}`}
                              </span>
                            </span>
                            {userCookie &&
                              userCookie.userName && (
                                <span>{userCookie.userName}</span>
                              )}
                          </div>
                        </div>
                      )}
                  </div>
                  <div
                    className={styles.loginTab}
                    onClick={() => this.goToTrackOrders()}
                  >
                    Track Orders
                  </div>
                  <div
                    className={styles.loginTab}
                    onClick={() => this.renderToAnotherURL(CONTACT_URL)}
                  >
                    Help
                  </div>
                  <div
                    className={styles.loginTab}
                    onClick={() => this.onGiftCard()}
                  >
                    Gift Card
                  </div>
                  <div
                    className={styles.loginTab}
                    onClick={() => this.onCliqCash()}
                  >
                    Cliq Cash
                  </div>
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
                                              subCategoriesHeader.webURL
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
                                                      subCategoryDetails.webURL
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
                                {currentBrand &&
                                  currentBrand.popularBrands && (
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
                                                  popularBrands.webURL
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
                                {currentBrand &&
                                  currentBrand.featuredBrands && (
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
                                                  featuredBrands.webURL
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
                                              brandLogo.webURL
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
                  >
                    {this.props.bagCount !== null &&
                      (this.props.bagCount > 0 && (
                        <span>{`(${this.props.bagCount})`}</span>
                      ))}
                  </div>
                  <div
                    className={styles.mywishList}
                    onClick={() => this.goToWishList()}
                  />
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
