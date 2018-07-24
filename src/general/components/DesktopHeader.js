import React from "react";
import styles from "./DesktopHeader.css";
import PropTypes from "prop-types";
import { LOGGED_IN_USER_DETAILS } from "../../../src/lib/constants";
import LogoutButtonContainer from "../../account/containers/LogoutButtonContainer";
import * as Cookie from "../../lib/Cookie";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import BrandImage from "./BrandImage";
const CATEGORY = "Categories";
const BRANDS = "Brands";
let catageoryDetails,
  brandDetails = "";
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
  onHoverCategory(value) {
    if (this.state.hoverInType === CATEGORY) {
      this.setState({
        hoverInType: null,
        hovered: null
      });
    } else {
      catageoryDetails =
        this.props &&
        this.props.getHeaderBrandAndCategoryDetails &&
        this.props.getHeaderBrandAndCategoryDetails.items &&
        this.props.getHeaderBrandAndCategoryDetails.items.find(categories => {
          return categories.componentName === "categoriesTabAZListComponent";
        });
      if (catageoryDetails) {
        this.setState({
          hovered:
            catageoryDetails &&
            catageoryDetails.categoriesTabAZListComponent &&
            catageoryDetails.categoriesTabAZListComponent[0].category_name,
          hoverInType: value
        });
      }
    }
  }
  onHoverBrands(value) {
    if (this.state.hoverInType === BRANDS) {
      this.setState({
        hoverInType: null,
        hovered: null
      });
    } else {
      brandDetails =
        this.props &&
        this.props.getHeaderBrandAndCategoryDetails &&
        this.props.getHeaderBrandAndCategoryDetails.items &&
        this.props.getHeaderBrandAndCategoryDetails.items.find(categories => {
          return categories.componentName === "brandsTabAZListComponent";
        });
      if (brandDetails) {
        this.setState({
          hovered:
            brandDetails &&
            brandDetails.brandsTabAZListComponent &&
            brandDetails.brandsTabAZListComponent[0].subType,
          hoverInType: value
        });
      }
    }
    if (this.state.hoverInType === "Brands") {
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
    let currentCategory =
      catageoryDetails &&
      catageoryDetails.categoriesTabAZListComponent &&
      catageoryDetails.categoriesTabAZListComponent.find(categories => {
        return categories.category_name === this.state.hovered;
      });
    let currentBrand =
      brandDetails &&
      brandDetails.brandsTabAZListComponent &&
      brandDetails.brandsTabAZListComponent.find(brand => {
        return brand.subType === this.state.hovered;
      });
    let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userCookie) {
      userCookie = JSON.parse(userCookie);
    }
    return (
      <div
        className={this.props.isSearch ? styles.base : styles.CheckoutHeader}
      >
        {this.props.isSearch && <div className={styles.dummyColorHeader} />}
        <div className={styles.headerHolder}>
          <div
            className={styles.logoHolder}
            onClick={() => this.redirectToHome()}
          />
          {this.props.profileDetails && (
            <div className={styles.profileWonerHolder}>
              <div className={styles.nameAndContact}>
                <div className={styles.logOutDropDown}>
                  <div className={styles.logoutButton}>
                    <LogoutButtonContainer />
                  </div>
                </div>
                <div className={styles.dropDownArrow} />
                <div className={styles.iconPersonHolder} />
                <span className={styles.nameSpan}>
                  <span>
                    {userCookie &&
                      userCookie.firstName &&
                      `${userCookie.firstName} `}
                  </span>{" "}
                  <span>
                    {userCookie &&
                      userCookie.lastName &&
                      `${userCookie.lastName}`}
                  </span>
                </span>
                <span>{userCookie.userName}</span>
              </div>
            </div>
          )}
          {this.props.isSearch && (
            <div className={styles.headerFunctionality}>
              <div className={styles.upperHeader}>
                <div className={styles.luxeryTab}>Visit Luxury Store</div>
                <div className={styles.loginAndTrackTab}>
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
                          <div className={styles.logOutDropDown}>
                            <div className={styles.logoutButton}>
                              <LogoutButtonContainer />
                            </div>
                          </div>
                          <div className={styles.dropDownArrow} />
                          <div className={styles.iconPersonHolder} />
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
                          <span>{userCookie.userName}</span>
                        </div>
                      </div>
                    )}
                  <div
                    className={styles.loginTab}
                    onClick={() => this.goToTrackOrders()}
                  >
                    Track Orders
                  </div>
                </div>
              </div>
              <div className={styles.lowerHeader}>
                <div className={styles.leftTabHolder}>
                  <div
                    className={
                      this.state.hoverInType === CATEGORY
                        ? styles.categoryAndBrandWithArrow
                        : styles.categoryAndBrand
                    }
                    onMouseEnter={() => this.onHoverCategory(CATEGORY)}
                    //  onMouseLeave={() => this.hoverOut()}
                  >
                    Categories
                    <div
                      className={
                        this.state.hoverInType === CATEGORY
                          ? styles.downArrow
                          : styles.arrow
                      }
                    />
                    {this.state.hoverInType === CATEGORY &&
                      this.props.getHeaderBrandAndCategoryDetails && (
                        <div className={styles.categoriesHolder}>
                          <div className={styles.categoryDetails}>
                            {catageoryDetails &&
                              catageoryDetails.categoriesTabAZListComponent &&
                              catageoryDetails.categoriesTabAZListComponent.map(
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
                            {currentCategory.subCategories.map(
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
                                    {subCategoriesHeader.subCategories.map(
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
                                            {subCategoryDetails.category_name}
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
                  <div
                    className={
                      this.state.hoverInType === BRANDS
                        ? styles.categoryAndBrandWithArrow
                        : styles.categoryAndBrand
                    }
                    onMouseEnter={() => this.onHoverBrands(BRANDS)}
                    // onMouseLeave={() => this.hoverOut()}
                  >
                    Brands
                    <div
                      className={
                        this.state.hoverInType === BRANDS
                          ? styles.downArrow
                          : styles.arrow
                      }
                    />
                    {this.state.hoverInType === BRANDS &&
                      this.props.getHeaderBrandAndCategoryDetails && (
                        <div className={styles.brandDetailsHolder}>
                          <div className={styles.brandLeftDetails}>
                            {brandDetails &&
                              brandDetails.brandsTabAZListComponent &&
                              brandDetails.brandsTabAZListComponent.map(
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
                </div>
                <div className={styles.rightTabHolder}>
                  <div
                    className={styles.myBagShow}
                    onClick={() => this.handleSelect()}
                  >
                    {userCookie &&
                      this.props.bagCount !== null && (
                        <span>{`(${this.props.bagCount})`}</span>
                      )}
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
  goToWishList: PropTypes.func
};
