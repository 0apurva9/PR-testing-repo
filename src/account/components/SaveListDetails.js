import React from "react";
import SaveListCard from "../../blp/components/SaveListCard";
import styles from "./SaveListDetails.css";
import PropTypes from "prop-types";
import format from "date-fns/format";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import Button from "../../general/components/Button";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  LOGIN_PATH,
  SAVED_LIST
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import { HOME_ROUTER } from "../../lib/constants";
const dateFormat = "MMMM DD YYYY";
const PRODUCT_QUANTITY = "1";
const NO_SAVELIST_TEXT = "No item saved to your Wish List";
export default class SaveListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0
    };
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  componentDidMount() {
    this.props.setHeaderText(SAVED_LIST);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      this.props.getWishList();
    }
  }
  componentDidUpdate() {
    this.props.setHeaderText(SAVED_LIST);
  }
  navigateToLogin() {
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
      return null;
    } else {
      if (this.props.showAuthPopUp) {
        this.props.history.push(HOME_ROUTER);
        this.props.showAuthPopUp();
        return null;
      }
    }
  }
  addToBagItem(ussid, productcode) {
    const productDetails = {};
    productDetails.ussId = ussid;
    productDetails.code = productcode;
    productDetails.quantity = PRODUCT_QUANTITY;
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    if (userDetails) {
      if (cartDetailsLoggedInUser && customerCookie) {
        this.props.addProductToCart(
          JSON.parse(userDetails).userName,
          JSON.parse(cartDetailsLoggedInUser).code,
          JSON.parse(customerCookie).access_token,
          productDetails
        );
      }
    } else {
      if (cartDetailsAnonymous && globalCookie) {
        this.props.addProductToCart(
          ANONYMOUS_USER,
          JSON.parse(cartDetailsAnonymous).guid,
          JSON.parse(globalCookie).access_token,
          productDetails
        );
      }
    }
  }
  removeItem(ussid) {
    const productDetails = {};
    productDetails.ussId = ussid;
    if (this.props.removeProductFromWishList) {
      this.props.removeProductFromWishList(productDetails);
    }
  }
  renderToContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userDetails);
    if (this.props.loading) {
      return (
        <div className={styles.loadingIndicator}>
          <SecondaryLoader />
        </div>
      );
    }

    const wishList = this.props.wishList;

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <DesktopOnly>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={styles.saveListDetail}>
            <div className={styles.saveListDetailsWithHolder}>
              <div className={styles.dataHolder}>
                {this.props.count > 0 &&
                  wishList &&
                  wishList.map((product, i) => {
                    return (
                      <div className={styles.listCardHolder} key={i}>
                        <SaveListCard
                          //productName={product.productBrand}
                          outOfStock={product.availableStock === 0}
                          productName={product.productName}
                          price={product.mrp && product.mrp.value}
                          date={format(product.date, dateFormat)}
                          day=""
                          offer=""
                          offerPrice={product.mop && product.mop.value}
                          image={product.imageURL}
                          productCode={product.productcode}
                          addToBagItem={() =>
                            this.addToBagItem(
                              product.USSID,
                              product.productcode
                            )
                          }
                          brandName={product.productBrand}
                          onClickImage={() =>
                            this.onClickImage(product.productcode)
                          }
                          removeItem={productUssid =>
                            this.removeItem(product.USSID)
                          }
                        />
                      </div>
                    );
                  })}
                {(!wishList ||
                  wishList.length === 0 ||
                  this.props.count === 0 ||
                  this.props.count === null) && (
                  <div className={styles.noSaveListBlock}>
                    <div className={styles.noSaveListText}>
                      {NO_SAVELIST_TEXT}
                    </div>
                    <div className={styles.buttonHolder}>
                      <div className={styles.button}>
                        <Button
                          borderRadius={22.5}
                          label={this.props.btnText}
                          backgroundColor={this.props.backgroundColor}
                          onClick={() => this.renderToContinueShopping()}
                          width={180}
                          textStyle={{ color: this.props.color, fontSize: 14 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DesktopOnly>
            <div className={MyAccountStyles.userProfile}>
              <UserProfile
                image={userData.imageUrl}
                userLogin={userData.userName}
                loginType={userData.loginType}
                onClick={() => this.renderToAccountSetting()}
                firstName={
                  userData &&
                  userData.firstName &&
                  userData.firstName.trim().charAt(0)
                }
                heading={
                  userData && userData.firstName && `${userData.firstName} `
                }
                lastName={
                  userData && userData.lastName && `${userData.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
SaveListDetails.propTypes = {
  wishList: PropTypes.arrayOf(
    PropTypes.shape({
      products: PropTypes.arrayOf(
        PropTypes.shape({
          productBrand: PropTypes.string,
          productName: PropTypes.string,
          imageURL: PropTypes.string,
          date: PropTypes.string,
          productcode: PropTypes.string,
          USSID: PropTypes.string
        })
      )
    })
  ),
  addProductToWishList: PropTypes.func,
  removeProductFromWishList: PropTypes.func
};
SaveListDetails.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744",
  btnText: "Continue Shopping"
};
