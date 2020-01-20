import React from "react";
import styles from "./SizeSelector.css";
import { Redirect } from "react-router-dom";
import SizeSelect from "./SizeSelect";
import DumbCarousel from "../../general/components/DumbCarousel";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import * as UserAgent from "../../lib/UserAgent.js";
import PropTypes from "prop-types";
import {
  SUCCESS,
  BUY_NOW_PRODUCT_DETAIL,
  LOGIN_PATH,
  PRODUCT_CART_ROUTER,
  BUY_NOW_ERROR_MESSAGE,
  PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
} from "../../lib/constants";
import { checkUserLoggedIn } from "../../lib/userUtils";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_BUY_NOW_EVENT
} from "../../lib/adobeUtils";
const SIZE_GUIDE = "Size guide";
const PRODUCT_CODE_REG_EX = /p-([a-z0-9A-Z]+)/;
const MODEL_FIT = "Model fit";
const SIMILAR_SIZE_MODAL = "View Similar";
export default class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToCartPageFlag: false
    };
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }
  navigateToLoginOnWishList(url) {
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }
  handleShowSize() {
    if (this.props.eyeWearSizeGuide) {
      this.props.showSizeSelectorForEyeWear();
    } else {
      if (this.props.showSizeGuide) {
        this.props.showSizeGuide();
      }
    }
  }
  handleSimilarOOSSizeSelector(data) {
    if (data.length < 2) {
      this.handleSimilarSizeOOSModal(data[0]);
    }
    if (this.props.showOOSSizeSelectorModal && data.length > 1) {
      this.props.showOOSSizeSelectorModal({ sizes: data });
    }
  }

  handleSimilarSizeOOSModal(data) {
    if (this.props.showSimilarSizeOOSModal) {
      this.props.showSimilarSizeOOSModal({ product: data });
    }
  }

  async updateSize(productUrl) {
    let productCode;
    const productCodeArray = productUrl.split("/");
    if (productCodeArray[1] && PRODUCT_CODE_REG_EX.test(productCodeArray[1])) {
      productCode = productCodeArray[1].substring(2);
    } else if (
      productCodeArray[2] &&
      PRODUCT_CODE_REG_EX.test(productCodeArray[2])
    ) {
      productCode = productCodeArray[2].substring(2);
    } else {
      productCode = this.props.productId;
    }
    if (this.props.isFromModal) {
      const productDetailResponse = await this.props.getProductDescription(
        productCode
      );
      if (productDetailResponse && productDetailResponse.status === SUCCESS) {
        let { productDescription } = productDetailResponse;
        let productDetailsObj = {
          code: productDescription && productDescription.productListingId,
          ussId: productDescription && productDescription.winningUssID,
          quantity: 1
        };
        if (this.props.buyNowFlag) {
          setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_BUY_NOW_EVENT);
          if (!checkUserLoggedIn()) {
            localStorage.setItem(
              BUY_NOW_PRODUCT_DETAIL,
              JSON.stringify(productDetailsObj)
            );
            this.navigateToLogin();
          } else {
            const buyNowResponse = await this.props.buyNow(productDetailsObj);
            if (buyNowResponse && buyNowResponse.status === SUCCESS) {
              this.props.history.push(PRODUCT_CART_ROUTER);
            } else {
              this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
            }
          }
        } else if (this.props.addToWishlist) {
          let addToWishListObj = {
            productListingId:
              productDescription && productDescription.productListingId,
            winningUssID: productDescription && productDescription.winningUssID
          };
          if (!checkUserLoggedIn()) {
            localStorage.setItem(
              PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST,
              JSON.stringify(addToWishListObj)
            );
            this.navigateToLoginOnWishList(
              productCodeArray && productCodeArray[1]
                ? `${productCodeArray[1]}/p-${productDescription &&
                    productDescription.productListingId}`
                : `p-${productDescription &&
                    productDescription.productListingId}`
            );
          } else {
            this.props.addProductToWishList(addToWishListObj);
            this.props.history.replace({
              pathname: `${productUrl}`,
              state: { isSizeSelected: true, goToCartPageFlag: false }
            });
          }
        } else {
          this.props.addProductToCart(productDetailsObj);
          this.props.history.replace({
            pathname: `${productUrl}`,
            state: { isSizeSelected: true, goToCartPageFlag: true }
          });
        }
      }
    } else {
      this.props.history.replace({
        pathname: `${productUrl}`,
        state: { isSizeSelected: true, goToCartPageFlag: false }
      });
    }
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  renderSize(datum, i) {
    let infoDetails = [];
    if (this.props.infoDetails) {
      infoDetails = this.props.infoDetails.filter(item => {
        return item.key === MODEL_FIT;
      });
    }

    return (
      <React.Fragment>
        <SizeSelect
          key={i}
          disabled={!datum.sizelink.isAvailable}
          selected={
            datum.colorlink.selected && this.props.history.location.state
              ? this.props.history.location.state.isSizeSelected
              : false
          }
          size={datum.sizelink.size}
          value={datum.sizelink.size}
          fontSize={this.props.textSize}
          onSelect={() => this.updateSize(datum.sizelink.url)}
        />
      </React.Fragment>
    );
  }
  render() {
    const selectedColour = this.props.data.filter(val => {
      return val.colorlink.selected;
    })[0].colorlink.color;

    const sizes = this.props.data
      .filter(val => {
        return selectedColour ? val.colorlink.color === selectedColour : true;
      })
      .map(val => {
        return val;
      });
    let OOSProducts = sizes.filter(size => {
      return !size.sizelink.isAvailable;
    });
    if (sizes.length !== 0) {
      return (
        <div className={styles.size}>
          <div className={styles.header}>
            Select{" "}
            {this.props.isSizeOrLength
              ? this.props.isSizeOrLength
              : this.props.headerText
                ? this.props.headerText
                : "SIZE"}
            <div className={styles.button}>
              <MobileOnly>
                <UnderLinedButton
                  disabled={!this.props.hasSizeGuide}
                  label={SIZE_GUIDE}
                  onClick={() => {
                    this.handleShowSize();
                  }}
                />
              </MobileOnly>
            </div>
          </div>
          <MobileOnly>
            <DumbCarousel elementWidth="auto">
              {sizes.map((datum, i) => {
                return this.renderSize(datum, i);
              })}
            </DumbCarousel>
          </MobileOnly>
          <DesktopOnly>
            <div>
              {sizes.map((datum, i) => {
                return (
                  <div className={styles.size}>{this.renderSize(datum, i)}</div>
                );
              })}{" "}
              {this.props.headerText !== "Volume" &&
                this.props.isSizeOrLength !== "Volume" &&
                this.props.isSizeOrLength !== "Power" &&
                this.props.eyeWearSizeGuide && (
                  <DesktopOnly>
                    <UnderLinedButton
                      // disabled={!this.props.hasSizeGuide}
                      label={SIZE_GUIDE}
                      color={this.props.hasSizeGuide ? "#ff1744" : "#212121"}
                      fontFamily={"light"}
                      onClick={() => {
                        this.handleShowSize();
                      }}
                    />
                  </DesktopOnly>
                )}
              {OOSProducts.length > 0 && (
                <div className={styles.buttonView}>
                  <span className={styles.oosButton}>Size out of stock?</span>{" "}
                  <div
                    className={styles.viewSimilarBtn}
                    onClick={() => {
                      this.handleSimilarOOSSizeSelector(OOSProducts);
                    }}
                  >
                    {SIMILAR_SIZE_MODAL}
                  </div>
                </div>
              )}
            </div>
          </DesktopOnly>
        </div>
      );
    } else {
      return null;
    }
  }
}

SizeSelector.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  headerText: PropTypes.string,
  productId: PropTypes.string,
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.string])
};
SizeSelector.defaultProps = {
  headerText: "Size"
};
