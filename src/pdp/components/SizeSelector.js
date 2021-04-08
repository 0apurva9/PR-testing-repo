import React from "react";
import styles from "./SizeSelector.css";
import SizeSelect from "./SizeSelect";
import DumbCarousel from "../../general/components/DumbCarousel";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
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
const SIMILAR_SIZE_MODAL = "View Similar";
export default class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToCartPageFlag: false,
      label: "Select",
      showLensPower: false,
      arrangedPower: []
    };

    this.powerSizeRef = [];
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
	  this.props.getProductReviews(productCode, 0, "desc", "byDate");
    }
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  showAllLensPower = () => {
    this.setState({ showLensPower: !this.state.showLensPower });
  };

  scrollToPowerSizeRef = () => {
    let index = this.props.data.findIndex(d => d.colorlink.selected);
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.isSizeSelected &&
      this.powerSizeRef.length &&
      this.powerSizeRef[index] !== null
    ) {
      this.powerSizeRef[index].scrollIntoView({
        block: "end",
        behavior: "smooth",
        inline: "end"
      });
    }
  };

  componentDidUpdate() {
    if (this.state.showLensPower) {
      this.scrollToPowerSizeRef();
    }
  }

  renderSize(datum, i) {

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
          isSizeOrLength={this.props.isSizeOrLength}
          onSelect={() => this.updateSize(datum.sizelink.url)}
          categoryEyeWear={
            this.props &&
            this.props.categoryHierarchy &&
            this.props.categoryHierarchy[0] &&
            this.props.categoryHierarchy[0].category_name === "Eyewear"
              ? true
              : false
          }
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
    const isEyeWearCategory =
      this.props &&
      this.props.categoryHierarchy &&
      this.props.categoryHierarchy[0] &&
      this.props.categoryHierarchy[0].category_name === "Eyewear"
        ? true
        : false;
    let positivePowerIndex =
      sizes && sizes.findIndex(val => val.sizelink.size > 0);
    let zeroPowerIndex =
      sizes && sizes.findIndex(val => val.sizelink.size === "0.00");

    let { showLensPower, label } = this.state;

    let isPowerLensSizeSelected = false,
      selectedLensSize =
        sizes && sizes.length
          ? sizes.filter(item => item.colorlink.selected)
          : [];
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.isSizeSelected &&
      selectedLensSize.length
    ) {
      isPowerLensSizeSelected = true;
    }

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
            {isEyeWearCategory &&
              this.props.isSizeOrLength === "Power" && (
                <div
                  className={styles.buttonShowViewMore}
                  onClick={() => {
                    this.showAllLensPower();
                  }}
                >
                  {isPowerLensSizeSelected ? "Change" : label}
                </div>
              )}
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
            <div
              className={
                isEyeWearCategory &&
                this.props.isSizeOrLength === "Power" &&
                showLensPower
                  ? styles.eyewearPowerHolder
                  : null
              }
            >
              {this.props.isSizeOrLength !== "Power" &&
                sizes &&
                sizes.map((datum, i) => {
                  return (
                    <div className={styles.size} key = {i}>
                      {this.renderSize(datum, i)}
                    </div>
                  );
                })}{" "}
              {isEyeWearCategory &&
                this.props.isSizeOrLength === "Power" &&
                (showLensPower ? (
                  <React.Fragment>
                    {sizes &&
                      sizes.map((datum, i) => {
                        return (
                          <React.Fragment key = {i}>
                            {positivePowerIndex === i ? <br /> : null}
                            <div
                              className={styles.size}
                              ref={ref => {
                                this.powerSizeRef[i] = ref;
                              }}
                            >
                              {this.renderSize(datum, i)}
                            </div>
                            {zeroPowerIndex === i ? <br /> : null}
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                ) : (
                  <div
                    className={
                      isPowerLensSizeSelected
                        ? styles.selectedPowerLens
                        : styles.lensPowerLabel
                    }
                    onClick={() => this.showAllLensPower()}
                    style={{
                      padding:
                        isPowerLensSizeSelected &&
                        selectedLensSize[0].sizelink.size > 0
                          ? "10px 0"
                          : null
                    }}
                  >
                    {isPowerLensSizeSelected ? (
                      selectedLensSize[0].sizelink.size > 0 ? (
                        <React.Fragment>
                          <span className={styles.plusSign}>+</span>
                          {selectedLensSize[0].sizelink.size}
                        </React.Fragment>
                      ) : (
                        selectedLensSize[0].sizelink.size
                      )
                    ) : (
                      label
                    )}
                  </div>
                ))}
              {this.props.eyeWearSizeGuide &&
                isEyeWearCategory &&
                this.props.hasSizeGuide && (
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
              {!isEyeWearCategory &&
                this.props.hasSizeGuide && (
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
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  location: PropTypes.object,
  history: PropTypes.object,
  addToWishlist: PropTypes.bool,
  setUrlToRedirectToAfterAuth: PropTypes.func,
  eyeWearSizeGuide: PropTypes,
  showSizeGuide: PropTypes.func,
  showSizeSelectorForEyeWear: PropTypes.func,
  showOOSSizeSelectorModal: PropTypes.func,
  showSimilarSizeOOSModal: PropTypes.func,
  isFromModal: PropTypes.bool,
  buyNowFlag: PropTypes.bool,
  getProductDescription: PropTypes.func,
  buyNow: PropTypes.func,
  displayToast: PropTypes.func,
  addProductToWishList: PropTypes.func,
  addProductToCart: PropTypes.func,
  closeModal: PropTypes.func,
  infoDetails: PropTypes.array,
  isSizeOrLength: PropTypes.bool,
  categoryHierarchy: PropTypes.array,
  hasSizeGuide: PropTypes.bool,
  renderSize: PropTypes.func,
  getProductReviews: PropTypes.func,
};
SizeSelector.defaultProps = {
  headerText: "Size"
};
