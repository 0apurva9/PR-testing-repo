import React from "react";
import styles from "./SellerCard.css";
import CheckBox from "../../general/components/CheckBox";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import Button from "../../general/components/Button.js";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { SUCCESS, ADD_TO_BAG_TEXT, SHIPPING_TYPES } from "../../lib/constants";
import PdpDeliveryModes from "./PdpDeliveryModes";
export default class SellerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToBagFlag: false
    };
  }
  handleClick(val) {
    if (this.props.selectItem && !this.props.disabled) {
      this.props.selectItem(val);
    }
  }
  async addToBag() {
    if (this.props.addToBag) {
      let addToBagResponse = await this.props.addToBag();
      if (addToBagResponse && addToBagResponse.status === SUCCESS) {
        this.setState({ goToBagFlag: true });
        this.props.displayToast(ADD_TO_BAG_TEXT);
      } else {
        this.setState({ goToBagFlag: false });
      }
    }
  }
  goToCart() {
    if (this.props.goToBag) {
      this.props.goToBag();
    }
  }
  openExchangeModal() {
    this.props.openExchangeModal();
  }
  handleShowPiqPage = ussid => {
    if (this.props.getAllStoresForCliqAndPiq) {
      this.props.updateOtherSellerUssID(ussid);
      this.props.showPdpPiqPage();
      this.props.getAllStoresForCliqAndPiq();
    }
  };

  render() {
    let priceClass = styles.priceHolder;
    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice
    ) {
      priceClass = styles.priceCancelled;
    }
    let availableDeliveryModes = [];
    let tempValidDeliveryMode = [];
    let serviceableDeliveryModes = {};

    if (this.props.serviceablePincodeList) {
      this.props.serviceablePincodeList.map((product, j) => {
        if (product.ussid === this.props.winningUssID) {
          serviceableDeliveryModes = Object.assign(product);
          return (
            product.validDeliveryModes &&
            product.validDeliveryModes.map((deliveryMode, k) => {
              return (
                this.props.eligibleDeliveryModes &&
                this.props.eligibleDeliveryModes.map((val, i) => {
                  if (
                    SHIPPING_TYPES[deliveryMode.type] === val.code &&
                    !availableDeliveryModes.includes(deliveryMode.type)
                  ) {
                    availableDeliveryModes.push(deliveryMode.type);
                    tempValidDeliveryMode.push({ deliveryMode });
                  }
                })
              );
            })
          );
          serviceableDeliveryModes.validDeliveryModes = tempValidDeliveryMode;
        }
      });
    }

    return (
      <div className={styles.base} onClick={() => this.handleClick(this.props)}>
        <MobileOnly>
          <div className={styles.textBox}>
            <div className={this.props.disabled ? styles.faded : styles.buffer}>
              <div className={styles.heading}>
                {this.props.heading}
                {!this.props.disabled && (
                  <span className={styles.checkCircle}>
                    <CheckBox selected={this.props.selected} />
                  </span>
                )}
              </div>
              <div className={styles.priceTitle}>{this.props.priceTitle}:</div>
              {this.props.discountPrice &&
                this.props.discountPrice !== this.props.price && (
                  <div className={styles.discount}>
                    {this.props.discountPrice}
                  </div>
                )}
              {this.props.price && (
                <span className={priceClass}>{this.props.price}</span>
              )}
              {this.props.hasEmi && (
                <div className={styles.offerText}>EMI Available</div>
              )}
            </div>
          </div>
          <div className={styles.textBox2}>
            <div className={this.props.disabled ? styles.faded : styles.buffer}>
              <div className={styles.priceTitle}>{this.props.deliveryText}</div>
              {this.props.eligibleDeliveryModes &&
                this.props.eligibleDeliveryModes.map((val, i) => {
                  return (
                    <div className={styles.shippingText}>
                      {val.name}
                      {val.description && <span>-</span>}
                      {val.description}
                    </div>
                  );
                })}
              {this.props.hasCod && (
                <div className={styles.offerText}>{this.props.cashText}</div>
              )}
            </div>
          </div>
        </MobileOnly>
        <DesktopOnly>
          <div
            className={
              this.props.disabled ? styles.faded : styles.sellerCardDetails
            }
          >
            <div className={styles.sellerCardHeading}>{this.props.heading}</div>
          </div>
          <div
            className={
              this.props.disabled ? styles.faded : styles.sellerCardDetails
            }
          >
            {this.props.discountPrice &&
              this.props.discountPrice !== this.props.price && (
                <div className={styles.discount}>
                  {this.props.discountPrice}
                </div>
              )}
            {this.props.price && (
              <span className={priceClass}>{this.props.price}</span>
            )}
            {this.props.hasEmi && (
              <div className={styles.offerText}>EMI Available</div>
            )}
            {this.props.hasCod && (
              <div className={styles.offerText}>COD Available</div>
            )}
          </div>
          <div
            className={
              this.props.disabled ? styles.faded : styles.sellerCardDetails
            }
          >
            {Object.keys(serviceableDeliveryModes).length !== 0 && (
              <div className={styles.deliveryModesHolder}>
                <PdpDeliveryModes
                  fromSellerCard={true}
                  onPiq={ussid => this.handleShowPiqPage(ussid)}
                  eligibleDeliveryModes={this.props.eligibleDeliveryModes}
                  deliveryModesATP={this.props.deliveryModesATP}
                  pdpApparel={true}
                  pincodeDetails={serviceableDeliveryModes}
                  productCode={this.props.productListingId}
                  //isCod={productData.isCOD}
                  // availableStores={
                  //   serviceableDeliveryModes.CNCServiceableSlavesData && serviceableDeliveryModes.CNCServiceableSlavesData.length
                  // }
                  winningUssID={this.props.winningUssID}
                />
              </div>
            )}
            {this.props.exchangeAvailable && (
              <React.Fragment>
                <div className={styles.exchangeLogo} />
                <div className={styles.exchangeProduct}>
                  Exchange Your Old Phone
                </div>
                <div
                  className={styles.buttonWithArrow}
                  onClick={() => this.openExchangeModal()}
                >
                  <span className={styles.arrowLine} />
                  <span className={styles.arrow} />
                </div>
              </React.Fragment>
            )}
          </div>
          <div
            className={
              this.props.disabled ? styles.faded : styles.sellerCardDetails
            }
          >
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="hollow"
                  height={45}
                  label={this.state.goToBagFlag ? "Go to bag" : "Add to bag"}
                  onClick={
                    this.state.goToBagFlag
                      ? () => this.goToCart()
                      : () => this.addToBag()
                  }
                  width={160}
                  textStyle={{ color: "#212121", fontSize: 14 }}
                />
              </div>
              <div className={styles.saveListIcon}>
                <AddToWishListButtonContainer
                  productListingId={this.props.productListingId}
                  winningUssID={this.props.winningUssID}
                />
              </div>
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}

SellerCard.propTypes = {
  heading: PropTypes.string,
  priceTitle: PropTypes.string,
  disabled: PropTypes.bool,
  discountPrice: PropTypes.string,
  deliveryText: PropTypes.string,
  price: PropTypes.string,
  hasEmi: PropTypes.bool,
  cashText: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  hasCod: PropTypes.bool
};
