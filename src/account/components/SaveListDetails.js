import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
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
  SAVED_LIST
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import { HOME_ROUTER } from "../../lib/constants";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_WISHLIST_REMOVE,
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING
} from "../../lib/adobeUtils";
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
    document.title = "My Wishlist ";
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

  addToBagItem(ussid, productcode) {
    const productDetails = {};
    productDetails.ussId = ussid;
    productDetails.code = productcode;
    productDetails.quantity = PRODUCT_QUANTITY;
    this.props.addProductToCart(productDetails);
  }

  async addToBagItemWithExchange(ussid, productcode, exchangeDetails) {
    // check if quote is expired , call verifyIMEI API then add to bag
    if (exchangeDetails.quoteExpired) {
      let response = await this.props.verifyIMEINumber(
        exchangeDetails.IMEINumber,
        exchangeDetails.exchangeProductId,
        exchangeDetails.exchangePriceDetail.exchangeAmountCashify.value,
        exchangeDetails.exchangePriceDetail.TULBump.value,
        exchangeDetails.exchangePriceDetail.pickupCharge.value,
        productcode,
        ussid,
        this.props.wishlistName
      );
      if (
        response.status &&
        response.status.toLowerCase() === "success" &&
        response.isIMEIVerified
      ) {
        this.addProductToBag(ussid, productcode, exchangeDetails);
      }
      if (
        response.status &&
        response.status.toLowerCase() === "failure" &&
        !response.isIMEIVerified &&
        response.error
      ) {
        this.props.displayToast(response.error);
      }
    } else {
      this.addProductToBag(ussid, productcode, exchangeDetails);
    }
  }

  addProductToBag(ussid, productcode, exchangeDetails) {
    const productDetails = {};
    productDetails.ussId = ussid;
    productDetails.code = productcode;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.isFromMobileExchange = true;
    productDetails.verifyIMEINumberAPIResponse = exchangeDetails;
    Object.assign(
      productDetails.verifyIMEINumberAPIResponse,
      exchangeDetails.exchangePriceDetail
    );
    this.props.addProductToCart(productDetails);
  }

  removeItem(ussid) {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_WISHLIST_REMOVE);
    const productDetails = {};
    productDetails.ussId = ussid;
    if (this.props.removeProductFromWishList) {
      this.props.removeProductFromWishList(productDetails);
    }
  }

  removeItemWithExchange(ussid, exchangeDetails) {
    const productDetails = {};
    productDetails.ussId = ussid;
    productDetails.removeFromWlWithExchange = true;
    productDetails.quoteId = exchangeDetails.quoteId;
    productDetails.IMEINumber = exchangeDetails.IMEINumber;
    productDetails.exchangeId = exchangeDetails.exchangeProductId;
    if (this.props.removeProductFromWishList) {
      this.props.removeProductFromWishList(productDetails);
    }
  }

  renderToContinueShopping() {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
    this.props.history.push(HOME_ROUTER);
  }

  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }

  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }

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
                          outOfStock={product.availableStock <= 0}
                          productName={product.productName}
                          price={
                            product.mop
                              ? product.mop.value
                              : product.mrp && product.mrp.value
                          }
                          date={format(product.date, dateFormat)}
                          day=""
                          offer=""
                          offerPrice={product.mop && product.mop.value}
                          image={product.imageURL}
                          productCode={product.productcode}
                          addToBagItem={
                            product.exchangeDetails
                              ? () =>
                                  this.addToBagItemWithExchange(
                                    product.USSID,
                                    product.productcode,
                                    product.exchangeDetails
                                  )
                              : () =>
                                  this.addToBagItem(
                                    product.USSID,
                                    product.productcode
                                  )
                          }
                          brandName={product.brandName}
                          onClickImage={() =>
                            this.onClickImage(product.productcode)
                          }
                          removeItem={
                            product.exchangeDetails
                              ? () =>
                                  this.removeItemWithExchange(
                                    product.USSID,
                                    product.exchangeDetails
                                  )
                              : () => this.removeItem(product.USSID)
                          }
                          size={product.size}
                          isSizeOrLength={product.isSizeOrLength}
                          exchangeDetails={product.exchangeDetails}
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
                image={userData && userData.imageUrl}
                userLogin={userData && userData.userName}
                loginType={userData && userData.loginType}
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
  userDetails:PropTypes.object,
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
  removeProductFromWishList: PropTypes.func,
  setHeaderText: PropTypes.func,
  getWishList: PropTypes.func,
  addProductToCart: PropTypes.func,
  verifyIMEINumber: PropTypes.func,
  wishlistName: PropTypes.string,
  displayToast: PropTypes.func,
  loading: PropTypes.bool,
  count: PropTypes.number,
  btnText: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  userAddress: PropTypes.object,
  history: RouterPropTypes.history,
};
SaveListDetails.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744",
  btnText: "Continue Shopping"
};
