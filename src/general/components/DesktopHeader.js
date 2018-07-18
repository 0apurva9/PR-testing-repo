import React from "react";
import styles from "./DesktopHeader.css";
import PropTypes from "prop-types";
import { LOGGED_IN_USER_DETAILS } from "../../../src/lib/constants";
import LogoutButtonContainer from "../../account/containers/LogoutButtonContainer";
import * as Cookie from "../../lib/Cookie";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class DesktopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hoverInType: null
    };
  }
  componentDidMount() {
    if (this.props.getCategories) {
      this.props.getCategories();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      hovered:
        nextProps.categories &&
        nextProps.categories.subCategories &&
        nextProps.categories.subCategories[0].category_name
    });
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
  hoverInType(value) {
    if (this.state.hoverInType === "Categories") {
      this.setState({
        hoverInType: null
      });
    } else if (this.state.hoverInType === "Brands") {
      this.setState({
        hoverInType: null
      });
    } else {
      this.setState({
        hoverInType: value
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
      hovered:
        this.props.categories &&
        this.props.categories.subCategories &&
        this.props.categories.subCategories[0].category_name,
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
      this.props.categories &&
      this.props.categories.subCategories.find(categories => {
        return categories.category_name === this.state.hovered;
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
                      this.state.hoverInType === "Categories"
                        ? styles.categoryAndBrandWithArrow
                        : styles.categoryAndBrand
                    }
                    onClick={() => this.hoverInType("Categories")}
                  >
                    Categories
                    <div
                      className={
                        this.state.hoverInType === "Categories"
                          ? styles.downArrow
                          : styles.arrow
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.hoverInType === "Brands"
                        ? styles.categoryAndBrandWithArrow
                        : styles.categoryAndBrand
                    }
                    onClick={() => this.hoverInType("Brands")}
                  >
                    Brands
                    <div
                      className={
                        this.state.hoverInType === "Brands"
                          ? styles.downArrow
                          : styles.arrow
                      }
                    />
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
                {this.state.hoverInType === "Categories" &&
                  this.props.categories &&
                  this.props.categories.subCategories && (
                    <div
                      className={styles.categoriesHolder}
                      onMouseLeave={() => this.hoverOut()}
                    >
                      <div className={styles.categoryDetails}>
                        {this.props.categories.subCategories.map(
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
                                  className={styles.subCategoryDetailsHeader}
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
