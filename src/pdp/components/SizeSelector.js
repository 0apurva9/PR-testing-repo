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
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import { checkUserLoggedIn } from "../../lib/userUtils";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_BUY_NOW_EVENT
} from "../../lib/adobeUtils";
const SIZE_GUIDE = "Size guide";
const PRODUCT_CODE_REG_EX = /p-([a-z0-9A-Z]+)/;
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
  handleShowSize() {
    if (this.props.showSizeGuide) {
      this.props.showSizeGuide();
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
    return (
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

    if (sizes.length !== 0) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>
            Select {this.props.headerText}
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
              <DesktopOnly>
                <UnderLinedButton
                  disabled={!this.props.hasSizeGuide}
                  label={SIZE_GUIDE}
                  color={"#ff1744"}
                  fontFamily={"light"}
                  onClick={() => {
                    this.handleShowSize();
                  }}
                />
              </DesktopOnly>
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
              })}
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
