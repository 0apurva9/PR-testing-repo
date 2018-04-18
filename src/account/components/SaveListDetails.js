import React from "react";
import SaveListCard from "../../blp/components/SaveListCard";
import styles from "./SaveListDetails.css";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Button from "../../general/components/Button";
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
import * as Cookie from "../../lib/Cookie";
import MDSpinner from "react-md-spinner";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_SAVED_LIST
} from "../../lib/adobeUtils";

import { HOME_ROUTER } from "../../lib/constants";
const dateFormat = "MMMM DD YYYY";
const PRODUCT_QUANTITY = "1";
const NO_SAVELIST_TEXT = "You do not have any products in your Saved list";
export default class SaveListDetails extends React.Component {
  componentDidMount() {
    setDataLayer(ADOBE_MY_ACCOUNT_SAVED_LIST);
    this.props.setHeaderText(SAVED_LIST);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      this.props.getWishList();
    }
  }
  componentDidUpdate() {
    setDataLayer(ADOBE_MY_ACCOUNT_SAVED_LIST);
    this.props.setHeaderText(SAVED_LIST);
  }
  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
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
    productDetails.USSID = ussid;
    if (this.props.removeProductFromWishList) {
      this.props.removeProductFromWishList(productDetails);
    }
  }
  renderToContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }

    const wishList = this.props.wishList;

    if (!wishList && this.props.loading) {
      return (
        <div className={styles.loadingIndicator}>
          <MDSpinner />
        </div>
      );
    }
    return (
      <div className={styles.base}>
        {wishList &&
          wishList.products &&
          wishList.products.map((product, i) => {
            return (
              <div className={styles.listCardHolder} key={i}>
                <SaveListCard
                  productName={product.productBrand}
                  productMaterial={product.productName}
                  price={product.mrp && product.mrp.value}
                  date={moment(product.date).format(dateFormat)}
                  day=""
                  offer=""
                  offerPrice={product.mop && product.mop.value}
                  image={product.imageURL}
                  addToBagItem={() =>
                    this.addToBagItem(product.USSID, product.productcode)
                  }
                  removeItem={productUssid => this.removeItem(product.USSID)}
                />
              </div>
            );
          })}
        {(!wishList || !wishList.products) && (
          <div className={styles.noSaveListBlock}>
            <div className={styles.noSaveListText}>{NO_SAVELIST_TEXT}</div>
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
